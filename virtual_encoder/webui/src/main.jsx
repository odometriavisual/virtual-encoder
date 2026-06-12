import "./style.css"

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

 import { EncoderContext } from "./encoder_context.jsx";
import { Log } from "./log.jsx";
import { Modal } from "./modal.jsx";
import { Video } from "./video.jsx";
import { Monitoramento } from "./monitoramento.jsx";
import { Controls } from "./controls.jsx";
import * as encoder_api from "./encoder_api.js";

function App() {
  const error_status = {
    version: "",
    rpi5: false, // { temp: 33., ip: '0.0.0.0', },
    display: false,
    camera: false,
    imu: false,
    pos: { x: 0., y: 0., sr: 1. },
    modo: 'Desligado',
    estado: '',
    msg: '',
  };

  const [status, set_status] = useState(error_status);
  const [brightness, set_brightness] = useState(1.0);
  const [log, set_log] = useState([]);

  const [points, set_points] = useState([]);

  const [modal, set_modal] = useState(null);

  const encoder_context_value = {
    status, set_status,
    brightness, set_brightness,
    log, set_log,
    points, set_points,
    modal, set_modal,
  };

  useEffect(() => encoder_api.fetch_status_stream(set_status, error_status), []);

  return (
    <div class="wrapper">
      <EncoderContext.Provider value={encoder_context_value}>
        <Video />
        <Monitoramento />
        <Log />
        <Controls />
        <Modal />
      </EncoderContext.Provider>
    </div>
  )
}

render(<App />, document.getElementById("app"))
