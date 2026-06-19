import "./log.css";

import { useRef } from 'preact/hooks'
import { TrajectoryGraph } from './trajectory_graph';
import { useEncoder } from './encoder_context';

export function Log() {
  const {
    log, set_log,
    status,
  } = useEncoder();

  const trajectory_container_ref = useRef();

  return (
    <div class="log">
      {
        status.modo == "Odometro" ?
          <div class="trajectory-container" ref={trajectory_container_ref}>
            <TrajectoryGraph parent_ref={trajectory_container_ref} />
          </div>
          :
          null
      }
      <div class="log-window" >
        {log.map(line => <div class="log-line" dangerouslySetInnerHTML={{__html: line}}></div>)}
      </div>
      <button onClick={() => set_log([])}> Apagar log </button>
    </div>
  )
}

