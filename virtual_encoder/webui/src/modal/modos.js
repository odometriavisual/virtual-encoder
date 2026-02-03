import * as encoder_api from "../encoder_api.js";

export function init_modal_modos() {
  window.modal_modos = {
    modal: document.querySelector('.modal-modos'),
    close: document.querySelector('.modal-modos .modal-close'),
    modo_tempo: document.querySelector('.modal-modos .modo-tempo'),
    modo_odometro: document.querySelector('.modal-modos .modo-odometro'),
  };

  window.modal_modos.close.addEventListener('click', event => {
    window.modal_modos.modal.style.display = 'none'
  });

  window.modal_modos.modo_tempo.addEventListener('click', event => {
    window.modal_modos.modal.style.display = 'none';
    encoder_api.set_modo(event, 'Tempo');
  });

  window.modal_modos.modo_odometro.addEventListener('click', event => {
    window.modal_modos.modal.style.display = 'none';
    encoder_api.set_modo(event, 'Odometro');
  });

  window.addEventListener('click', event => {
    if (event.target === window.modal_modos.modal) {
      window.modal_modos.modal.style.display = 'none';
    }
  });
}
