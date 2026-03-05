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

  open_modal_download({ target: { disabled: false } });
}

export function open_modal_download(event) {
  encoder_api.get_ensaios(event).then(res => update_modal_download(res));
  window.modal_download.modal.style.display = 'block';
}

function update_modal_download(ensaios) {
  if (ensaios.length > 0) {
    window.modal_download.list.innerHTML = "";

    for (const ensaio of ensaios) {
      const row = document.createElement("div");
      const a = document.createElement("a");
      const remove_button = document.createElement("button");
      const restore_button = document.createElement("button");

      row.classList.add("modal-row");
      a.href = `ensaios/${ensaio}`;
      a.innerText = ensaio;
      remove_button.innerText = "Deletar";
      restore_button.innerText = "Restaurar";

      remove_button.addEventListener("click", async event => {
        if (confirm(`Deseja realmente deletar ${ensaio}?`)) {
          await encoder_api.remove_ensaio(event, ensaio);

          a.style.textDecoration = "line-through";
          a.style.color = "red";
          a.style.cursor = "auto";
          a.style.pointerEvents = "none";

          row.removeChild(remove_button);
          row.appendChild(restore_button);
        }
      })

      restore_button.addEventListener("click", async event => {
        await encoder_api.restore_ensaio(event, ensaio);

        a.style.textDecoration = "";
        a.style.color = "green";
        a.style.cursor = "";
        a.style.pointerEvents = "";

        row.removeChild(restore_button);
        row.appendChild(remove_button);
      })

      row.appendChild(a);
      row.appendChild(remove_button);
      window.modal_download.list.appendChild(row);
    }
  }
  else {
    window.modal_download.list.innerHTML = html`<h1>Nenhum ensaio gravado</h1>`;
  }
}
