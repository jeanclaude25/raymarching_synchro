import * as THREE from 'three'
import gsap from 'gsap/all'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from "./camera"
import { config } from './config'


const canvas = document.querySelector(config.html.canvasID)

// OrbitControls
export const orbitControls = new OrbitControls(camera, canvas)
const cCam = config.camera
orbitControls.enableDamping = cCam.enableDamping
orbitControls.enablePan = cCam.enablePan
orbitControls.enableZoom = cCam.enableZoom
orbitControls.enableRotate = cCam.enableRotate

orbitControls.target = new THREE.Vector3(
    cCam.lookAt.x, 
    cCam.lookAt.y, 
    cCam.lookAt.z,
    )
export const lookAtZero = () =>{
    gsap.to(
        orbitControls.target,{
            duration:config.camera.tiltBackTime,
            x: cCam.lookAt.x,
            y: cCam.lookAt.y,
            z: cCam.lookAt.z
        }
    )
}

/**Constraints */
if(config.camera.constraint.horizontal){
orbitControls.maxAzimuthAngle = -Math.PI / 2 + config.camera.constraint.horizontalMin
orbitControls.minAzimuthAngle = Math.PI / 2 - config.camera.constraint.horizontalMax
}
if(config.camera.constraint.vertical){
orbitControls.minPolarAngle = Math.PI / 2 - config.camera.constraint.verticalMax
orbitControls.maxPolarAngle = Math.PI / 2 + config.camera.constraint.verticalMin
}

/**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
    import('./gui').then(({camgui})=>{
        const look = camgui.addFolder('lookAt')
        look.add(orbitControls.target, 'x')
        .min(-10).max(10).step(0.001)

        look.add(orbitControls.target, 'y')
        .min(-10).max(10).step(0.001)

        look.add(orbitControls.target, 'z')
        .min(-10).max(10).step(0.001)

    })

}