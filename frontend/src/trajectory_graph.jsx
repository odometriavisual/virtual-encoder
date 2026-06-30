import "./trajectory_graph.css"

import * as d3 from "d3";
import { useEffect, useRef } from "preact/hooks";
import { useEncoder } from "./encoder_context";

export function TrajectoryGraph({ parent_ref }) {
  const { status, points, set_points } = useEncoder();
  const svg_ref = useRef();
  const update_path_ref = useRef();

  useEffect(() => {
    set_points(p => {
      const x = status.pos.x * status.pos.sr;
      const y = status.pos.y * status.pos.sr;
      const sr = status.pos.sr;

      return [...p, { x, y, sr }];
    });
  }, [status.pos.x, status.pos.y, status.pos.sr])

  useEffect(() => {
    let w = parent_ref.current.clientWidth;
    let h = parent_ref.current.clientHeight;

    const svg = d3.select(svg_ref.current);

    const x = d3.scaleLinear().domain([-100 * w / h, 100 * w / h]).range([0, w]);
    const y = d3.scaleLinear().domain([-100, 100]).range([0, h]);

    const build_svg_line = d3.line()
      .x(ps => x(ps.x))
      .y(ps => y(ps.y));

    const x_axis = d3.axisBottom(x).ticks(w/120, ".0f").tickSize(h).tickPadding(8 - h);
    const y_axis = d3.axisRight(y).ticks(h/120, ".0f").tickSize(w).tickPadding(8 - w);

    const x_g = svg.append("g").attr("color", "#BBB").call(x_axis);
    const y_g = svg.append("g").attr("color", "#BBB").call(y_axis);

    const center_g = svg.append("g");

    const path = center_g.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", build_svg_line(points));

    const zoom = d3.zoom()
      .on("zoom", ({ transform }) => {
        center_g.attr("transform", transform);
        path.attr("stroke-width", 2 / transform.k);

        x_g.call(x_axis.ticks(w/120).scale(transform.rescaleX(x)));
        y_g.call(y_axis.ticks(h/120).scale(transform.rescaleY(y)));
      });

    svg.call(zoom);

    update_path_ref.current = points => path.attr("d", build_svg_line(points));

    const on_resize = () => {
      w = parent_ref.current.clientWidth;
      h = parent_ref.current.clientHeight;

      x.domain([-100 * w / h, 100 * w / h]).range([0, w]);
      y.domain([-100, 100]).range([0, h]);

      x_axis.ticks(w/120, ".0f").tickSize(h).tickPadding(8 - h);
      y_axis.ticks(h/120, ".0f").tickSize(w).tickPadding(8 - w);

      x_g.call(x_axis);
      y_g.call(y_axis);
    };

    window.addEventListener("resize", on_resize);

    return () => {
      svg_ref.current.innerHTML = "";
      update_path_ref.current = null;
      window.removeEventListener("resize", on_resize);
    };
  }, []);

  useEffect(() => {
    if (update_path_ref.current) {
      update_path_ref.current(points);
    }
  }, [points])

  return (
    <svg width="100%" height="100%" display={status.modo === 'Odometro' ? 'block' : 'none'} ref={svg_ref} />
  );
}
