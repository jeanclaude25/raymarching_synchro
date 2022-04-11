import * as THREE from 'three'
import { effectComposer} from './postProcess'
import { renderer } from './renderer'
import { scene } from './scene'
import { camera } from './camera'
import { config } from './config'
import { orbitControls } from './controls'
import { rayMarchCube } from './materials'


/**Array of uniforms to animate */
export const uTimeArrays = []

let stats;
/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    import('stats.js').then(({default: Stats})=>{
        /**STATS */
        stats = new Stats()
        stats.showPanel(0)
        document.body.appendChild(stats.dom)
    })
}


/**
 * Animate
 */
 const clock = new THREE.Clock()
 let previousTime = 0

 export const tick = () =>
 {
     if(stats)stats.begin()
     const elapsedTime = clock.getElapsedTime()
    //  const deltaTime = elapsedTime - previousTime
     previousTime = elapsedTime
    
    uTimeArrays.forEach((mat)=>mat.uniforms.uTime.value = elapsedTime )
 
     
     orbitControls.update() // Update controls

     if(rayMarchCube.length>0){
         const camPos = camera.position 
         const lookAt = orbitControls.target
         let angle;
         
         if(camera.position.x>0){
            angle = camera.position.angleTo(new THREE.Vector3(0.,0.,1.))
            console.log(angle)
        }else{
            angle = camera.position.angleTo(new THREE.Vector3(0.,0.,-1.))-Math.PI/2
            console.log(angle)

         }
         
         const distance = camera.position.length()
        //  console.log(camera.position)

         rayMarchCube.forEach((cube)=>{
            cube.uniforms.cameraPosition.value = camPos//update cam pos
            cube.uniforms.uCamLookAt.value = lookAt//update cam look At
            cube.uniforms.uCameraAngle.value = angle;
            cube.uniforms.uCameraDistance.value = distance;

        })
         
     }

    effectComposer.passes.length > 1 ? effectComposer.render(): renderer.render(scene, camera)
 
     if(stats)stats.end()
     requestAnimationFrame(tick) // Call tick again on the next frame
 }