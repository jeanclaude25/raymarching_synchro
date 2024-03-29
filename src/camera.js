import gsap from 'gsap/all'
import * as THREE from 'three'
import { config } from './config'
// import { lookAtZero } from './controls'
import { mobileAndTabletCheck } from './detect_mobile'
import { pointerConvert } from './raytracing'
import { scene, sizes } from './scene'



/**
 * Camera
 */
// Base camera
export const camera = new THREE.PerspectiveCamera(config.camera.fov.pc, sizes.width / sizes.height, 0.001, 100)

if(mobileAndTabletCheck()) camera.fov = config.camera.fov.mobile
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
    import('./controls').then(({lookAtZero})=>{
        lookAtZero()
    })
    // lookAtZero()
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
console.log(camera)



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

export const fitCameraToObject = ( camera, object, offset, controls ) => {

     offset = offset || 1.25
     const boundingBox = new THREE.Box3()
     // get bounding box of object - this will be used to setup controls and camera
     boundingBox.setFromObject( object )
     const center = new THREE.Vector3()
     boundingBox.getCenter(center)
     const size = new THREE.Vector3()
     boundingBox.getSize(size)
 
     // get the max side of the bounding box (fits to width OR height as needed )
     const maxDim = Math.max( size.x, size.y, size.z )
     const fov = camera.fov * ( Math.PI / 180 )
     let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) )
     cameraZ *= offset; // zoom out a little so that objects don't fill the screen
     camera.position.z = cameraZ
     const minZ = boundingBox.min.z
     const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;
 
     camera.far = cameraToFarEdge * 3;
     camera.updateProjectionMatrix();
 
     if ( controls ) {
       // set camera to rotate around center of loaded object
       controls.target = center;
       // prevent camera from zooming out far enough to create far plane cutoff
       controls.maxDistance = cameraToFarEdge * 2;
       controls.saveState();
     } else {
         camera.lookAt( center )
    }
}

///
/// Get ThreeJS Camera Angle
///
export const getCameraAngle = (type) =>
{
    const targetDirection = new THREE.Vector3()
    const cameraVector = camera.getWorldDirection(targetDirection)
    const angle = Math.atan2(cameraVector.x, cameraVector.z)
    if (type ==='deg'){
    return radiansToDegrees(angle);
    }else{
        return angle;
    }
}

///
/// Convert Radians to Degrees
///
const radiansToDegrees = (radians) =>
{
    return radians * 180 / Math.PI;
}


/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    import('./gui').then(({camgui, createPositionGuiDebug})=>{
        camgui.add(camera, 'fov').min(1).max(180).step(1).onChange(()=> camera.updateProjectionMatrix() )
        createPositionGuiDebug(camgui, camera, -150, 150)
    })
    
    }