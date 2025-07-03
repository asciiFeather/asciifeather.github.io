const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x228822 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Car (cube)
const carGeo = new THREE.BoxGeometry(1, 0.5, 2);
const carMat = new THREE.MeshStandardMaterial({ color: 0xff3333 });
const car = new THREE.Mesh(carGeo, carMat);
car.position.y = 0.25;
scene.add(car);

let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Game Loop
function animate() {
  requestAnimationFrame(animate);

  if (keys["ArrowUp"]) car.position.z -= 0.1;
  if (keys["ArrowDown"]) car.position.z += 0.1;
  if (keys["ArrowLeft"]) car.rotation.y += 0.05;
  if (keys["ArrowRight"]) car.rotation.y -= 0.05;

  if (keys["w"]) car.position.x -= Math.sin(car.rotation.y) * 0.1;
  if (keys["s"]) car.position.x += Math.sin(car.rotation.y) * 0.1;
  if (keys["w"]) car.position.z -= Math.cos(car.rotation.y) * 0.1;
  if (keys["s"]) car.position.z += Math.cos(car.rotation.y) * 0.1;

  // Make camera follow car
  camera.position.x = car.position.x + 5 * Math.sin(car.rotation.y);
  camera.position.z = car.position.z + 5 * Math.cos(car.rotation.y);
  camera.position.y = car.position.y + 3;
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}

animate();
