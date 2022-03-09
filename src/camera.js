import * as THREE from 'three'
import { config } from './config'
import { scene, sizes } from './scene'


/**
 * Camera
 */
// Base camera
export const camera = new THREE.PerspectiveCamera(48, sizes.width / sizes.height, 0.001, 100)

camera.lookAt(new THREE.Vector3(
    config.camera.lookAt.x, 
    config.camera.lookAt.y, 
    config.camera.lookAt.z
    ));
 scene.add(camera)

 export const cameraUpdate = () => {
    camera.aspect = sizes.width/ sizes.height ;
    camera.position.set(
        config.camera.position.x,
        config.camera.position.y,
        config.camera.position.z
       )
    camera.updateProjectionMatrix();
}
cameraUpdate()


/**FOR DEBUG */
// if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const gui = require('./gui')
    gui.camgui.add(camera, 'fov').min(1).max(180).step(1)
    gui.createPositionGuiDebug(gui.camgui, camera, -150, 150)
    
    // }