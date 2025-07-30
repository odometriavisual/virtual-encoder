export function init_modal_reiniciar() {
    window.modal_reiniciar = {
        modal: document.querySelector('.modal-reiniciar'),
        close: document.querySelector('.modal-reiniciar .modal-close'),
        encoder: document.querySelector('.modal-reiniciar .encoder'),
        camera_subsea: document.querySelector('.modal-reiniciar .camera-subsea'),
        rele: document.querySelector('.modal-reiniciar .rele'),
    }

    window.modal_reiniciar.close.addEventListener('click', event => {
        window.modal_reiniciar.modal.style.display = 'none'
    })

    window.modal_reiniciar.encoder.addEventListener('click', event => {
        window.modal_reiniciar.modal.style.display = 'none'
        next_modo(event, 'reboot')
    })

    window.modal_reiniciar.camera_subsea.addEventListener('click', event => {
        window.modal_reiniciar.modal.style.display = 'none'
        next_modo(event, 'reboot rpi0')
    })

    window.modal_reiniciar.rele.addEventListener('click', event => {
        window.modal_reiniciar.modal.style.display = 'none'
        next_modo(event, 'reboot relay')
    })

    window.addEventListener('click', event => {
        if (event.target === window.modal_reiniciar.modal) {
            window.modal_reiniciar.modal.style.display = 'none'
        }
    })
}