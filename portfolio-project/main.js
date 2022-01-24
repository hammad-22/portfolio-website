import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setY(360)
camera.position.setX(0)

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-10,-10,-100);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

function addStar () {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500))

  star.position.set(x, y, z);
  scene.add(star)
}

Array(1000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moon.jpg')

// Moon
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture
  })
)

scene.add(moon)

moon.position.z = -20
moon.position.setX(5)
moon.position.setY(2)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += .05
  moon.rotation.y += .075
  moon.rotation.z += .05

  camera.position.z = t * -.05
  // camera.position.x = t * .01
  camera.position.y = t * -.0002
}

document.body.onscroll = moveCamera
moveCamera()

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += .01
  // torus.rotation.y += .005
  // torus.rotation.z += .01

  moon.rotation.x += .005

  //controls.update()

  renderer.render(scene, camera);
}

animate()