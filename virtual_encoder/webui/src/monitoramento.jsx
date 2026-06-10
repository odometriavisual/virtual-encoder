function ok(predicate) {
  return predicate ? "ok" : "err";
}

function warn(predicate) {
  return predicate ? "warn" : "";
}

export function Monitoramento({ status }) {
  const sr = status?.pos?.sr || 0;
  const x = status?.pos?.x * sr || 0;
  const y = status?.pos?.y * sr || 0;
  const d = Math.sqrt(x * x + y * y);

  let status_text = "Módulo Offline";
  if (status.rpi5) {
    status_text = "Módulo Online\n";
    status_text += `Versão ${status.version}\n`;
    status_text += `${status.modo === 'Download' ? status.estado : 'Estado ' + status.estado}\n`;
    status_text += status.modo === 'Odometro' ? 'Pos: (' + x.toFixed(1) + ', ' + y.toFixed(1) + ')\n' : '';
    status_text += status.modo === 'Odometro' ? 'Dist: ' + d.toFixed(2) + "\n": '';
    status_text += `IP: ${status.rpi5.ip}\n`;
    status_text += `Temp: ${status.rpi5.temp?.toFixed(2)} ℃\n`;
    status_text += status.display ? "" : "Display não encontrado";
  }

  return (
    <div class="monitoramento">
      <div>Monitoramento</div>
      <div className={`status rpi5 ${ok(status.rpi5)} ${warn(status.rpi5.temp > 75.0)}`}>
        { status_text }
      </div>
      <div className={`status camera ${ok(status.camera)}`}>Picam</div>
      <div className={`status imu ${ok(status.imu)}`}>IMU</div>
    </div>
  )
}

