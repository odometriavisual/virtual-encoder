function set_ok(div, predicate) {
    if (predicate) div.className = div.className.replace('err', 'ok')
    else div.className = div.className.replace('ok', 'err')
}

function set_warn(div, predicate) {
    if (predicate) div.classList.add('warn')
    else div.classList.remove('warn')
}

export function init_status_watcher() {
    window.status_watcher = {
        rpi5: document.querySelector('.status.rpi5'),
        rpi0: document.querySelector('.status.rpi0'),
        camera: document.querySelector('.status.camera'),
        imu: document.querySelector('.status.imu'),
    }
}

export function update_status_watcher(status) {
    set_ok(window.status_watcher.rpi5, status.rpi5)
    set_warn(window.status_watcher.rpi5, status.estado === 'Calibrando' || status.modo === 'Download' || status.rpi5.temp > 80.0)

    set_ok(window.status_watcher.rpi0, status.rpi0)
    set_warn(window.status_watcher.rpi0, status.rpi0.temp > 80.0)

    set_ok(window.status_watcher.camera, status.camera)
    set_ok(window.status_watcher.imu, status.imu)

    window.status_watcher.rpi5.innerText = `Módulo Online
      Versão ${status.version}
			Modo ${status.modo}
			${status.rpi5 === false || status.modo === 'Download'? status.estado:
        (status.estado === 'Calibrando'? `Calibrando ${status.rpi0.progress}%`: 'Estado' + status.estado)
    }
			${status.rpi5 ? `IP: ${status.rpi5.ip}` : ''}
			${status.rpi5? `Temp: ${status.rpi5.temp?.toFixed(2)} ℃`: ''}`

    window.status_watcher.rpi0.innerText = `RPi Zero
			${status.rpi0 ? `Temp: ${status.rpi0.temp?.toFixed(2)} ℃` : ''}`
}
