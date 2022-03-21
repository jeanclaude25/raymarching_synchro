import gsap from 'gsap/all'
import * as THREE from 'three'
import { config } from './config'
import { pointerConvert } from './raytracing'
import { scene, sizes } from './scene'



/**
 * Camera
 */
// Base camera
export const camera = new THREE.PerspectiveCamera(48, sizes.width / sizes.height, 0.001, 100)
const pCam = config.camera.position
camera.position.set(pCam.x, pCam.y, pCam.z)

export const cameraZero = () => {
    gsap.to(
        camera.position,{
            duration:config.camera.tiltBackTime,
            x: pCam.x,
            y: pCam.y,
            z: pCam.z
        }
    )
}

camera.lookAt(new THREE.Vector3(
    config.camera.lookAt.x, 
    config.camera.lookAt.y, 
    config.camera.lookAt.z
    ));
 scene.add(camera)

 export const cameraUpdate = () => {
    camera.aspect = sizes.width/ sizes.height
    camera.updateProjectionMatrix()
}
cameraUpdate()



export const cameraTilt = (e, canvas) => {
    if(config.camera.mouseTilt){

        gsap.to(
            camera.position,{
                duration:config.camera.tiltTime,
                x:config.camera.position.x +
                (pointerConvert(e,canvas).x *
                config.camera.tiltSensibility),
                y:config.camera.position.y +
                (pointerConvert(e,canvas).y *
                config.camera.tiltSensibility)
            }
        )
    }
 }

 export const mobileCameraTilt = (e) => {
        gsap.to(
            camera.position,{
                duration:config.camera.tiltTime,
                x:config.camera.position.x +
                e.x *
                config.camera.tiltSensibility,
                y:config.camera.position.y +
                e.y *
                config.camera.tiltSensibility
                            }
                )
                                        }


/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    import('./gui').then(({camgui, createPositionGuiDebug})=>{
    camgui.add(camera, 'fov').min(1).max(180).step(1)
    createPositionGuiDebug(camgui, camera, -150, 150)
    })
    
    }