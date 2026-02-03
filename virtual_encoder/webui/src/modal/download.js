import * as encoder_api from "../encoder_api.js";

export function init_modal_download() {
  window.modal_download = {
    modal: document.querySelector('.modal-download'),
    close: document.querySelector('.modal-download .modal-close'),
    progress: document.querySelector('.modal-download .modal-progress')
  };

  window.modal_download.close.addEventListener('click', event => {
    window.modal_download.modal.style.display = 'none'
    encoder_api.set_modo(event, '');
  });

  window.addEventListener('click', event => {
    if (event.target === window.modal_download.modal) {
      window.modal_download.modal.style.display = 'none'
      encoder_api.set_modo(event, '');
    }
  });
}

export function update_modal_downloader(status) {
  if (status.modo === 'Download') {
    window.modal_download.modal.style.display = 'block';
    window.modal_download.progress.innerHTML = `Sincronizando ${status.estado} ensaios...`;
  }
  else {
    window.modal_download.modal.style.display = 'none';
  }
}
