import * as THREE from 'three'
import { config } from './config'
import { general_quality } from './quality'
import { sizes } from './scene'



export const canvas = document.querySelector(config.html.canvasID)
/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: general_quality.antialias,
    // logarithmicDepthBuffer: true // to avoid z-fighting but decrease performance
})

export const resizeRenderer = (passe,pr = true) => {
    passe.setSize(sizes.width, sizes.height)
    if(pr) passe.setPixelRatio(general_quality.pixel_ratio)
} 
resizeRenderer(renderer)

renderer.physicallyCorrectLights = config.scene.physicallyCorrectLight //realism
// renderer.outputEncoding = THREE.sRGBEncoding //realism
/**if postprocess */
renderer.outputEncoding = THREE.LinearEncoding

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = config.scene.toneExposure


/**
 * Shadows
 */
 if(general_quality.shadows.enable){
    renderer.shadowMap.enabled = general_quality.shadows.enable //realism
    renderer.shadowMap.type =  general_quality.shadows.type//realism
    }


/**Heat Renderer */
const rtWidth = sizes.width;
const rtHeight = sizes.height;
export const heatRenderer = new THREE.WebGLRenderTarget(rtWidth, rtHeight,{
    minFilter: THREE.LinearFilter, 
    magFilter: THREE.NearestFilter,
    depthBuffer: false,
    stencilBuffer: false
})
resizeRenderer(heatRenderer, false)
