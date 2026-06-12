import { useEffect, useRef } from 'preact/hooks'
import { TrajectoryGraph } from './trajectory_graph';
import { useEncoder } from './encoder_context';

export function Log() {
  const {
    log, set_log,
    status,
  } = useEncoder();

  useEffect(() => {
    if (status.msg.length > 0) {
      set_log(val => {
        let new_val = [...val];

        for (const line of status.msg.trim().split("\n")) {
          new_val.push(line);
        }

        return new_val;
      })
    }
  }, [status.msg])

  const trajectory_container_ref = useRef();

  return (
    <div class="log">
      <div class="trajectory-container" ref={trajectory_container_ref}>
        <TrajectoryGraph parent_ref={trajectory_container_ref} />
      </div>
      <div class="log-window">
        {log.map(line => <div class="log-line">{line}</div>)}
      </div>
      <button onClick={() => set_log([])}> Apagar log </button>
    </div>
  )
}

