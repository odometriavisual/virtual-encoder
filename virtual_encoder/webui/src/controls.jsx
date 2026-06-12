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

  const iniciar_aquisicao = async event => {
    await encoder_api.reset_position(event);
    set_points([]);

    const pps = parseInt(pulsos_por_segundo);
    encoder_api.start_acquisition(event, pps, ensaio_name);
  };

  const parar_aquisicao = event => {
    encoder_api.stop_acquisition(event);
  };

  const enable_iniciar = status.estado === "Ready";
  const enable_parar = status.estado?.startsWith("Aquisicao");

  return (
    <div class="controles">
      <label class="brilho">
        <div>Brilho:</div>
        <input type="button" value="Reset" onClick={() => set_brightness(1.)} />
        <input type="range" min="0" max="10" step="0.05" value={brightness} onInput={e => set_brightness(e.target.value)} />
      </label>

      <button class="exposicao" onClick={e => encoder_api.calibrate_exposure(e)} disabled={!enable_iniciar}>Calibrar Exposição</button>
      <button class="resolucao-espacial" onClick={() => set_modal("calibracao")} disabled={!enable_iniciar}>Calibrar Resolução</button>

      {
        status.modo === "Tempo" ?
          <label class="pulsos-por-segundo">
            <div>Pulsos/s:</div>
            <input type="number" value={pulsos_por_segundo} onInput={ev => set_pulsos_por_segundo(ev.target.value)} disabled={!enable_iniciar} />
          </label>
          :
          <button class="zerar-deslocamento" onClick={zerar_deslocamentos}> Zerar deslocamento </button>
      }

      <label class="motivo">
        <div>Nome da aquisição:</div>
        <input type="text" value={ensaio_name} onInput={ev => set_ensaio_name(ev.target.value)} placeholder="Opcional" disabled={!enable_iniciar} />
      </label>

      <button class="iniciar-aquisicao" onClick={iniciar_aquisicao} disabled={!enable_iniciar}> Iniciar Aquisição </button>
      <button class="parar-aquisicao" onClick={parar_aquisicao} disabled={!enable_parar}> Parar Aquisição </button>

      <button class="listar-ensaios" onClick={() => set_modal("download")} disabled={!enable_iniciar}> Baixar Ensaios Gravados </button>

      <button class="toggle-streaming" onClick={toggle_streaming} disabled={!enable_iniciar}> Toggle Streaming </button>
      <button class="toggle-calibracao" onClick={toggle_alinamento}> Toggle Alinhamento </button>
      <button class="mudar-modo" onClick={() => set_modal("modo")} disabled={!enable_iniciar}> Mudar modo </button>
      <button class="upgrade" onClick={() => set_modal("upgrade")} disabled={!enable_iniciar}> Atualizar Software </button>
      <button class="reiniciar" onClick={() => set_modal("reiniciar")} disabled={!enable_iniciar}> Reiniciar </button>
      <button class="desligar" onClick={() => set_modal("desligar")} disabled={!enable_iniciar}> Desligar </button>
    </div>
  )
}
