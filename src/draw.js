import * as THREE from 'three'
import { effectComposer, gammaCorrection  } from './postProcess'
import { heatRenderer, renderer } from './renderer'
import { heatScene, scene } from './scene'
import { camera } from './camera'
import { config } from './config'
// import { orbitControls } from './controls'
import { candleList } from './materials'


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
 let halfTime = false;
 export const tick = () =>
 {
     if(stats)stats.begin()
     halfTime = !halfTime;
     const elapsedTime = clock.getElapsedTime()
    //  const deltaTime = elapsedTime - previousTime
     previousTime = elapsedTime
    
    uTimeArrays.forEach((mat)=>mat.uniforms.uTime.value = elapsedTime )
    if(halfTime){
        candleList.forEach((candle)=>{
            const number = Math.floor( Math.random() * 200)
            number===5?candle.uniforms.uAlpha.value = 0:candle.uniforms.uAlpha.value = 0.9
        })
    }
    
    
     // Update controls
    //  orbitControls.update()
 

    if (effectComposer.passes.length > 1){
        renderer.setRenderTarget(heatRenderer);
        renderer.render(heatScene, camera);

        gammaCorrection.uniforms.tHeatDistortion.value = heatRenderer.texture
        
        renderer.setRenderTarget(null);
        effectComposer.render()


    }else{
        renderer.render(scene, camera)
    }
 
     // Call tick again on the next frame
     if(stats)stats.end()
     requestAnimationFrame(tick)
 }