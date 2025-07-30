import {next_modo} from "../encoder_api.js";

export function init_modal_desligar() {
    window.modal_desligar = {
        modal: document.querySelector('.modal-desligar'),
        close: document.querySelector('.modal-desligar .modal-close'),
        encoder: document.querySelector('.modal-desligar .encoder'),
        camera_subsea: document.querySelector('.modal-desligar .camera-subsea'),
        rele: document.querySelector('.modal-desligar .rele'),
    }

    window.modal_desligar.close.addEventListener('click', event => {
        window.modal_desligar.modal.style.display = 'none'
    })

    window.modal_desligar.encoder.addEventListener('click', event => {
        window.modal_desligar.modal.style.display = 'none'
        next_modo(event, 'poweroff')
    })

    window.modal_desligar.camera_subsea.addEventListener('click', event => {
        window.modal_desligar.modal.style.display = 'none'
        next_modo(event, 'poweroff rpi0')
    })

    window.modal_desligar.rele.addEventListener('click', event => {
        window.modal_desligar.modal.style.display = 'none'
        next_modo(event, 'poweroff relay')
    })

    window.addEventListener('click', event => {
        if (event.target === window.modal_desligar.modal) {
            window.modal_desligar.modal.style.display = 'none'
        }
    })
}