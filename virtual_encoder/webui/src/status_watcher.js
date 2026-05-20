function set_ok(div, predicate) {
  if (predicate) div.className = div.className.replace('err', 'ok');
  else div.className = div.className.replace('ok', 'err');
}

function set_warn(div, predicate) {
  if (predicate) div.classList.add('warn');
  else div.classList.remove('warn');
}

export function init_status_watcher() {
  window.status_watcher = {
    rpi5: document.querySelector('.status.rpi5'),
    camera: document.querySelector('.status.camera'),
    imu: document.querySelector('.status.imu'),
  };
}

export function update_status_watcher(status) {
  set_ok(window.status_watcher.rpi5, status.rpi5);
  set_warn(window.status_watcher.rpi5, status.estado === 'Calibrando' || status.modo === 'Download' || status.rpi5.temp > 80.0);

  set_ok(window.status_watcher.camera, status.camera);
  set_ok(window.status_watcher.imu, status.imu);

  if (status.rpi5) {
    const sr = status?.pos?.sr || 0;
    const x = status?.pos?.x * sr || 0;
    const y = status?.pos?.y * sr || 0;
    const d = Math.sqrt(x*x + y*y);

    window.status_watcher.rpi5.innerText = `Módulo Online
          Versão ${status.version}
    			Modo ${status.modo}
    			${status.modo === 'Download' ? status.estado : 'Estado ' + status.estado}
    			${status.modo === 'Odometro' ? 'Pos: (' + x.toFixed(1) + ', ' + y.toFixed(1) + ')': ''}
    			${status.modo === 'Odometro' ? 'Dist: ' + d.toFixed(2): ''}
    			IP: ${status.rpi5.ip}
    			Temp: ${status.rpi5.temp?.toFixed(2)} ℃
    			${status.display ? "" : "Display não encontrado"}`;
  }
  else {
    window.status_watcher.rpi5.innerText = "Módulo Offline";
  }
}
