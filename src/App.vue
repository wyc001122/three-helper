<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ThreeHelper from "@/core/ThreeHelper"
import { TextureHelper } from "three/examples/jsm/helpers/TextureHelper.js"

const container = ref<HTMLDivElement>()
let scene: THREE.Scene
let scene2: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls


let cube: THREE.Mesh
let cube2: THREE.Mesh
let cube3: THREE.Mesh
let cube4: THREE.Mesh
const clock = new THREE.Clock()
onMounted(async () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value!.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = true

  const group = new THREE.Group()
  scene.add(group)

  const geometry = new THREE.SphereGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  cube.position.set(1, 0, 0)
  group.add(cube)

  const geometry2 = new THREE.BoxGeometry()
  const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
  cube2 = new THREE.Mesh(geometry2, material2)
  cube2.position.set(0, 1, 0)
  group.add(cube2)

  const geometry3 = new THREE.ConeGeometry()
  const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  cube3 = new THREE.Mesh(geometry3, material3)
  cube3.position.set(0, 0, 1)
  group.add(cube3)



  const _texture =await new THREE.TextureLoader().loadAsync(new URL('./assets/environment-map.jpg', import.meta.url).href)
  _texture.colorSpace = THREE.SRGBColorSpace
  _texture.flipY = true
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileCubemapShader();
  const envMap = pmremGenerator.fromEquirectangular(_texture).texture
  pmremGenerator.dispose()
  envMap.type = THREE.UnsignedByteType

  // 定义材质 
  const material4 = new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0.29,
    color: new THREE.Color("#c1c1c1"),
    emissive: new THREE.Color("#faa238"),
    emissiveIntensity: 0,
    transparent: true
  })
  material4.envMap = envMap

  const texture = new THREE.TextureLoader().load('night.webp')
  texture.colorSpace = THREE.SRGBColorSpace
  cube4 = new THREE.Mesh(new THREE.BoxGeometry(), material4)
  cube4.name = 'cube4'
  cube4.position.set(-1, 0, 0)
  group.add(cube4)
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())
  group.add(cube4.clone())

  const textureHelper = new TextureHelper(texture)
  textureHelper.name = 'textureHelper'
  textureHelper.position.set(2, 0, 0)
  scene.add(textureHelper) 


  animate()

  ThreeHelper()
})

function animate() {
  const time = clock.getElapsedTime()
  renderer.render(scene, camera)
  controls.update()

  //cube1 2 3 随机 旋转 移动 缩放
  cube.position.y = Math.sin(10 + time)
  cube2.position.y = Math.cos(20 + time)
  cube3.position.y = Math.sin(30 + time)
  cube4.position.y = Math.cos(40 + time)
  // 旋转
  cube.rotation.x = time
  cube2.rotation.x = time
  cube3.rotation.x = time
  cube4.rotation.x = time

  requestAnimationFrame(animate)

}
</script>

<template>
  <div class="three-test" ref="container">
  </div>
</template>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

.three-test {
  width: 100%;
  height: 100%;
}
</style>