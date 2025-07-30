export async function next_estado(event) {
    event.target.disabled = true;
    set_debounce_button(event.target);

    const method = 'POST';
    await fetch('/next_estado', { method });
}

export async function next_estado_args(event, estado, pps, reason) {
    event.target.disabled = true;
    set_debounce_button(event.target);

    const method = 'POST';
    await fetch(`/next_estado/${estado}/${pps}/${reason}`, { method });
}

export async function next_modo(event, modo) {
    event.target.disabled = true;
    set_debounce_button(event.target);

    const method = 'POST';
    await fetch(`/next_modo/${modo}`, { method });
}

export async function fetch_status_stream(update_status) {
    const headers = {
        'Accept': 'application/json',
        'Keep-Alive': 'timeout=5, max=-1'
    };
    const method = 'GET';
    const keepalive = true;

    while (true) {
        try {
            const res = await fetch('/status', {headers, keepalive, method});
            const decoder = new TextDecoder();
            let result = '';

            for await (const chunk of res.body) {
                result += decoder.decode(chunk, {stream: true});
                const lines = result.split('\n');
                result = lines.pop() || '';

                for (const line of lines) {
                    update_status(JSON.parse(line));
                }
            }
        } catch (err) {
            update_status({
                rpi5: false, // { temp: 33., ip: '0.0.0.0', },
                rpi0: false, // { temp: 82.3, },
                camera: false,
                imu: false,
                pos: {x: 0., y: 0.},
                modo: 'Desligado',
                estado: '',
                msg: '',
            });

            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

