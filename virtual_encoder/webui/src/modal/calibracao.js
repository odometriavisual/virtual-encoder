import * as encoder_api from "../encoder_api.js";

export function init_modal_calibracao() {
    window.modal_calibracao = {
        modal: document.querySelector('.modal-calibracao'),
        btn_foto: document.querySelector('.modal-calibracao .btn-foto'),
        btn_movimento: document.querySelector('.modal-calibracao .btn-movimento'),
        input_dist: document.querySelector('.modal-calibracao .input-dist'),
        close: document.querySelector('.modal-calibracao .modal-close'),
    }

    window.modal_calibracao.close.addEventListener('click', event => {
        window.modal_calibracao.modal.style.display = 'none'
    });

    window.addEventListener('click', event => {
        if (event.target === window.modal_calibracao.modal) {
            window.modal_calibracao.modal.style.display = 'none';
        }
    });

    window.modal_calibracao.btn_foto.addEventListener("click", async event => {
        encoder_api.calibrate_resolution(event, 8);
        window.modal_calibracao.modal.style.display = 'none';
    });

    window.modal_calibracao.btn_movimento.addEventListener("click", async event => {
        alert('not implemented')
        window.modal_calibracao.modal.style.display = 'none';
    });
}

export function open_modal_calibracao(event) {
    window.modal_calibracao.modal.style.display = 'block';
}
