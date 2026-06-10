import * as encoder_api from "./encoder_api.js";
import * as trajectory_graph from "./trajectory_graph.js";
import { open_modal_download } from "./modal/download.js";
import { open_modal_upgrade } from "./modal/upgrade.js";
import { open_modal_calibracao } from "./modal/calibracao.js";
import { useEncoder } from "./encoder_context.jsx";

export function Controles() {
  const {
    brightness, set_brightness,
    pulsos_por_segundo, set_pulsos_por_segundo,
    nome_ensaio, set_nome_ensaio,
    status,
  } = useEncoder();

  useEffect(() => {
    init_controls();
  }, []);

  return (
    <div class="controles">
      <label class="brilho">
        <div>Brilho:</div>
        <input type="button" value="Reset" onClick={() => set_brightness(1.)} />
        <input type="range" min="0" max="10" step="0.05" value={brightness} onChange={e => set_brightness(e.target.value)} />
      </label>

      <button class="exposicao" onClick={e => encoder_api.calibrate_exposure(e)}>Calibrar Exposição</button>
      <button class="resolucao-espacial">Calibrar Resolução</button>
      <button class="zerar-deslocamento" style="display: none;" disabled>Zerar deslocamento</button>

      <label class="pulsos-por-segundo">
        <div>Pulsos/s:</div>
        <input type="number" value="10" />
      </label>

      <label class="motivo">
        <div>Nome da aquisição:</div>
        <input type="text" value="" placeholder="Opcional" />
      </label>

      <button class="iniciar-aquisicao" disabled>Iniciar Aquisição</button>
      <button class="parar-aquisicao" disabled>Parar Aquisição</button>
      <button class="listar-ensaios" disabled>Baixar Ensaios Gravados</button>

      <button class="toggle-streaming">Toggle Streaming</button>
      <button class="toggle-calibracao">Toggle Alinhamento</button>
      <button class="mudar-modo" disabled>Mudar modo</button>
      <button class="upgrade" disabled>Atualizar Software</button>
      <button class="reiniciar" disabled>Reiniciar</button>
      <button class="desligar" disabled>Desligar</button>
    </div>
  )
}


export function init_controls() {
  for (let [_, btn] of Object.entries(window.btns)) {
    btn.disabled = true;
    btn.debounce_id = null;
  }


  window.btns.zerar_deslocamento.addEventListener('click', async event => {
    await encoder_api.reset_position(event);
    trajectory_graph.clear_trajectory_graph();
  });

  window.btns.iniciar_aquisicao.addEventListener('click', async event => {
    await encoder_api.reset_position(event);
    trajectory_graph.clear_trajectory_graph();

    const pps = parseInt(window.pulsos_por_segundo.value);
    const reason = window.motivo.value;
    encoder_api.start_acquisition(event, pps, reason);
  })

  window.btns.parar_aquisicao.addEventListener('click', event => {
    encoder_api.stop_acquisition(event);
  })

  window.btns.mudar_modo.addEventListener('click', event => window.modal_modos.modal.style.display = 'block');
  window.btns.desligar.addEventListener('click', event => window.modal_desligar.modal.style.display = 'block');
  window.btns.reiniciar.addEventListener('click', event => window.modal_reiniciar.modal.style.display = 'block');
  window.btns.listar_ensaios.addEventListener('click', event => open_modal_download(event));
  window.btns.upgrade.addEventListener('click', event => open_modal_upgrade());

  window.streaming_enabled = true;
  window.toggle_streaming.addEventListener('click', async event => {
    if (window.streaming_enabled) {
      encoder_api.stop_stream(event);
    }
    else {
      encoder_api.start_stream(event);
    }
    window.streaming_enabled = !window.streaming_enabled;
  });

  window.toggle_calibracao.addEventListener('click', event =>
    document.querySelectorAll('.crosshair').forEach(e => e.classList.toggle('hidden'))
  );

  window.btns.calibrar_resolucao.addEventListener('click', event => {
    open_modal_calibracao(event);
  });

  window.log_clear.addEventListener('click', () => {
    window.log_text.innerText = '';
    trajectory_graph.clear_trajectory_graph();
  });
}

export function update_controls(status) {
  const global_disable = status.estado === 'Gravando...' || status.modo === 'Calibracao' || !status.rpi5;

  if (status.modo === 'Tempo' || status.modo === 'Odometro') {
    window.btns.iniciar_aquisicao.disabled = window.btns.iniciar_aquisicao.debounce_enabled || global_disable || status.estado !== 'Ready';
    window.btns.parar_aquisicao.disabled = window.btns.parar_aquisicao.debounce_enabled || global_disable || !status.estado.startsWith('Aquisicao');
  }
  else if (status.modo === 'Autonomo') {
    window.btns.iniciar_aquisicao.disabled = true;
    window.btns.parar_aquisicao.disabled = true;
  }
  else if (status.modo === 'Download') {
    window.btns.iniciar_aquisicao.disabled = true;
    window.btns.parar_aquisicao.disabled = true;
  }
  else if (status.modo === 'Desligado') {
    for (let [_, btn] of Object.entries(window.btns)) {
      btn.disabled = true;
    }
  }
  else if (status.modo === 'Calibracao') {
    window.btns.iniciar_aquisicao.disabled = true;
    window.btns.parar_aquisicao.disabled = true;
  }

  window.btns.calibrar_exposicao.disabled = global_disable || status.modo === 'Calibracao' || status.estado !== "Ready";
  window.btns.calibrar_resolucao.disabled = global_disable || status.modo === 'Calibracao' || status.estado !== "Ready";
  window.toggle_streaming.disabled = window.toggle_streaming.debounce_enabled || global_disable;
  window.btns.mudar_modo.disabled = global_disable || status.estado !== 'Ready';
  window.btns.reiniciar.disabled = global_disable || status.rpi5 === false;
  window.btns.desligar.disabled = global_disable || status.rpi5 === false;
  window.btns.upgrade.disabled = global_disable || status.rpi5 === false;
  window.btns.listar_ensaios.disabled = global_disable;

  window.btns.zerar_deslocamento.disabled = global_disable || status.modo !== "Odometro";
  window.btns.zerar_deslocamento.disabled = global_disable;
  window.pulsos_por_segundo.parentElement.disabled = global_disable;

  window.btns.zerar_deslocamento.style.display = status.modo !== "Odometro" ? "none" : "block";
  window.pulsos_por_segundo.parentElement.style.display = status.modo !== "Tempo" ? "none" : "flex";
}
