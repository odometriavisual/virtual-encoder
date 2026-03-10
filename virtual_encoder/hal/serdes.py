class SerdesNull:
    pass


try:
    from time import sleep
    import subprocess
    import threading

    import gpiod
    from gpiod import LineRequest
    from gpiod.line import Direction, Value
    from smbus2 import SMBus, i2c_msg

    class Serdes(SerdesNull, threading.Thread):
        def __init__(
            self,
            *,
            bnoreset_pin: int,
            powerdown_pin: int,
            seraddr: int,
            desaddr: int,
            desbus: int = 1,
            gpio_chip: str = "/dev/gpiochip0",
            **kwargs,
        ):
            SerdesNull.__init__(self)
            threading.Thread.__init__(self)
            
            self.__verbose = kwargs.get("verbose", False)
            self.__monitor = kwargs.get("monitor", False)
            self.__fcon = kwargs.get("force_camera_on", False)
            self.__enable_driver = kwargs.get("enable_driver", False)

            self.__seraddr = seraddr
            self.__desaddr = desaddr

            self.__bnor: LineRequest = gpiod.request_lines(
                gpio_chip,
                {
                    bnoreset_pin: gpiod.LineSettings(
                        direction=Direction.OUTPUT, output_value=Value.ACTIVE
                    )
                },
                "Serdes",
            )
            self.__pdn: LineRequest = gpiod.request_lines(
                gpio_chip,
                {
                    powerdown_pin: gpiod.LineSettings(
                        direction=Direction.OUTPUT, output_value=Value.ACTIVE
                    )
                },
                "Serdes",
            )

            self.__bus = SMBus(desbus)

        def printv(self, text: str):
            if self.__verbose:
                print(text)

        def write(self, address: int, reg_address: int, data: int, v: str = ""):
            reg_high = (reg_address >> 8) & 0xFF
            reg_low = reg_address & 0xFF
            self.__bus.write_i2c_block_data(address, reg_high, [reg_low, data])

            s: str = "Writing on reg 0x%.4X: 0x%.2X (%s)" % (
                reg_address,
                data,
                format(data, "#010b"),
            )
            if v:
                if v != "-":
                    self.printv(s + " -> " + v)
            else:
                self.printv(s)

        def read(self, address: int, reg_address: int, v: str = "") -> int:
            reg_high = (reg_address >> 8) & 0xFF
            reg_low = reg_address & 0xFF
            write = i2c_msg.write(address, [reg_high, reg_low])
            read = i2c_msg.read(address, 1)
            self.__bus.i2c_rdwr(write, read)
            # noinspection PyTypeChecker
            ans = list(read)[0]

            s: str = "Reading on reg 0x%.4X: 0x%.2X (%s)" % (
                reg_address,
                ans,
                format(ans, "#010b"),
            )
            if v:
                if v != "-":
                    self.printv(s + " -> " + v)
            else:
                self.printv(s)
            return ans

        @staticmethod
        def decode_bitmask_str(maskstr: str) -> tuple:
            maskarray = maskstr.split(":")
            nbits = int(maskarray[0]) - int(maskarray[1]) + 1
            mask = (2**nbits - 1) << int(maskarray[1])
            return mask, int(maskarray[1])

        def write_ser(
            self, reg_address: int, data: int, bitmask: str = "7:0", v: str = ""
        ):
            mask = self.decode_bitmask_str(bitmask)
            if bitmask != "7:0":
                reg: int = self.read(self.__seraddr, reg_address, "-")
                reg = reg & ((~mask[0]) & 0xFF)
                reg = reg | ((data << mask[1]) & (mask[0]))
                self.write(self.__seraddr, reg_address, reg, v)
            else:
                self.write(self.__seraddr, reg_address, data << mask[1], v)

        def write_des(
            self, reg_address: int, data: int, bitmask: str = "7:0", v: str = ""
        ):
            mask = self.decode_bitmask_str(bitmask)
            if bitmask != "7:0":
                reg: int = self.read(self.__desaddr, reg_address, "-")
                reg = reg & ((~mask[0]) & 0xFF)
                reg = reg | ((data << mask[1]) & (mask[0]))
                self.write(self.__desaddr, reg_address, reg, v)
            else:
                self.write(self.__desaddr, reg_address, data << mask[1], v)

        def read_ser(self, reg_address: int, v: str = "") -> int:
            return self.read(self.__seraddr, reg_address, v)

        def read_des(self, reg_address: int, v: str = "") -> int:
            return self.read(self.__desaddr, reg_address, v)

        def config_serializer(self):
            self.printv("Starting serializer configuration...")

            # force full chip reset
            self.write_ser(0x0010, 1, "7:7", v="Reset all")
            sleep(0.05)

            # i2c passthrough
            self.write_ser(0x0001, 1, "6:6", v="Setup I2C1 passthrough channel")

            # setup adc - shutdown first
            self.write_ser(0x0534, 0, "0:0", v="Shut down ADC round robin")
            self.write_ser(0x0500, 0x00, v="Power down and disable all ADC blocks")
            self.write_ser(0x0501, 0, "3:3", v="Disable ADC clocks")
            sleep(0.01)
            self.write_ser(0x0501, 1, "3:3", v="Enable ADC clock")
            self.write_ser(0x0502, 0, "3:2", v="ADC div = 1")
            self.write_ser(0x0502, 0, "1:1", v="ADC user internal vref")
            self.write_ser(0x0502, 0, "0:0", v="ADC mux disconnected")
            self.write_ser(0x0500, 0xFF, "4:1", v="Enable all ADC blocks")
            sleep(0.1)
            self.write_ser(0x0502, 1, "0:0", v="ADC mux connected")
            self.write_ser(0x053E, 1, "0:0", v="Route MFP3 to ADC mux")
            self.read_ser(0x0510, "Read and clear ADC flags")
            self.write_ser(0x0500, 1, "0:0", v="Enable ADC conversion")
            # wait for conversion
            while self.read_ser(0x0510, "-") & 0x01 != 0x01:
                pass
            # read result
            adcl = self.read_ser(0x0508, "Read ADCL result")
            adch = self.read_ser(0x0509, "Read ADCH result") & 0x03
            adcres = (adch << 8) | adcl
            voltage: float = (float(adcres) / 1024) * 1.25 / 10 * 110
            print("Remote voltage is: %.2fV" % voltage)

            # configure GPIO routing
            if not self.__fcon:
                self.write_ser(0x02BE, 0b000100, "5:0", v="Configure GPIO0")
            else:
                self.write_ser(0x02BE, 0b010000, "5:0", v="Configure GPIO0")
            self.write_ser(0x02BF, 0b00100000, v="Configure GPIO0")
            self.write_ser(0x02C0, 0, "4:0", v="Configure GPIO0")

            self.write_ser(0x02CD, 0b011100, "5:0", v="Configure GPIO5")
            self.write_ser(0x02CE, 0b01100101, v="Configure GPIO5")
            self.write_ser(0x02CF, 5, "4:0", v="Configure GPIO5")

            self.write_ser(0x02D0, 0b011100, "5:0", v="Configure GPIO6")
            self.write_ser(0x02D1, 0b01000110, v="Configure GPIO6")
            self.write_ser(0x02D2, 6, "4:0", v="Configure GPIO6")

            # enable remote clock out
            self.write_ser(0x1A00, 1, "0:0", v="Reset DPLL")
            sleep(0.01)
            self.write_ser(0x1A00, 0, "0:0", v="Release DPLL reset")
            sleep(0.01)
            self.write_ser(0x03F0, 1, "1:1", v="Reset reference generator")
            sleep(0.01)
            self.write_ser(0x03F0, 0, "1:1", v="Reset reference generator")
            sleep(0.01)
            self.write_ser(0x03F0, 1, "6:6", v="Enabled predefined pll clock settings")
            self.write_ser(0x03F0, 0x01, "5:4", v="Predefined ref 27/24MHz")
            self.write_ser(0x03F0, 1, "3:3", v="User alternate table")
            self.write_ser(0x0003, 0b11, "1:0", v="RCLK reference PLL output selection")
            self.write_ser(
                0x0570, 0, "5:4", v="Set slew rate to max in MFP4 (clock to camera)"
            )
            self.write_ser(0x1A03, 1, "7:7", v="Output clock is config_sel_clock_out")
            self.write_ser(0x03F0, 1, "0:0", v="Enable DPLL output")
            while self.read_ser(0x03F0, "-") & 0x80 != 0x80:
                pass
            self.write_ser(0x0006, 1, "5:5", v="Enable RCLKOUT")
            sleep(0.01)

            # configure MIPI RX
            self.write_ser(0x0330, 1, "3:3", v="MIPI assert RX reset")
            self.write_ser(0x0331, 0b01, "5:4", v="MIPI 2 data lanes")
            self.write_ser(0x0330, 0, "3:3", v="MIPI deassert RX reset")

            self.printv("Serializer configured successfully...")

        def config_deserializer(self):
            self.printv("Starting deserializer configuration...")

            # force full chip reset
            self.write_des(0x0010, 1, "7:7", v="Reset all")
            sleep(0.05)

            # reset link as per user guide
            self.write_des(0x0010, 1, "6:6", v="Assert link reset")

            # setup I2C passthrough channel
            self.write_des(0x0001, 1, "6:6", v="Setup I2C1 passthrough channel")

            # configure GPIO routing
            self.write_des(0x0005, 0, "7:6", v="Disable LOCK and ERRB outputs")

            self.write_des(0x02B0, 0b000011, "5:0", v="Configure GPIO0")
            self.write_des(0x02B1, 0b10100000, v="Configure GPIO0")
            self.write_des(0x02B2, 0, "4:0", v="Configure GPIO0")

            self.write_des(0x02BF, 0b00011011, "5:0", v="Configure GPIO5")
            self.write_des(0x02C0, 0b01000101, v="Configure GPIO5")
            self.write_des(0x02C1, 5, "4:0", v="Configure GPIO5")

            self.write_des(0x02C2, 0b00011011, "5:0", v="Configure GPIO6")
            self.write_des(0x02C3, 0b01000110, v="Configure GPIO6")
            self.write_des(0x02C4, 6, "4:0", v="Configure GPIO6")

            # configure MIPI
            self.write_des(0x0332, 0, "5:5", v="Put MIPI phy in standby mode")

            self.write_des(
                0x0320,
                15,
                "4:0",
                v="MIPI 1.5Gbps per lane",
            )
            self.write_des(0x044A, 1, "7:6", v="Configure MIPI for 2 lanes")

            self.write_des(0x0335, 1, "5:5", v="Reverse all MIPI polarities")
            self.write_des(0x0335, 1, "1:1", v="Reverse all MIPI polarities")
            self.write_des(0x0335, 1, "0:0", v="Reverse all MIPI polarities")

            self.write_des(0x0332, 1, "5:5", v="Put MIPI phy in active mode")
            sleep(0.1)

            self.write_des(0x0010, 0, "6:6", v="Reset link deassert")
            sleep(0.1)

            # Configure eye monitor
            # self.write_des(0x1404, 1, '7:4', v='Eye observations')
            self.write_des(0x1406, 0, "6:0", v="Disable eye monitor refresh threshold")
            self.write_des(0x1405, 32, "6:0", v="Eye monitor minimum threshold")

            # Load optimized 3Gbps GMSL2 link optimization registers
            self.write_des(0x147F, 0x68, v="Load optimized 3Gbps RLMS7F register")
            self.write_des(0x147E, 0xA8, v="Load optimized 3Gbps RLMS7E register")
            self.write_des(0x14A3, 0x30, v="Load optimized 3Gbps RLMSA3 register")
            self.write_des(0x14D8, 0x07, v="Load optimized 3Gbps RLMSD8 register")
            self.write_des(0x14A5, 0x70, v="Load optimized 3Gbps RLMSA5 register")

            self.write_des(0x0010, 1, "5:5", v="Reset one-shot")
            sleep(0.2)

            self.printv("Deserializer configured successfully...")

        def __wait_eye(self) -> int:
            while True:
                eye = self.read_des(0x1407, "-")
                if eye & 0x80 == 0x80:
                    break
                sleep(0.05)
            return eye

        def get_eye(self, vertical: bool) -> int:
            if vertical:
                self.write_des(0x1406, 0, "7:7", v="-")
            else:
                self.write_des(0x1406, 1, "7:7", v="-")
            sleep(2)
            eye: int = self.__wait_eye()
            return eye

        def print_stats(self):
            print("\33[2J")
            print("------ SERIALIZER STATS -------")
            self.read_ser(0x0112, "Video Receiver Status")
            self.read_ser(0x033B, "PHY1 LP status (D-PHY only)")
            self.read_ser(0x033C, "PHY1 high-speed status (D-PHY only)")
            self.read_ser(0x033D, "PHY2 LP status (D-PHY only)")
            self.read_ser(0x033E, "PHY2 high-speed status (D-PHY only)")

            print("----- DESERIALIZER STATS ------")
            self.read_des(0x0341, "Tunnel Mode ECC Errors")
            self.read_des(0x0442, "Individual MIPI PHY Status")

            print("----- EYE STATS ------")
            horizontal_eye: float = float(self.get_eye(False) & 0x7F) / 0.64
            vertical_eye: float = float(self.get_eye(True) & 0x7F) / 0.64
            self.printv("Horizontal eye: %2.0f%%" % horizontal_eye)
            self.printv("Vertical eye: %2.0f%%" % vertical_eye)

            print("")

        def is_des_connected(self):
            try:
                return self.read_des(0x000D, "Checking deserializer device ID") == 0xCA
            except IOError:
                return False

        def is_ser_connected(self):
            try:
                return self.read_ser(0x000D, "Checking serializer device ID") == 0xC8
            except IOError:
                return False

        def run(self):
            while True:
                if not self.is_des_connected():
                    print("Deserializer not found, trying again...")
                    sleep(10)
                    continue

                if not self.is_ser_connected():
                    print("Serializer not found, trying again...")
                    sleep(10)
                    continue

                try:
                    self.config_serializer()
                    self.config_deserializer()
                except Exception:
                    continue

                print("Serdes link configured SUCCESSFULLY.")

                if self.__enable_driver:
                    print("Running driver initialization")
                    subprocess.run(
                        "sudo dtoverlay imx219,cam0=CSI0".split(" "), check=False
                    )
                    sleep(0.5)

                while True:
                    if not (self.is_des_connected() and self.is_ser_connected()):
                        sleep(10)
                        break

                    if self.__monitor:
                        self.print_stats()
                        sleep(1)
                    else:
                        sleep(60)


except Exception:

    class Serdes(SerdesNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
