import "./style.css"

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

import { fetch_status_stream } from "./encoder_api.js"

import { EncoderContext, useEncoder } from "./encoder_context.jsx";
import { Log } from "./log.jsx";
import { Modal } from "./modal.jsx";
import { Video } from "./video.jsx";
import { Monitoramento } from "./monitoramento.jsx";
import{ Controles } from "./controles.jsx";

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
    status, set_status, error_status,
    brightness, set_brightness,
    log, set_log,
    points, set_points,
    modal, set_modal,
  };

  return (
    <div class="wrapper">
      <EncoderContext.Provider value={encoder_context_value}>
        <Video />
        <Monitoramento />
        <Log />
        <Controles />
        <Modal />
      </EncoderContext.Provider>
    </div>
  )
}

render(<App />, document.getElementById("app"))
