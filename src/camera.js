import * as THREE from 'three'
import { config } from './config'
import { scene } from './scene'
const gui = require('./gui')
const sizes = {
    width: config.html.sizeX,
    height: config.html.sizeY
}

/**
 * Camera
 */
// Base camera
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = config.camera.position.x
camera.position.y = config.camera.position.y
camera.position.z = config.camera.position.z
camera.lookAt(new THREE.Vector3(
    config.camera.lookAt.x, 
    config.camera.lookAt.y, 
    config.camera.lookAt.z
    ));
 scene.add(camera)

/**
 * gui.gui
 */
export const camgui = gui.gui.addFolder('Camera')
const pos = camgui.addFolder('position')
pos.add(camera.position, 'x')
.min(-30)
.max(30)
.step(0.001)
pos.add(camera.position, 'y')
.min(-30)
.max(30)
.step(0.001)
pos.add(camera.position, 'z')
.min(-30)
.max(30)
.step(0.001)