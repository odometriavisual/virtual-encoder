import * as d3 from "d3";

let points = [
];

const svg = d3.create("svg")
  .attr("width", "100%")
  .attr("height", "100%");

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

export function init_trajectory_graph() {
  window.trajectory_container = document.querySelector(".trajectory-container");

  const zoom = d3.zoom()
    .on("zoom", ({ transform }) => {
      path
        .attr("d", build_svg_line(points))
        .attr("transform", transform)
        .attr("stroke-width", 2 / transform.k);

    const cx = window.trajectory_container.clientWidth / (2 / transform.k);
    const cy = window.trajectory_container.clientHeight / (2 / transform.k);
      center_g.attr("transform", `translate(${cx} ${cy})`)
    });

  const cx = window.trajectory_container.clientWidth / 2;
  const cy = window.trajectory_container.clientHeight / 2;
  center_g.attr("transform", `translate(${cx} ${cy})`)
  svg.call(zoom);

  window.trajectory_container.append(svg.node());
  window.addEventListener("resize", () => {
    const cx = window.trajectory_container.clientWidth / 2;
    const cy = window.trajectory_container.clientHeight / 2;
    center_g.attr("transform", `translate(${cx} ${cy})`)
  });
}

export function update_trajectory_graph(status) {
  window.trajectory_container.style.display = status.modo === 'Odometro' ? 'block' : 'none'
  points.push(status.pos)
  path.attr("d", build_svg_line(points))
}

export function clear_trajectory_graph() {
  points = [];
  path.attr("d", build_svg_line(points))
}
