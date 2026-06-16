const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export async function start_acquisition(pulses_per_second, reason) {
  const method = 'POST';
  await fetch(`${URL}/start_acquisition/${pulses_per_second}/${reason}`, { method });
}

export async function stop_acquisition() {
  const method = 'POST';
  await fetch(`${URL}/stop_acquisition`, { method });
}

export async function reset_position() {
  const method = 'POST';
  await fetch(`${URL}/reset_position`, { method });
}

export async function start_stream() {
  const method = 'POST';
  await fetch(`${URL}/start_stream`, { method });
}

export async function stop_stream() {
  const method = 'POST';
  await fetch(`${URL}/stop_stream`, { method });
}

export async function set_modo(modo) {
  const method = 'POST';
  await fetch(`${URL}/set_modo/${modo}`, { method });
}

export async function calibrate_exposure() {
  const method = 'POST';
  await fetch(`${URL}/calibrate_exposure`, { method });
}

export async function calibrate_resolution(modo, param) {
  const method = 'POST';
  await fetch(`${URL}/calibrate_resolution/${modo}/${param}`, { method });
}

export async function set_exposure(value) {
  const method = 'POST';
  await fetch(`${URL}/set_exposure/${window.exposicao.value}`, { method });
}

export async function shutdown(component) {
  const method = 'POST';
  await fetch(`${URL}/shutdown/${component}`, { method });
}

export async function reboot(component) {
  const method = 'POST';
  await fetch(`${URL}/reboot/${component}`, { method });
}

export async function fetch_status_stream(set_status, error_status) {
  let eventSource;

  const open_event_source = () => {
    if (eventSource) {
      eventSource.close();
    }
    eventSource = new EventSource(`${URL}/status`);
    eventSource.onmessage = event => set_status(JSON.parse(event.data));
    eventSource.onerror = async () => {
      set_status(error_status);
      await new Promise(res => setTimeout(res, 3 * 1000));
      open_event_source();
    };
  };

  open_event_source();
}

export async function get_ensaios() {
  const method = 'GET';
  const res = await fetch(`${URL}/ensaios`, { method });
  return res.json();
}

export async function remove_ensaio(name) {
  const method = 'POST';
  await fetch(`${URL}/remove_ensaio/${name}`, { method });
}

export async function restore_ensaio(name) {
  const method = 'POST';
  await fetch(`${URL}/restore_ensaio/${name}`, { method });
}

export async function send_upgrade_zip(file) {
  let body = new FormData()
  body.append("file", file)

  const method = 'POST';
  let res = await fetch(`${URL}/upgrade`, { method, body })
  return await res.text();
}
