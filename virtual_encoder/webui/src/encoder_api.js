export function set_debounce_button(btn) {
  btn.debounce_enabled = true;

  if (btn.debounce_id !== null) {
    clearTimeout(btn.debounce_id);
  }

  btn.debounce_id = setTimeout(() => {
    btn.debounce_enabled = false;
    btn.debounce_id = null;
    btn.disabled = false;
  }, 1000);
}

export async function start_acquisition(event, pulses_per_second, reason) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/start_acquisition/${pulses_per_second}/${reason}`, { method });
}

export async function stop_acquisition(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch('/stop_acquisition', { method });
}

export async function start_stream(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch('/start_stream', { method });
}

export async function stop_stream(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch('/stop_stream', { method });
}

export async function set_modo(event, modo) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/set_modo/${modo}`, { method });
}

export async function calibrate_exposure(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch('/calibrate_exposure', { method });
}

export async function set_exposure(event, value) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/set_exposure/${window.exposicao.value}`, { method });
}

export async function shutdown(event, component) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/shutdown/${component}`, { method });
}

export async function reboot(event, component) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/reboot/${component}`, { method });
}

export async function fetch_status_stream(update_status) {
  const headers = {
    'Accept': 'application/json',
  };
  const method = 'GET';
  const keepalive = true;


  const offline_status = {
    version: "",
    rpi5: false, // { temp: 33., ip: '0.0.0.0', },
    display: false,
    camera: false,
    imu: false,
    pos: { x: 0., y: 0. },
    modo: 'Desligado',
    estado: '',
    msg: '',
  };

  while (true) {
    try {
      const res = await fetch('/status', { headers, keepalive, method });

      if (res.status !== 200) {
        update_status(offline_status);
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      const decoder = new TextDecoder();
      let result = '';

      for await (const chunk of res.body) {
        result += decoder.decode(chunk, { stream: true });
        const lines = result.split('\n');
        result = lines.pop() || '';

        for (const line of lines) {
          update_status(JSON.parse(line));
        }
      }
    } catch (err) {
      update_status(offline_status);

      await new Promise(resolve => setTimeout(resolve, 5000));
      window.video_frame.src = '/video_feed'
    }
  }
}


export async function get_ensaios(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'GET';
  const res = await fetch('/ensaios', { method });
  return res.json();
}

export async function remove_ensaios(event, name) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`/ensaios/${name}`, { method });
}

export async function send_upgrade_zip(event, files) {
  let body = new FormData()
  body.append("file", files[0])

  const method = 'POST';
  await fetch("/upgrade", { method, body })
}
