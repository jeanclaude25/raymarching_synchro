import * as THREE from 'three'
import { effectComposer, gammaCorrection  } from './postProcess'
import { heatRenderer, renderer } from './renderer'
import { heatScene, scene } from './scene'
import { camera } from './camera'
import { config } from './config'
import { orbitControls } from './controls'


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

    
     // Update controls
     orbitControls.update()
 

    //postprocessing
    if (effectComposer.passes.length > 1){
        renderer.setRenderTarget(heatRenderer);
        renderer.render(heatScene, camera);

        gammaCorrection.uniforms.tHeatDistortion.value = heatRenderer.texture
        
        // renderer.setRenderTarget(null);
        effectComposer.render()

    }else{
        renderer.render(scene, camera)
    }
 
     // Call tick again on the next frame
     if(stats)stats.end()
     requestAnimationFrame(tick)
 }