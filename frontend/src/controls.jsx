import "./controls.css";

import * as encoder_api from "./encoder_api.js";

import { useEncoder } from "./encoder_context.jsx";
import { useState } from "preact/hooks";

export function Controls() {
  const {
    brightness, set_brightness,
    set_points,
    set_modal,
    status
  } = useEncoder();

  const [pulsos_por_segundo, set_pulsos_por_segundo] = useState(10);
  const [ensaio_name, set_ensaio_name] = useState("");

  const zerar_deslocamentos = async ev => {
    await encoder_api.reset_position(ev);
    set_points([]);
  };

  const toggle_alinamento = () => {
    document.querySelectorAll('.crosshair').forEach(e => e.classList.toggle('hidden'))
  };

  const toggle_streaming = ev => {
    if (status.camera) {
      encoder_api.stop_stream(ev);
    }
    else {
      encoder_api.start_stream(ev);
    }
  };

  const iniciar_aquisicao = async () => {
    await encoder_api.reset_position();
    set_points([]);

    const pps = parseInt(pulsos_por_segundo);
    encoder_api.start_acquisition(pps, ensaio_name);
  };

  const parar_aquisicao = () => { encoder_api.stop_acquisition(); };

  const enable_iniciar = status.estado === "Ready";
  const enable_parar = status.estado?.startsWith("Aquisicao");

  return (
    <div class="controles">
      <label class="brilho">
        <div>Brilho:</div>
        <input type="button" value="Reset" onClick={() => set_brightness(1.)} />
        <input type="range" min="0" max="10" step="0.05" value={brightness} onInput={e => set_brightness(e.target.value)} />
      </label>

      <button class="row-3 col-1 span-2" onClick={e => encoder_api.calibrate_exposure(e)} disabled={!enable_iniciar}>Calibrar Exposição</button>
      <button class="row-4 col-1 span-2" onClick={() => set_modal("calibracao")} disabled={!enable_iniciar}>Calibrar Resolução</button>

      {
        status.modo === "Tempo" ?
          <label class="row-3 col-3 span-2 text-label">
            <div>Pulsos/s:</div>
            <input type="number" value={pulsos_por_segundo} onInput={ev => set_pulsos_por_segundo(ev.target.value)} disabled={!enable_iniciar} />
          </label>
          :
          <button class="row-3 col-3 span-2" onClick={zerar_deslocamentos}> Zerar deslocamento </button>
      }

      <label class="row-3 col-5 span-5 text-label">
        <div>Nome da aquisição:</div>
        <input type="text" value={ensaio_name} onInput={ev => set_ensaio_name(ev.target.value)} placeholder="Opcional" disabled={!enable_iniciar} />
      </label>

      <button class="row-5 col-1 span-2" onClick={iniciar_aquisicao} disabled={!enable_iniciar}> Iniciar Aquisição </button>
      <button class="row-5 span-2" onClick={parar_aquisicao} disabled={!enable_parar}> Parar Aquisição </button>

      <button class="row-3 col-11 span-2" onClick={() => set_modal("download")} disabled={!enable_iniciar}> Baixar Ensaios Gravados </button>

      <button class="row-4 col-11 span-2" onClick={toggle_streaming} disabled={!enable_iniciar}> Toggle Streaming </button>
      <button class="row-5 col-11 span-2" onClick={toggle_alinamento}> Toggle Alinhamento </button>

      <button class="row-5 col-8 span-2" onClick={() => set_modal("modo")} disabled={!enable_iniciar}> Mudar modo </button>
      <button class="row-3 col-13 span-2" onClick={() => set_modal("upgrade")} disabled={!enable_iniciar}> Atualizar Software </button>

      <button class="row-5 col-13 span-2" onClick={() => set_modal("reiniciar")} disabled={!enable_iniciar}> Reiniciar </button>
      <button class="row-4 col-13 span-2" onClick={() => set_modal("desligar")} disabled={!enable_iniciar}> Desligar </button>
    </div>
  )
}
