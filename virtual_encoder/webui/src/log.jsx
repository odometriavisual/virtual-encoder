import { useEffect, useState } from 'preact/hooks'
import { TrajectoryGraph } from './trajectory_graph';

export function Log({ status }) {
  const [log, set_log] = useState([]);

  const [points, set_points] = useState([]);
  const [k, set_k] = useState(0.05);

  useEffect(() => {
    set_points(p => {
      x = status.pos.x * status.pos.sr;
      y = status.pos.y * status.pos.sr;

      return [...p, { x, y, sr }];
    });
  }, [status.x, status.y, status.sr])

  useEffect(() => {
    if (status.msg.length > 0) {
      set_log(val => {
        let new_val = [...val];

        for (const line of status.msg.split("\n")) {
          new_val.append(line);          
        } 

        return new_val;        
      })
    }
  }, [status.msg])

  return (
    <div class="log">
      <div class="trajectory-container">
        <TrajectoryGraph status={status} points={points} set_points={set_points} k={k} set_k={k} />
      </div>
      <div class="log-window">
        {log.map(line => <div class="log-line">{line}</div>)}
      </div>
      <button onClick={() => set_log([])}> Apagar log </button>
      <button onClick={() => set_points([])}> Apagar Trajetória </button>
    </div>
  )
}

