import * as THREE from 'three'
import { config } from './config'


const sizes = {
    width: config.html.sizeX,
    height: config.html.sizeY
}
const canvas = document.querySelector(config.html.canvasID)
/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: config.scene.antialias.enable
})
renderer.setSize(sizes.width, sizes.height)
//sur mobile
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//sur pc le mettre à 2
renderer.setPixelRatio(config.scene.pixelRatio) //quality
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