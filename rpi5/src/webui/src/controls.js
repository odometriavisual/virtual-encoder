import {next_estado, next_estado_args, next_modo, set_debounce_button} from "./encoder_api.js"

export function init_controls() {
    window.btns = {
        iniciar_aquisicao: document.querySelector('button.iniciar-aquisicao'),
        parar_aquisicao: document.querySelector('button.parar-aquisicao'),
        iniciar_download: document.querySelector('button.iniciar-download'),
        mudar_modo: document.querySelector('button.mudar-modo'),
        reiniciar: document.querySelector('button.reiniciar'),
        desligar: document.querySelector('button.desligar'),
    }

    for (let [_, btn] of Object.entries(window.btns)) {
        btn.disabled = true
        btn.debounce_id = null
    }

    window.toggle_streaming = document.querySelector('button.toggle-streaming')
    window.toggle_calibracao = document.querySelector('button.toggle-calibracao')

    window.exposicao = document.querySelector('.exposicao > input')
    window.pulsos_por_segundo = document.querySelector('.pulsos-por-segundo > input')
    window.motivo = document.querySelector('.motivo > input')

    window.brightness_slider = document.querySelector('.brilho > input[type="range"]')
    window.brightness_slider.value = 1
    window.brightness_slider.oninput = () => {
        window.video_frame.style.filter = window.video_frame.style.filter.replace(
            /brightness(.*)/,
            `brightness(${window.brightness_slider.value})`
        )
    }
    window.brightness_reset = document.querySelector('.brilho > input[type="button"]')
    window.brightness_reset.onclick = () => {
        window.video_frame.style = 'filter: brightness(1.0)'
        window.brightness_slider.value = 1
    }

    window.btns.iniciar_aquisicao.addEventListener('click', event => {
        window.clear_canvas()
        const pps = parseInt(window.pulsos_por_segundo.value)
        const reason = window.motivo.value
        next_estado_args(event, 'Aquisicao', pps, reason)
    })
    window.btns.parar_aquisicao.addEventListener('click', next_estado)

    window.btns.iniciar_download.addEventListener('click', event => next_modo(event, 'Download'))
    window.btns.mudar_modo.addEventListener('click', event => window.modal_modos.modal.style.display = 'block')
    window.btns.desligar.addEventListener('click', event => window.modal_desligar.modal.style.display = 'block')
    window.btns.reiniciar.addEventListener('click', event => window.modal_reiniciar.modal.style.display = 'block')

    window.toggle_streaming.addEventListener('click', async event => {
        set_debounce_button(event.target)
        const method = 'POST'
        await fetch('/toggle_stream', { method })
    })

    window.toggle_calibracao.addEventListener('click', event =>
        document.querySelectorAll('.crosshair').forEach(e => e.classList.toggle('hidden'))
    )

    document.querySelector('.exposicao > button').addEventListener('click', async event => {
        set_debounce_button(event.target)
        const method = 'POST'
        await fetch(`/set_exposure/${window.exposicao.value}`, { method })
    })

    window.exposicao.addEventListener("keyup", async event => {
        if (event.key === "Enter") {
            set_debounce_button(event.target)
            const method = 'POST'
            await fetch(`/set_exposure/${window.exposicao.value}`, { method })
        }
    })

    window.log_clear.addEventListener('click', () => window.log_text.innerText = '')
}

export function update_controls(status) {
    const global_disable = status.estado === 'Calibrando'

    if (status.modo === 'Tempo' || status.modo === 'Odometro') {
        window.btns.iniciar_download.disabled = global_disable

        window.btns.iniciar_aquisicao.disabled = window.btns.iniciar_aquisicao.debounce_enabled || global_disable || status.estado !== 'Ready'
        window.btns.parar_aquisicao.disabled = window.btns.parar_aquisicao.debounce_enabled || global_disable || !status.estado.startsWith('Aquisicao')
    }
    else if (status.modo === 'Autonomo') {
        window.btns.iniciar_download.disabled = global_disable

        window.btns.iniciar_aquisicao.disabled = true
        window.btns.parar_aquisicao.disabled = true
    }
    else if (status.modo === 'Download') {
        window.btns.iniciar_download.disabled = true

        window.btns.iniciar_aquisicao.disabled = true
        window.btns.parar_aquisicao.disabled = true
    }
    else if (status.modo === 'Desligado') {
        for (let [_, btn] of Object.entries(window.btns)) {
            btn.disabled = true
        }
    }

    window.toggle_streaming.disabled = window.toggle_streaming.debounce_enabled || global_disable
    window.btns.mudar_modo.disabled = global_disable || status.estado !== 'Ready'
    window.btns.reiniciar.disabled = global_disable || status.rpi5 === false
    window.btns.desligar.disabled = global_disable || status.rpi5 === false
}