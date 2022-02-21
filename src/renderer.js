import * as THREE from 'three'
import { config } from './config'
import { sizes } from './scene'



const canvas = document.querySelector(config.html.canvasID)
/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: config.scene.antialias.enable
})

export const resizeRenderer = (passe) => {
    passe.setSize(sizes.width, sizes.height)
    passe.setPixelRatio(config.scene.pixelRatio)
} 
resizeRenderer(renderer)

renderer.physicallyCorrectLights = config.scene.physicallyCorrectLight //realism
renderer.outputEncoding = THREE.sRGBEncoding //realism
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = config.scene.toneExposure

/**
 * Shadows
 */
 if(config.shadows.enable){
    renderer.shadowMap.enabled = config.shadows.enable //realism
    renderer.shadowMap.type = THREE.PCFShadowMap //realism
    }