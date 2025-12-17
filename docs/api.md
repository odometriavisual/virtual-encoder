# API do encoder

- Serviço HTTP
- Porta: 5000

# GET `/`
Returns the web page


# GET `/status`
Returns a json stream of the system's status.
The stream contains a series of json objects, separated by \n, according to the following format:

```js
{
    "rpi5": {
        "temp": 0.0,
        "ip": "0.0.0.0"
    },
    "rpi0": False | { "temp": 0.0 },
    "camera": False | True,
    "imu": False | [0., 0., 0., 0., 0.],
    "pos": { "x": 0, "y": 0 },
    "modo": "Iniciando",
    "estado": "",
    "msg": ""
}
```

# GET `/video_feed`
The camera's MJPEG stream.

# POST `/start_acquisition/<int:pulses_per_second>/<reason>`
If in the ModoOdometro or in the ModoTempo at the Ready state, starts an aquisition.
`pulses_per_second` must be an integer, `reason` must be an UTF-8 encoded string.
ModoOdometro ignores the parameter `pulses_per_second`. Reason is non mandatory.


# POST `/stop_acquisition`
If in the ModoOdometro or in the ModoTempo at the Aquisição state, stops and saves an aquisition.

# POST `/start_stream`
Starts the video stream.

# POST `/stop_stream`
Stops the video stream.

# POST `/set_exposure/<int:value>`
Sets the camera exposure. `value` must be an integer in microseconds.


# POST `/set_modo/<modo>`
Sets the system's mode. The `modo` parameter must be a string of one of the following values:
- `autonomo`
- `tempo`
- `odometro`
- `download`

Returns 404 if the `modo` string is invalid

# POST `/shutdown/<component>`
Shutdowns a component of the system. The string `component` must be one of the following:
- `all`: shutdowns everything
- `camera`: only shutdowns the camera
- `relay`: forced shutdown of camera by opening the relay

Returns 404 if the `component` string is invalid

# POST `/reboot/<component>`
Reboots a component of the system. The string `component` must be one of the following:
- `all`: reboots everything
- `camera`: only reboots the camera
- `relay`: forced reboot of camera by opening and closing the relay

Returns 404 if the `component` string is invalid
