import * as encoder_api from "./encoder_api.js";
import * as trajectory_graph from "./trajectory_graph.js";
import { open_modal_download } from "./modal/download.js";
import { open_modal_upgrade } from "./modal/upgrade.js";

export function init_controls() {
  window.btns = {
    iniciar_aquisicao: document.querySelector('button.iniciar-aquisicao'),
    parar_aquisicao: document.querySelector('button.parar-aquisicao'),
    mudar_modo: document.querySelector('button.mudar-modo'),
    reiniciar: document.querySelector('button.reiniciar'),
    desligar: document.querySelector('button.desligar'),
    upgrade: document.querySelector('button.upgrade'),
    calibrar_exposicao: document.querySelector('.exposicao'),
    listar_ensaios: document.querySelector('button.listar-ensaios'),
    zerar_deslocamento: document.querySelector('button.zerar-deslocamento'),
  };

  for (let [_, btn] of Object.entries(window.btns)) {
    btn.disabled = true;
    btn.debounce_id = null;
  }

  window.toggle_streaming = document.querySelector('button.toggle-streaming');
  window.toggle_calibracao = document.querySelector('button.toggle-calibracao');

  window.pulsos_por_segundo = document.querySelector('.pulsos-por-segundo > input');
  window.motivo = document.querySelector('.motivo > input');

  window.brightness_slider = document.querySelector('.brilho > input[type="range"]');
  window.brightness_slider.value = 1;
  window.brightness_slider.oninput = () => {
    window.video_frame.style.filter = window.video_frame.style.filter.replace(
      /brightness(.*)/,
      `brightness(${window.brightness_slider.value})`
    );
  }
  window.brightness_reset = document.querySelector('.brilho > input[type="button"]');
  window.brightness_reset.onclick = () => {
    window.video_frame.style = 'filter: brightness(1.0)';
    window.brightness_slider.value = 1;
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

  window.btns.calibrar_exposicao.addEventListener('click', async event => {
    encoder_api.calibrate_exposure(event)
  });

  window.log_clear.addEventListener('click', () => window.log_text.innerText = '');
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
  window.toggle_streaming.disabled = window.toggle_streaming.debounce_enabled || global_disable;
  window.btns.mudar_modo.disabled = global_disable || status.estado !== 'Ready';
  window.btns.reiniciar.disabled = global_disable || status.rpi5 === false;
  window.btns.desligar.disabled = global_disable || status.rpi5 === false;
  window.btns.upgrade.disabled = global_disable || status.rpi5 === false;
  window.btns.listar_ensaios.disabled = global_disable;

  window.btns.zerar_deslocamento.disabled = global_disable || status.modo !== "Odometro";
  window.btns.zerar_deslocamento.style.display = global_disable || status.modo !== "Odometro" ? "none" : "block";
  window.pulsos_por_segundo.parentElement.style.display = global_disable || status.modo !== "Tempo" ? "none" : "flex";
}
