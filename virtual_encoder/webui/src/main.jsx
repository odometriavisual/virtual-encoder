import './style.css'

import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { fetch_status_stream } from './encoder_api.js'

import { Log } from './log.jsx';

function Monitoramento() {
  useEffect(() => {
    init_status_watcher();
  }, []);

  return (
    <div class="monitoramento">
      <div>Monitoramento</div>
      <div class="status rpi5 err">
        RPi 5
      </div>
      <div class="status camera err">Picam</div>
      <div class="status imu err">IMU</div>
    </div>
  )
}

function ModalDesligar() {
  return (
    <div class="modal modal-desligar">
      <div class="modal-content">
        <span class="modal-titulo">Confirme qual componente você deseja desligar:</span>
        <span class="modal-close">&times;</span>
        <button class="encoder">Desligar encoder e câmera subsea</button>
        <button class="led">Desligar LED</button>
      </div>
    </div>
  )
}

function ModalReiniciar() {
  return (
    <div class="modal modal-reiniciar">
      <div class="modal-content">
        <span class="modal-titulo">Confirme qual componente você deseja reiniciar:</span>
        <span class="modal-close">&times;</span>
        <button class="encoder">Reiniciar encoder e câmera subsea</button>
        <button class="led">Reiniciar LED</button>
      </div>
    </div>
  )
}

function ModalModos() {
  return (
    <div class="modal modal-modos">
      <div class="modal-content">
        <span class="modal-titulo">Selecione o modo:</span>
        <span class="modal-close">&times;</span>
        <button class="modo-tempo">Modo Tempo</button>
        <button class="modo-odometro">Modo Estimativa em Tempo Real</button>
      </div>
    </div>
  )
}

function ModalDownload() {
  return (
    <div class="modal modal-download">
      <div class="modal-content">
        <span class="modal-titulo">Download de ensaios:</span>
        <span class="modal-close">&times;</span>

        <div class="modal-list">
        </div>

        <button class="modal-update">Atualizar lista</button>
      </div>
    </div>
  )
}

function ModalUpgrade() {
  return (
    <div class="modal modal-upgrade">
      <div class="modal-content">
        <span class="modal-titulo">Atualização de software:</span>
        <span class="modal-close">&times;</span>

        <span class="modal-info">Envie o arquivo para iniciar atualização:</span>
        <input type="file" accept=".zip"> </input>
      </div>
    </div>
  )
}

function ModalCalibracao() {
  return (
    <div class="modal modal-calibracao">
      <div class="modal-content">
        <span class="modal-titulo">Calibrar resolução espacial</span>
        <span class="modal-close">&times;</span>

        <section class="calib-foto">
          <header>
            <span>Método 1:</span>
            <span>Aponte a câmera para o padrão de calibração e aperte o botão abaixo:</span>
          </header>
          <button class="btn-foto">Calibrar por foto</button>
        </section>

        <section class="calib-movimento">
          <header>
            <span>Método 2:</span>
            <span>Mova a câmera uma distância conhecida, preencha a tabela e aperte o botão abaixo:</span>
          </header>

          <label>
            <span> Distância percorrida (mm): </span>
            <input class="dist-mm" type="number" min="0" value="1" rer />
          </label>
          <div>
            <span> Distância percorrida (px): </span>
            <span class="dist-px"></span>
          </div>
          <div>
            <span> Resolução espacial: </span>

            <span class="spatial-res"></span>
          </div>
          <button class="btn-movimento">Calibrar por movimento</button>
        </section>
      </div>
    </div>
  )
}

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

  useEffect(() => fetch_status_stream(set_status, error_status), []);

  return (
    <div class="wrapper">
      <Video status={status} brigthness={brigthness} />
      <Monitoramento />
      <Log status={status} />
      <Controles status={status} />

      <ModalDesligar />
      <ModalReiniciar />
      <ModalModos />
      <ModalDownload />
      <ModalUpgrade />
      <ModalCalibracao />
    </div>
  )
}

render(<App />, document.getElementById("app"))


window.onload = () => {
  init_modal_modos();
  init_modal_desligar();
  init_modal_reiniciar();
  init_modal_download();
  init_modal_upgrade();
  init_modal_calibracao();

  function update_status(status) {
    update_status_watcher(status);
    update_controls(status);
    update_imu_canvas(status);
    update_trajectory_graph(status);
    update_modal_calibracao(status);
  }

}
