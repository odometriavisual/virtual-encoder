import './style.css'
import { fetch_status_stream } from './encoder_api.js'
import { init_controls, update_controls } from "./controls.js"
import { init_status_watcher, update_status_watcher } from "./status_watcher.js"
import { init_imu_canvas, update_imu_canvas } from "./canvas/imu.js";
import { init_modal_modos } from "./modal/modos.js";
import { init_modal_desligar } from "./modal/desligar.js";
import { init_modal_reiniciar } from "./modal/reiniciar.js";
import { init_log, update_log } from "./log.js";
import { init_video_feed } from "./video_feed.js";
import { init_modal_download } from "./modal/download.js";
import { init_modal_upgrade } from "./modal/upgrade.js";
import { init_trajectory_graph, update_trajectory_graph } from './trajectory_graph.js';

export const html = String.raw;

document.querySelector('#app').innerHTML = html`
    <div class="wrapper">
        <div class="visualization">
            <img src="" alt="" class="video-frame"/>
            <div class="crosshair hidden vertical"></div>
            <div class="crosshair hidden horizontal"></div>
        </div>

        <div class="monitoramento">
            <div>Monitoramento</div>
            <div class="status rpi5 err">
                RPi 5
            </div>
            <div class="status camera err">Picam</div>
            <div class="status imu err">IMU</div>
        </div>

        <div class="log">
            <div class="trajectory-container"></div>
            <div class="log-window"></div>
            <button>Apagar log</button>
        </div>

        <div class="controles">
            <label class="brilho">
                <div>Brilho:</div>
                <input type="button" value="Reset"/>
                <input type="range" min="0" max="10" step="0.05" value="1" />
            </label>

            <button class="exposicao">Calibrar Exposição</button>
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

        <div class="modal modal-desligar">
            <div class="modal-content">
                <span class="modal-titulo">Confirme qual componente você deseja desligar:</span>
                <span class="modal-close">&times;</span>
                <button class="encoder">Desligar encoder e câmera subsea</button>
                <button class="led">Desligar LED</button>
                <button class="rele">Desligar relê</button>
            </div>
        </div>

        <div class="modal modal-reiniciar">
            <div class="modal-content">
                <span class="modal-titulo">Confirme qual componente você deseja reiniciar:</span>
                <span class="modal-close">&times;</span>
                <button class="encoder">Reiniciar encoder e câmera subsea</button>
                <button class="led">Reiniciar LED</button>
                <button class="rele">Reiniciar relê</button>
            </div>
        </div>

        <div class="modal modal-modos">
            <div class="modal-content">
                <span class="modal-titulo">Selecione o modo:</span>
                <span class="modal-close">&times;</span>
                <button class="modo-tempo">Modo Tempo</button>
                <button class="modo-odometro">Modo Estimativa em Tempo Real</button>
            </div>
        </div>
        
        <div class="modal modal-download">
            <div class="modal-content">
                <span class="modal-titulo">Download de ensaios:</span>
                <span class="modal-close">&times;</span>
                
                <div class="modal-list">
                </div>

                <button class="modal-update">Atualizar lista</button>
            </div>
        </div>

        <div class="modal modal-upgrade">
            <div class="modal-content">
                <span class="modal-titulo">Atualização de software:</span>
                <span class="modal-close">&times;</span>
                
                <span class="modal-info">Envie o arquivo para iniciar atualização:</span>
                <input type="file" accept=".zip"> </input>
            </div>
        </div>
    </div>
`

window.onload = () => {
  init_trajectory_graph()
  init_status_watcher()
  init_log()

  init_imu_canvas()
  init_video_feed()

  init_modal_modos()
  init_modal_desligar()
  init_modal_reiniciar()
  init_modal_download()
  init_modal_upgrade()

  init_controls()

  function update_status(status) {
    update_status_watcher(status)
    update_controls(status)
    update_imu_canvas(status)
    update_log(status)
    update_trajectory_graph(status)
  }

  fetch_status_stream(update_status)
}
