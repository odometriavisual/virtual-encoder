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

  window.modal_download.update.addEventListener('click', event => {
    const ensaios = [
      "a.zip",
      "b.zip",
      "c.zip",
    ];
    update_modal_downloader(ensaios);
  });
}

function update_modal_downloader(ensaios) {
  let inner_html = "";

  for (const ensaio of ensaios) {
    inner_html += html`
      <div class="modal-row">
          <a href="ensaios/${ensaio}">${ensaio}</a>
          <span class="modal-close">&times;</span>
      </div>
    `;
  }

  window.modal_download.list.innerHTML = inner_html;
}
