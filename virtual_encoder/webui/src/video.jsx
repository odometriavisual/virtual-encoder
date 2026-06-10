import * as THREE from "three";

import { useEffect, useRef } from "preact/hooks";

const VIDEO_URL = process.env.NODE_ENV === "production" ? "/video_feed" : "http://localhost:5000/video_feed";

export function Video({status, brightness}) {
  const video_ref = useRef();
  const visualization_ref = useRef();

  useEffect(() => {
    if (status.imu) {
      const [w, x, y, z] = status.imu;

      box_parent.quaternion.set(x, y, z, w);
      box_parent.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    }
  }, [status.imu]);

  useEffect(() => {
    init_imu_canvas(visualization_ref);

    const retry_video = () => video_ref.current.src = VIDEO_URL;
    const retry_video_interval = setInterval(retry_video, 3*1000);

    () => {
      clearInterval(retry_video_interval);
    };
  }, []);

  return (
    <div ref={visualization_ref} class="visualization">
      <img ref={video_ref} style={`filter: brightness(${brightness})`} src="" alt="" class="video-frame" />
      <div class="crosshair hidden vertical"></div>
      <div class="crosshair hidden horizontal"></div>
    </div>
  )
}

function init_imu_canvas(wrapper_ref) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(150, 150);

  wrapper_ref.current.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, renderer.domElement.width / renderer.domElement.height, 0.1, 1000);
  camera.position.set(0, -2, 0);
  camera.lookAt(0, 0, 0);

  let box_parent = new THREE.Group();

  let geometry = new THREE.PlaneGeometry();
  const green = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
  const red = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
  const blue = new THREE.MeshLambertMaterial({ color: 0x0000FF });

  const top_plane = new THREE.Mesh(geometry, green);
  top_plane.rotateX(-Math.PI / 2);
  top_plane.position.y = 0.5;
  box_parent.add(top_plane);

  const bot_plane = new THREE.Mesh(geometry, green);
  bot_plane.rotateX(Math.PI / 2);
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
  left_plane.rotateY(Math.PI / 2);
  left_plane.position.x = 0.5;
  box_parent.add(left_plane);

  const right_plane = new THREE.Mesh(geometry, red);
  right_plane.rotateY(-Math.PI / 2);
  right_plane.position.x = -0.5;
  box_parent.add(right_plane);

  scene.add(box_parent);

  const ambientLight = new THREE.AmbientLight(0xCCCCCC);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}
