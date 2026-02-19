import { send_upgrade_zip } from "../encoder_api";

export function init_modal_upgrade() {
  window.modal_upgrade = {
    modal: document.querySelector('.modal-upgrade'),
    input: document.querySelector('.modal-upgrade input'),
    close: document.querySelector('.modal-upgrade .modal-close'),
    send_button: document.querySelector('.modal-upgrade button'),
  }

  window.modal_upgrade.close.addEventListener('click', event => {
    window.modal_upgrade.modal.style.display = 'none'
  });

  window.modal_upgrade.modal.style = "display: block;"

  window.modal_upgrade.input.addEventListener("change", async e => {
    await send_upgrade_zip(e, e.target.files);
  });

}

export function update_modal_upgrade() {

}
