import * as THREE from 'three'
import { renderer } from './renderer'
import { scene } from './scene'
import { camera } from './camera'
import Stats from 'stats.js'
import { mixer } from './load3dFiles'
import { effectComposer } from './postProcess'



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
    
    
    /**Animation gltf update */
    if(mixer!=null){
    mixer.update(deltaTime)
    }
     // Update controls
     controls.orbitControls.update()
    //  controls.fpsControls.update(deltaTime)
 
     //Update objects?
     //mesh.rotation.y = -0.1*RPS
 
     // Render
    //  renderer.render(scene, camera)

    //postprocessing
    effectComposer.render()
 
     // Call tick again on the next frame
     stats.end()
     requestAnimationFrame(tick)
 }