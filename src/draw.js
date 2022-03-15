import * as THREE from 'three'
import Stats from 'stats.js'
import { mixer } from './load3dFiles'
import { effectComposer  } from './postProcess'
import { renderer } from './renderer'
import { heatScene, scene } from './scene'
import { camera } from './camera'



/**Array of uniforms to animate */
export const uTimeArrays = []

/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
const controls = require('./controls')


/* Adding environnement */




/**
 * Animate
 */
 const clock = new THREE.Clock()
 const insterval = 1/30
 let previousTime = 0
 export const tick = () =>
 {
     stats.begin()
     const elapsedTime = clock.getElapsedTime()
     const deltaTime = elapsedTime - previousTime
     previousTime = elapsedTime
     const RPS = elapsedTime*Math.PI*2 //round per seconds
    
    uTimeArrays.forEach((mat)=>mat.uniforms.uTime.value = elapsedTime )

    /**Animation gltf update */
    if(mixer!==null) mixer.update(deltaTime)
    
     // Update controls
     controls.orbitControls.update()
    //  controls.fpsControls.update(deltaTime)
 

    //postprocessing
    if (effectComposer.passes.length > 1){
        effectComposer.render()
        // renderer.render(heatScene, camera)
    }else{
        renderer.render(scene, camera)
    }
 
     // Call tick again on the next frame
     stats.end()
     requestAnimationFrame(tick)
 }