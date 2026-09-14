import { useEffect, useState } from "preact/hooks";
import { useEncoder } from "./encoder_context";

import * as encoder_api from "./encoder_api.js";

function Rede() {
  const { status } = useEncoder();

  return (
    <section>
      <span> Rede </span>
      <label>
        <span class="tooltip">Endereço de IP estático utilizado quando o encoder é conectado em uma rede local</span>

        <span> IP estático: </span>
        <input class="" type="text" value={status?.rpi5?.ip} disabled />
      </label>

      <label>
        <span class="tooltip">Endereço de IP estático utilizado quando o encoder é conectado diretamente em um PC windows pelo cabo ethernet</span>

        <span> IP estático (ethernet direct): </span>
        <input class="" type="text" value="a definir" disabled />
      </label>
    </section>
  )
}

function Acquisicao({sr}) {
  const [invSpatialRes, setInvSpatialRes] = useState(1);

  useEffect(() => {
    setInvSpatialRes(1 / sr);
  }, []);

  const updateSpatialRes = value => {
    setInvSpatialRes(value);
    encoder_api.calibrate_resolution("displacement", 1/value);
  };

  return (
    <section>
      <span> Sistema de aquisição </span>
      <label>
        <span class="tooltip">Quantidade de pulsos enviada ao sistema de aquisição para cada mm de deslocamento detectado</span>

        <span> Pulsos por mm: </span>
        <input class="" type="number" value={1} />
      </label>
      <label>
        <span class="tooltip">Define o tamanho do pixel em mm. É recomendado utilizar o botão "Calibrar Resolução" na tela inicial para definir essa grandeza</span>

        <span> Resolução espacial (px/mm): </span>
        <input class="" type="number" value={invSpatialRes} onChange={ev => updateSpatialRes(ev.target.value)} />
      </label>
    </section>
  )
}

function Filtros() {
  const { status } = useEncoder();
  const [zonaMorta, setZonaMorta] = useState(0.1);

  const dx = status?.pos?.dx || 0;
  const dy = status?.pos?.dy || 0;
  const d = Math.sqrt(dx * dx + dy * dy);

  const view_width = Math.max(zonaMorta, 1) + 0.1;

  useEffect(() => {
    encoder_api.get_dead_zone().then(val => setZonaMorta(val));
  }, []);

  const updateZonaMorta = value => {
    setZonaMorta(value);
    encoder_api.set_dead_zone(zonaMorta).then(() => { });
  };

  return (
    <section>
      <span> Filtros </span>
      <label>
        <span> Zona morta: </span>
        <span class="tooltip">O encoder irá ignorar deslocamentos menores que o valor escolhido, no diagrama ao lado o raio do círculo é a zona morta e o vetor de deslocamento é desenhado dentro dele</span>
        <input class="" type="range" min="0.01" max="2.3" step="0.01" value={Math.pow(zonaMorta, 1 / 2)} onInput={ev => updateZonaMorta(Math.pow(ev.target.value, 2))} />

        <svg viewBox={`-${view_width} -${view_width} ${2 * view_width} ${2 * view_width}`} xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2={dx} y2={dy} stroke-width="2%" stroke="black" />
          <circle cx="0" cy="0" r={zonaMorta} stroke-width="2%" stroke={d < zonaMorta ? "green" : "red"} fill="none" />
        </svg>
      </label>
    </section>
  )
}


export function ModalConfig() {
  const { set_modal } = useEncoder();

  return (
    <div class="modal-content modal-config">
      <span class="modal-titulo">Configurações</span>
      <span class="modal-close" onClick={() => set_modal(null)}>&times;</span>

      <Filtros />
    </div>
  )
}

