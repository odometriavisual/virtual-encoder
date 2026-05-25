import * as encoder_api from "../encoder_api.js";

export function init_modal_calibracao() {
    window.modal_calibracao = {
        modal: document.querySelector('.modal-calibracao'),
        btn_foto: document.querySelector('.modal-calibracao .btn-foto'),
        btn_movimento: document.querySelector('.modal-calibracao .btn-movimento'),
        dist_px: document.querySelector('.modal-calibracao .dist-px'),
        dist_mm: document.querySelector('.modal-calibracao .dist-mm'),
        spatial_res: document.querySelector('.modal-calibracao .spatial-res'),
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
        encoder_api.calibrate_resolution(event, "photo", 8);
        window.modal_calibracao.modal.style.display = 'none';
    });

    window.modal_calibracao.btn_movimento.addEventListener("click", async event => {
        encoder_api.calibrate_resolution(event, "displacement", window.modal_calibracao.spatial_res.innerText.split(" ")[0]);
        window.modal_calibracao.modal.style.display = 'none';
    });

    const copy_callback = async event => {
        const text = event.target.innerText.split(" ")[0];
        await navigator.clipboard.writeText(text);
        alert(`"${text}" copiado!`);
    };

    window.modal_calibracao.dist_px.addEventListener("click", copy_callback);
    window.modal_calibracao.spatial_res.addEventListener("click", copy_callback);
}

export function open_modal_calibracao(event) {
    window.modal_calibracao.modal.style.display = 'block';
}

export function update_modal_calibracao(status) {
    const {x, y} = status.pos;
    const r_px = Math.sqrt(x*x + y*y);

    const r_mm = window.modal_calibracao.dist_mm.value;
    const spatial_resolution = r_px/r_mm;

    window.modal_calibracao.dist_px.innerText = `${r_px.toFixed(2)} px`;

    if (r_mm > 0.0001 && r_px > 0.0001 && spatial_resolution > 0.9) {
        window.modal_calibracao.spatial_res.innerText = `${spatial_resolution.toFixed(2)} px/mm`
        window.modal_calibracao.btn_movimento.disabled = false;
    }
    else {
        window.modal_calibracao.spatial_res.innerText = "Erro no cálculo"
        window.modal_calibracao.btn_movimento.disabled = true;
    }
}
