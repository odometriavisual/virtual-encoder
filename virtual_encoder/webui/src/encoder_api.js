const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

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
  await fetch(`${URL}/start_acquisition/${pulses_per_second}/${reason}`, { method });
}

export async function stop_acquisition(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/stop_acquisition`, { method });
}

export async function reset_position(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/reset_position`, { method });
}

export async function start_stream(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/start_stream`, { method });
}

export async function stop_stream(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/stop_stream`, { method });
}

export async function set_modo(event, modo) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/set_modo/${modo}`, { method });
}

export async function calibrate_exposure(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/calibrate_exposure`, { method });
}

export async function calibrate_resolution(event, modo, param) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/calibrate_resolution/${modo}/${param}`, { method });
}

export async function set_exposure(event, value) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/set_exposure/${window.exposicao.value}`, { method });
}

export async function shutdown(event, component) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/shutdown/${component}`, { method });
}

export async function reboot(event, component) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'POST';
  await fetch(`${URL}/reboot/${component}`, { method });
}

export async function fetch_status_stream(set_status, error_status) {
  let eventSource = new EventSource(`${URL}/status`);
  eventSource.onmessage = event => set_status(JSON.parse(event.data));
  eventSource.onerror = () => set_status(error_status);
}

export async function get_ensaios(event) {
  event.target.disabled = true;
  set_debounce_button(event.target);

  const method = 'GET';
  const res = await fetch(`${URL}/ensaios`, { method });
  return res.json();
}

export async function remove_ensaio(event, name) {
  const method = 'POST';
  await fetch(`${URL}/remove_ensaio/${name}`, { method });
}

export async function restore_ensaio(event, name) {
  const method = 'POST';
  await fetch(`${URL}/restore_ensaio/${name}`, { method });
}

export async function send_upgrade_zip(event, files) {
  let body = new FormData()
  body.append("file", files[0])

  const method = 'POST';
  let res = await fetch(`${URL}/upgrade`, { method, body })
  return await res.text();
}
