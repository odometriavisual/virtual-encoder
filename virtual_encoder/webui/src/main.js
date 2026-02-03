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
import { init_modal_download, update_modal_downloader } from "./modal/download.js";

document.querySelector('#app').innerHTML = `
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
            <canvas style="display: none"></canvas>
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
            <button class="iniciar-download" disabled>Iniciar Download</button>

            <button class="toggle-streaming">Toggle Streaming</button>
            <button class="toggle-calibracao">Toggle Alinhamento</button>

            <button class="mudar-modo" disabled>Mudar modo</button>
            <button class="reiniciar" disabled>Reiniciar</button>
            <button class="desligar" disabled>Desligar</button>
        </div>

        <div class="modal modal-desligar">
            <div class="modal-content">
                <span class="modal-titulo">Confirme qual componente você deseja desligar:</span>
                <span class="modal-close">&times;</span>
                <button class="encoder">Desligar encoder e câmera subsea</button>
                <button class="camera-subsea">Desligar câmera subsea</button>
                <button class="rele">Desligar câmera subsea por relê</button>
            </div>
        </div>

        <div class="modal modal-reiniciar">
            <div class="modal-content">
                <span class="modal-titulo">Confirme qual componente você deseja reiniciar:</span>
                <span class="modal-close">&times;</span>
                <button class="encoder">Reiniciar encoder e câmera subsea</button>
                <button class="camera-subsea">Reiniciar câmera subsea</button>
                <button class="rele">Reiniciar câmera subsea por relê</button>
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
                <span class="modal-titulo">Sincronizando SSD:</span>
                <span class="modal-close">&times;</span>
                <div class="download-loader">
                    <div style="background:black; width: 32px; height:32px"></div>
                    <div class="loader"></div>
                    <div style="background:black; width: 32px; height:32px"></div>
                </div>
                
                <span class="modal-progress"></span>
                <span class="modal-info">Feche este modal para pausar sincronização</span>
            </div>
        </div>
    </div>
`

window.onload = () => {
  window.canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'

  window.draw_point = (x, y) => {
    const w = canvas.width
    const h = canvas.height
    const s = 0.01
    ctx.fillRect(x * s + w / 2 - 1, y * s + h / 2 - 1, 2, 2)

  }
  window.clear_canvas = () => { }

  init_status_watcher()
  init_log()

  init_imu_canvas()
  init_video_feed()

  init_modal_modos()
  init_modal_desligar()
  init_modal_reiniciar()
  init_modal_download()

  init_controls()

  function update_status(status) {
    update_status_watcher(status)
    update_controls(status)
    update_imu_canvas(status)
    update_log(status)
    update_modal_downloader(status)

    window.canvas.style.display = status.modo === 'Odometro' ? 'block' : 'none'
    draw_point(status.pos.x, status.pos.y)
  }

  fetch_status_stream(update_status)
}
