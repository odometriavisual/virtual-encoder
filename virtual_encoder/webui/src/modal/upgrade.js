import { send_upgrade_zip, reboot } from "../encoder_api";

export function init_modal_upgrade() {
  window.modal_upgrade = {
    modal: document.querySelector('.modal-upgrade'),
    input: document.querySelector('.modal-upgrade input'),
    close: document.querySelector('.modal-upgrade .modal-close'),
    info: document.querySelector('.modal-upgrade .modal-info'),
  }

  window.modal_upgrade.close.addEventListener('click', event => {
    window.modal_upgrade.modal.style.display = 'none'
  });

  window.modal_upgrade.input.addEventListener("change", async e => {
    window.modal_upgrade.info.innerHTML = "<h2>Instalando atualização...</h2>";
    window.modal_upgrade.input.disabled = true;

    let text = await send_upgrade_zip(e, e.target.files);
    window.modal_upgrade.info.innerHTML = text;

    if (text.indexOf("sucesso") > 0) {
      reboot(e, "all");

      setTimeout(() => {
        window.location.reload();
      }, 30 * 1000);
    }
  });

  window.addEventListener('click', event => {
    if (event.target === window.modal_upgrade.modal) {
      window.modal_upgrade.modal.style.display = 'none';
    }
  });

}

export function open_modal_upgrade() {
  window.modal_upgrade.modal.style.display = 'block';
}
