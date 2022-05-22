// import './style.css'
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js"
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene()

// (args) FOV, aspect ratio, how near and long can you see relative to the camera.
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,
  0.1, 1000)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  })

  renderer.setPixelRatio( window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.setZ(30);
  camera.position.setX(-3)

  renderer.render( scene, camera)

  const geometry = new THREE.TorusGeometry(10,3,16,100)
  const material = new THREE.MeshStandardMaterial( { color: 0xFF6347})
  const torus = new THREE.Mesh( geometry, material)

  scene.add(torus)

  //lightning 
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5,5,5)

  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)


  //avatar
  const weertiTexture= new THREE.TextureLoader().load('w2.jpg')

  const weerti = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map : weertiTexture})

  )
    scene.add(weerti)

    // moon
  const moonTexture = new THREE.TextureLoader().load('moon.jpg')
  const normalTexture = new THREE.TextureLoader().load('normal.jpg')
  const moon = new THREE.Mesh( 
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map : moonTexture, normalMap: normalTexture})

  )
  scene.add(moon)
  moon.position.z = 30
  moon.position.setX(-10)

  weerti.position.z = -5
  weerti.position.x =2

  //controls for moving 
  const controls = new OrbitControls(camera, renderer.domElement)
 // function for creating starts 
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
  }

  //draws 200 randomly positioned stars
  Array(200).fill().forEach(addStar)


  // background
  const spaceTexture = new THREE.TextureLoader().load('space4.jpg')
  scene.background = spaceTexture


  // function used to move the camera 
  function moveCamera(){

      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += 0.05;
      moon.rotation.y += 0.075;
      moon.rotation.z += 0.05;

      weerti.rotation.y += 0.01
      weerti.rotation.z += 0.01

      camera.position.z = t * -0.01
      camera.position.x = t * -0.0002
      camera.rotation.y = t * -0.0002
  }

  document.body.onscroll = moveCamera
  moveCamera()

  // animation function so things moves
  function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    moon.rotation.x += 0.005
    
    // controls.update()

    renderer.render(scene, camera)
  }

  animate()
