import * as THREE from 'three';

export function init_imu_canvas() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(150, 150);

  document.querySelector('.visualization').appendChild(renderer.domElement);

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

  window.rotation_offset = Math.PI / 2;

  window.set_cube_quat = (x, y, z, w) => {
    box_parent.quaternion.set(x, y, z, w);
    box_parent.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), window.rotation_offset);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

export function update_imu_canvas(status) {
  if (status.imu) {
    const [w, x, y, z] = status.imu;
    window.set_cube_quat(x, y, z, w);
  }
}
