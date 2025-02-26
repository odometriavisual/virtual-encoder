window.onload = () => {
    let set_cube_quat = (x, y, z, w) => { };
    let draw_point = (x, y) => { };
    let clear_canvas = () => { };

    async function next_estado(event) {
        event.target.disabled = true;

        const method = 'POST';
        await fetch('/next_estado', { method });
    }

    async function next_estado_args(event, estado, args) {
        event.target.disabled = true;

        const method = 'POST';
        await fetch(`/next_estado/${estado}/${args}`, { method });
    }

    async function next_modo(event, modo) {
        event.target.disabled = true;

        const method = 'POST';
        await fetch(`/next_modo/${modo}`, { method });
    }

    function init() {
        window.btns = {
            calibracao: document.querySelector('button.calibracao'),
            iniciar_aquisicao: document.querySelector('button.iniciar-aquisicao'),
            parar_aquisicao: document.querySelector('button.parar-aquisicao'),
            iniciar_download: document.querySelector('button.iniciar-download'),
            reiniciar: document.querySelector('button.reiniciar'),
            desligar: document.querySelector('button.desligar'),
        };

        for (let [_, btn] of Object.entries(window.btns)) {
            btn.disabled = true;
        }

        window.btns.enviar_expo = document.querySelector('.exposicao > button');
        window.btns.enviar_foco = document.querySelector('.foco > button');

        window.status_watcher = {
            rpi5: document.querySelector('.status.rpi5'),
            rpi0: document.querySelector('.status.rpi0'),
            camera: document.querySelector('.status.camera'),
            imu: document.querySelector('.status.imu'),
        };

        window.exposicao = document.querySelector('.exposicao > input');
        window.foco = document.querySelector('.foco > input');
        window.pulsos_por_segundo = document.querySelector('.pulsos-por-segundo > input');

        window.video_frame = document.querySelector('.video-frame');
        window.video_frame.src = '/video_feed';
        window.video_frame.style = 'filter: brightness(1.0)';

        window.brightness_slider = document.querySelector('.brilho > input');
        window.brightness_slider.value = 1;
        window.brightness_slider.oninput = () => {
            window.video_frame.style.filter = window.video_frame.style.filter.replace(/brightness(.*)/, `brightness(${window.brightness_slider.value})`);
        }

        window.rotation_slider = document.querySelector('.rotacao > input');
        window.rotation_slider.value = 0;
        window.rotation_slider.oninput = () => window.rotation_offset = window.rotation_slider.value;

        window.btns.calibracao.addEventListener('click', next_estado);
        window.btns.iniciar_aquisicao.addEventListener('click', event => {
            clear_canvas()
            const pps = parseInt(window.pulsos_por_segundo.value);
            next_estado_args(event, 'Aquisicao', pps);
        });
        window.btns.parar_aquisicao.addEventListener('click', next_estado);

        window.btns.iniciar_download.addEventListener('click', event => next_modo(event, 'Download'));
        window.btns.reiniciar.addEventListener('click', event => next_modo(event, 'reboot'));
        window.btns.desligar.addEventListener('click', event => next_modo(event, 'poweroff'));

        window.btns.enviar_expo.addEventListener('click', async event => {
            const method = 'POST';
            await fetch(`/set_exposure/${window.exposicao.value}`, { method });
        });

        window.btns.enviar_foco.addEventListener('click', async event => {
            const method = 'POST';
            await fetch(`/set_focus/${window.foco.value}`, { method });
        });
    }

    function update_classname(div, stat) {
        if (stat) div.className = div.className.replace('err', 'ok')
        else div.className = div.className.replace('ok', 'err')
    }

    function update_status(status) {
        update_classname(window.status_watcher.rpi5, status.rpi5);
        if (status.estado === 'Calibrando' || status.modo === 'Download') {
            window.status_watcher.rpi5.classList.add('warn');
        }
        else {
            window.status_watcher.rpi5.classList.remove('warn');
        }

        update_classname(window.status_watcher.rpi0, status.rpi0);
        update_classname(window.status_watcher.camera, status.camera);
        update_classname(window.status_watcher.imu, status.imu);

        window.status_watcher.rpi5.innerText = `RPi 5
			Modo ${status.modo}
			${status.rpi5 === false || status.modo === 'Download'? status.estado:
            (status.estado === 'Calibrando'? `Calibrando ${status.rpi0.progress}%`: 'Estado' + status.estado)
        }
			${status.rpi5 ? `IP: ${status.rpi5.ip}` : ''}
			${status.rpi5? `Temp: ${status.rpi5.temp?.toFixed(2)} ℃`: ''}`

        window.status_watcher.rpi0.innerText = `RPi Zero
			${status.rpi0 ? `Temp: ${status.rpi0.temp?.toFixed(2)} ℃` : ''}`

        const global_disable = status.estado === 'Calibrando'

        if (status.modo === 'Tempo' || status.modo === 'Odometro') {
            window.btns.iniciar_download.disabled = global_disable;

            window.btns.calibracao.disabled = global_disable || status.estado !== 'Set';
            window.btns.iniciar_aquisicao.disabled = global_disable || status.estado !== 'Ready';
            window.btns.parar_aquisicao.disabled = global_disable || !status.estado.startsWith('Aquisicao');
        }
        else if (status.modo === 'Autonomo') {
            window.btns.iniciar_download.disabled = global_disable;

            window.btns.calibracao.disabled = true;
            window.btns.iniciar_aquisicao.disabled = true;
            window.btns.parar_aquisicao.disabled = true;
        }
        else if (status.modo === 'Download') {
            window.btns.iniciar_download.disabled = true;

            window.btns.calibracao.disabled = true;
            window.btns.iniciar_aquisicao.disabled = true;
            window.btns.parar_aquisicao.disabled = true;
        }

        window.btns.reiniciar.disabled = global_disable || status.rpi5 === false;
        window.btns.desligar.disabled = global_disable || status.rpi5 === false;

        if (status.imu) {
            const [w, x, y, z] = status.imu;
            set_cube_quat(x, y, z, w);
        }

        draw_point(status.pos.x, status.pos.y);
    }

    async function fetch_status_stream() {
        const headers = {
            'Accept': 'application/json',
            'Keep-Alive': 'timeout=5, max=-1'
        };
        const method = 'GET';
        const keepalive = true;

        try {
            const res = await fetch('/status', {headers, keepalive, method });
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
        }
        catch (err) {
            update_status({
                rpi5: false, // { temp: 33., ip: '0.0.0.0', },
                rpi0: false, // { temp: 82.3, },
                camera: false,
                imu: false,
                pos: { x: 0., y: 0. },
                modo: 'Desligado',
                estado: '',
            });
        }
    }

    function init_3d_cube() {
        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(150, 150);

        document.querySelector('.visualization').appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, renderer.domElement.width / renderer.domElement.height, 0.1, 1000 );
        camera.position.set(0, -2, 0);
        camera.lookAt(0, 0, 0);

        let box_parent = new THREE.Group();

        let geometry = new THREE.PlaneGeometry();
        const green = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
        const red = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        const blue = new THREE.MeshLambertMaterial({ color: 0x0000FF });

        const top_plane = new THREE.Mesh(geometry, green);
        top_plane.rotateX(-Math.PI/2);
        top_plane.position.y = 0.5;
        box_parent.add(top_plane);

        const bot_plane = new THREE.Mesh(geometry, green);
        bot_plane.rotateX(Math.PI/2);
        bot_plane.position.y = -0.5;
        box_parent.add(bot_plane);

        const front_plane = new THREE.Mesh(geometry, blue);
        front_plane.rotateY(Math.PI);
        front_plane.position.z = -0.5;
        box_parent.add(front_plane);

        const back_plane = new THREE.Mesh(geometry, blue);
        back_plane.position.z = 0.5;
        box_parent.add(back_plane);

        const left_plane = new THREE.Mesh(geometry, red);
        left_plane.rotateY(Math.PI/2);
        left_plane.position.x = 0.5;
        box_parent.add(left_plane);

        const right_plane = new THREE.Mesh(geometry, red);
        right_plane.rotateY(-Math.PI/2);
        right_plane.position.x = -0.5;
        box_parent.add(right_plane);

        scene.add(box_parent);

        const ambientLight = new THREE.AmbientLight(0xCCCCCC);
        scene.add(ambientLight);

        window.rotation_offset = Math.PI / 2;

        set_cube_quat = (x, y, z, w) => {
            box_parent.quaternion.set(x, y, z, w);
            box_parent.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), window.rotation_offset);
        };

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }


    window.update_status = update_status;

    init();
    init_3d_cube();

    fetch_status_stream();
}
