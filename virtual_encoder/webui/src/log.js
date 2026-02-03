export function init_log() {
  window.log_text = document.querySelector('.log > .log-window');
  window.log_clear = document.querySelector('.log > button');
}

export function update_log(status) {
  if (status.msg.length > 0) {
    let error_line = null;
    for (const line of status.msg.split('\n')) {
      if (line.length > 0) {
        window.log_text.innerHTML += `<div class="log-line">${line}</div>`;
        window.log_text.lastChild.scrollIntoView({ behavior: 'smooth' });

        if (line.indexOf('ERRO:') === 0) {
          error_line = line;
        }
      }
    }

    if (error_line !== null) {
      alert(error_line);
    }
  }
}
