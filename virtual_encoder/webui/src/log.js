export function init_log() {
  window.log_text = document.querySelector('.log > .log-window');
  window.log_clear = document.querySelector('.log > button');
}

let max_d = 0;
export function update_log(status) {
  const sr = status?.pos?.sr || 0;
  const x = status?.pos?.x * sr || 0;
  const y = status?.pos?.y * sr || 0;
  const d = Math.sqrt(x*x + y*y);

  if (d > max_d) {
      max_d = d;
      console.log(d);
  }
  
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
