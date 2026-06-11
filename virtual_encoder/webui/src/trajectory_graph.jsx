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
  }, [status.x, status.y, status.sr])

  useEffect(() => {
    const svg = d3.select(svg_ref.current);

    const x = d3.scaleLinear();
    const y = d3.scaleLinear();

    const build_svg_line = d3.line()
      .x(ps => x(ps.x))
      .y(ps => y(ps.y));

    const center_g = svg.append("g");

    const path = center_g.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", build_svg_line(points));

    const zoom = d3.zoom()
      .on("zoom", ({ transform }) => {
        path
          .attr("d", build_svg_line(points))
          .attr("stroke-width", 2 / transform.k);

        const cx = parent_ref.current.clientWidth / 2;
        const cy = parent_ref.current.clientHeight / 2;
        center_g.attr("transform", transform.translate(cx, cy));
      });

    const cx = parent_ref.current.clientWidth / 2;
    const cy = parent_ref.current.clientHeight / 2;

    svg.call(zoom)
      .call(zoom.transform, d3.zoomIdentity.translate(cx, cy).scale(0.05));

    const on_resize = () => {
      const cx = parent_ref.current.clientWidth / 2;
      const cy = parent_ref.current.clientHeight / 2;
      center_g.attr("transform", d3.zoomIdentity.translate(cx, cy).scale(k));
    };

    window.addEventListener("resize", on_resize);

    update_path_ref.current = points => {
      path.attr("d", build_svg_line(points));
    };

    return () => {
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
