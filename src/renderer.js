import * as THREE from 'three'
import { config } from './config'
import { general_quality } from './quality'
import { sizes } from './scene'



const canvas = document.querySelector(config.html.canvasID)
/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: general_quality.antialias,
    // logarithmicDepthBuffer: true // to avoid z-fighting but decrease performance
})

export const resizeRenderer = (passe) => {
    passe.setSize(sizes.width, sizes.height)
    passe.setPixelRatio(general_quality.pixel_ratio)
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