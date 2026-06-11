import "./modal.css"

import { useEncoder } from "./encoder_context"
import { useState } from "preact/hooks"

import * as encoder_api from "./encoder_api.js";

function ModalDesligar() {
  const { set_modal } = useEncoder();
  
  return (
    <div class="modal-content">
      <span class="modal-titulo">Confirme qual componente você deseja desligar:</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>
      <button class="encoder">Desligar encoder e câmera subsea</button>
      <button class="led">Desligar LED</button>
    </div>
  )
}

function ModalReiniciar() {
  const { set_modal } = useEncoder();
  
  return (
    <div class="modal-content">
      <span class="modal-titulo">Confirme qual componente você deseja reiniciar:</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>
      <button class="encoder">Reiniciar encoder e câmera subsea</button>
      <button class="led">Reiniciar LED</button>
    </div>
  )
}

function ModalModos() {
  const { set_modal } = useEncoder();
  
  return (
    <div class="modal-content modal-modos">
      <span class="modal-titulo">Selecione o modo:</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>
      <button class="modo-tempo">Modo Tempo</button>
      <button class="modo-odometro">Modo Estimativa em Tempo Real</button>
    </div>
  )
}

function ModalDownload() {
  const { set_modal } = useEncoder();
  
  return (
    <div class="modal-content modal-download">
      <span class="modal-titulo">Download de ensaios:</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>

      <div class="modal-list">
      </div>

      <button class="modal-update">Atualizar lista</button>
    </div>
  )
}

function ModalUpgrade() {
  const { set_modal } = useEncoder();
  
  return (
    <div class="modal-content modal-upgrade">
      <span class="modal-titulo">Atualização de software:</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>

      <span class="modal-info">Envie o arquivo para iniciar atualização:</span>
      <input type="file" accept=".zip"> </input>
    </div>
  )
}

function ModalCalibracao() {
  const { set_modal, status } = useEncoder();
  const [dist_mm, set_dist_mm] = useState(1);

  const r = Math.sqrt(status.pos.x*status.pos.x + status.pos.y*status.pos.y).toFixed(2);
  const spatial_res = r/dist_mm;

  const calibrate_photo = ev => {
    encoder_api.calibrate_resolution(ev, "photo", 8);
    set_modal(null);
  };

  const calibrate_displacement = ev => {
    encoder_api.calibrate_resolution(ev, "displacement", spatial_res);
    set_modal(null);
  };
  
  return (
    <div class="modal-content modal-calibracao">
      <span class="modal-titulo">Calibrar resolução espacial</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>

      <section class="calib-foto">
        <header>
          <span>Método 1:</span>
          <span>Aponte a câmera para o padrão de calibração e aperte o botão abaixo:</span>
        </header>
        <button class="btn-foto" onClick={calibrate_photo}>Calibrar por foto</button>
      </section>

      <section class="calib-movimento">
        <header>
          <span>Método 2:</span>
          <span>Mova a câmera uma distância conhecida, preencha a tabela e aperte o botão abaixo:</span>
        </header>

        <label>
          <span> Distância percorrida (mm): </span>
          <input class="dist-mm" type="number" min="0" value={dist_mm} onInput={ev => set_dist_mm(ev.target.value)} />
        </label>
        <div>
          <span> Distância percorrida (px):</span>
          <span class="dist-px">{r} px</span>
        </div>
        <div>
          <span> Resolução espacial:</span>
          <span class="spatial-res">{spatial_res.toFixed(2)} px/mm</span>
        </div>
        <button class="btn-movimento" disabled={!isFinite(r/dist_mm)} onClick={calibrate_displacement}>Calibrar por movimento</button>
      </section>
    </div>
  )
}

function SwitchModal({ modal }) {
  switch (modal) {
    case "desligar":
      return <ModalDesligar />;

    case "reiniciar":
      return <ModalReiniciar />;

    case "modos":
      return <ModalModos />;

    case "download":
      return <ModalDownload />;

    case "upgrade":
      return <ModalUpgrade />;

    case "calibracao":
      return <ModalCalibracao />;

    default:
      return null;
  }
}

export function Modal() {
  const { modal, set_modal } = useEncoder();

  const close_on_click_outside = ev => {
    if (ev.target.classList.contains("modal")) {
      set_modal(null);
    }
  }

  if (modal === null) return null;

  return (
    <div onClick={close_on_click_outside} class="modal">
      <SwitchModal modal={modal} />
    </div>
  );
}

