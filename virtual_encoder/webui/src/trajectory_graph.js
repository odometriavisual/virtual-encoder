import * as d3 from "d3";
import { useEffect, useRef } from "preact/hooks";

export function TrajectoryGraph({ status, points, set_points, k, set_k }) {
  const svg_ref = useRef();

  useEffect(() => {
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
        set_k(transform.k);

        path
          .attr("d", build_svg_line(points))
          .attr("stroke-width", 2 / k);

        const cx = window.trajectory_container.clientWidth / 2;
        const cy = window.trajectory_container.clientHeight / 2;
        center_g.attr("transform", transform.translate(cx, cy));
      });

    const cx = window.trajectory_container.clientWidth / 2;
    const cy = window.trajectory_container.clientHeight / 2;

    d3.select(svg_ref.current)
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity.translate(cx, cy).scale(k));

    const on_resize = () => {
      const cx = window.trajectory_container.clientWidth / 2;
      const cy = window.trajectory_container.clientHeight / 2;
      center_g.attr("transform", d3.zoomIdentity.translate(cx, cy).scale(k));
    };

    window.addEventListener("resize", on_resize);

    return () => {
      window.removeEventListener("resize", on_resize);
    };
  }, []);

  useEffect(() => {
    path.attr("d", build_svg_line(points));
  }, [points])

  return (
    <svg width="100%" height="100%" display={status.modo === 'Odometro' ? 'block' : 'none'} ref={svg_ref} />
  );
}
