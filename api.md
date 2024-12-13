# RPI0

## Requests

### `GET index.html`
Página de testes.

### `GET imu`
Dados imu no formato: 
```js
"time_now, quat[0], quat[1], quat[2], quat[3]"
```

### `GET file_count`
Quantidade arquivos na pasta picam_imgs. Inteiro.

### `GET poweroff`
Desliga pi_zero. Não retorna.

### `GET reboot`
Reinicia pi_zero. Não retorna.

### `GET focus/VAL`
Seta foco da câmera.

### `GET get_focus`
Retorna foco atual da câmera. Float.

### `GET run_autofocus`
Executa rotina de autofoco e retorna foco escolhido. Float.
Pode demorar, utilizar um tempo limite alto para requisição.

### `GET exposure/VAL`
Seta exposição da câmera.

### `GET stream.mjpeg`
Abre uma stream de vídeo pelo HTTP. Testes no laboratório surgerem que stream UDP é capaz de atingir melhores taxas de quadros e menores latências.

## UDP

### Vídeo
Quando o serviço inicia é criado um stream MJPEG de bitrate 2M enviando para a porta 7100 do host rpi5, configurado no /etc/hosts. 

# RPI5

## Comandos da webui

### `video_feed`
Stream HTTP do vídeo.

### `GET status`
Retorna status do sistema RPi5 + RPi0 + câmera + imu. Formato:
```json
{
    "rpi5": { "temp": 0.0, "ip": "0.0.0.0" },
    "rpi0": { "temp": 0.0 },
    "camera": false,
    "imu": false,
    "pos": { "x": 0, "y": 0 },
    "modo": "Iniciando",
    "estado": ""
}
```

### `POST set_focus` 
Seta foco da câmera.

### `POST next_estado`
Avança para próximo estado no ciclo.

### `POST next_estado ESTADO ARGS`
Avança para próximo estado no ciclo com argumentos.

### `POST next_modo`
Altera para próximo modo configurado.

### `POST next_modo MODO`
Altera para o modo selecionado.
