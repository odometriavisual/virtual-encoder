import * as encoder_api from "../encoder_api.js";
import { html } from "../main.js";

export function init_modal_download() {
  window.modal_download = {
    modal: document.querySelector('.modal-download'),
    close: document.querySelector('.modal-download .modal-close'),
    list: document.querySelector('.modal-download .modal-list'),
    update: document.querySelector('.modal-download .modal-update'),
  };

  window.modal_download.close.addEventListener('click', event => {
    window.modal_download.modal.style.display = 'none'
  });

  window.addEventListener('click', event => {
    if (event.target === window.modal_download.modal) {
      window.modal_download.modal.style.display = 'none'
    }
  });

  window.modal_download.update.addEventListener('click', async event => {
    const ensaios = await encoder_api.get_ensaios(event);
    update_modal_download(ensaios);
  });
}

export function open_modal_download(event) {
  encoder_api.get_ensaios(event).then(res => update_modal_download(res));
  window.modal_download.modal.style.display = 'block';
}

function update_modal_download(ensaios) {
  let inner_html = "";

  if (ensaios.length > 0) {
    for (const ensaio of ensaios) {
      inner_html += html`
        <label class="modal-row">
            <a href="ensaios/${ensaio}">${ensaio}</a>
        </label>
      `;
    }
  }
  else {
    inner_html += html`<h1>Nenhum ensaio gravado</h1>`;
  }

  window.modal_download.list.innerHTML = inner_html;
}
