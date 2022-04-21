import * as THREE from 'three'
import { scene } from './scene'
import { debugObject } from './gui'
import { general_quality } from './quality'
import { config } from './config'
import { uTimeArrays } from './draw'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import { effectComposer } from './postProcess'
import { renderer } from './renderer'
import { dLightPosition } from './lighting_Lamps'
import { camera } from './camera'


export const rayMarchCube = []

/**Mount Materials */
export const mountMaterials = () => {

    scene.traverse((child)=>{
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
            shaderMount(child)
                
         }
     })
}

const createVideoTexture = (path, fileName, fileExt, material, speed) =>{
    import('./htmlComponents').then(({createHtmlVideo})=>{

    const video = createHtmlVideo(path, fileName, fileExt, speed)
                const texture = new THREE.VideoTexture( video )
                // texture.format = THREE.RGBAFormat; // for video with alpha
                material.map = texture
                material.flatShading = true
                material.transparent = true
                material.blending = THREE.AdditiveBlending
                material.emissiveMap = texture
    })
}

/**Shader mount */
const shaderMount = (child) => {

    if(child.material.userData.shader){
        const data = child.material.userData.shader

        if(data === 'rayMarchCube'){
            import('./shaders/rayMarchCube/Cube').then(({rayMarchCubeShader})=>{

            const cube = new ShaderPass(rayMarchCubeShader)
            cube.uniforms.uResolution.value.x = renderer.domElement.width
            cube.uniforms.uResolution.value.y = renderer.domElement.height
            
            //send obj position to the shader
            cube.uniforms.uObjectPosition.value = child.position
            cube.uniforms.uObjectRotation.value = child.rotation
            cube.uniforms.uLightPosition.value = dLightPosition
            
            //send scale
            cube.uniforms.uObjectScale.value = child.userData.scale

            //send rotation

            effectComposer.addPass(cube)
            rayMarchCube.push(cube)

            })
        }

            
        if(child.material.type === 'ShaderMaterial' || child.material.type === 'RawShaderMaterial') uTimeArrays.push(child.material)
    
    }
}


/**
 * Update all materials
 */
 export const updateAllMaterials = (lightMapIntensity = 10, aoMapIntensity = 1, emissionMapIntensity = 0.2) =>
 {
     scene.traverse((child)=>
     {
         
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
                update_mat(child, lightMapIntensity, aoMapIntensity, emissionMapIntensity)
         }
     })
 }

 const update_mat = (child, lightmapIntensity = 10, aoMapIntensity = 1, emissionMapIntensity = 0.2) => {
    child.material.envMapIntensity = debugObject.envMapIntensity
    child.material.lightMapIntensity = lightmapIntensity
    child.material.aoMapIntensity = aoMapIntensity
    child.material.emissiveIntensity = emissionMapIntensity

    if(child.material.userData.transparent){
        child.material.transparent = true
        child.material.opacity = 0.2
        }
    if(child.material.userData.thickness){
        child.material.thickness = child.material.userData.thickness
        }
    
    child.material.needsUpdate = true
    child.castShadow = general_quality.shadows.enable
    child.receiveShadow = general_quality.shadows.enable
    child.userData.materialSide =='double'?child.material.side = THREE.DoubleSide: child.material.side = THREE.FrontSide
    child.material.needsUpdate = true
 }


 /*************************************************************** */
/**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    import('./gui').then(({gui})=>{
        const materialsGui = gui.addFolder('Materials')
        materialsGui.add(debugObject, 'lightmapIntensity')
        .min(0).max(40).step(0.001).onChange(()=>{
            updateAllMaterials(debugObject.lightmapIntensity, debugObject.aoMapIntensity)
        })
        materialsGui.add(debugObject, 'aoMapIntensity')
        .min(0).max(2).step(0.001).onChange(()=>{
            updateAllMaterials(debugObject.lightmapIntensity, debugObject.aoMapIntensity)
        })
        materialsGui.add(debugObject, 'emissionMapIntensity')
        .min(0).max(2).step(0.001).onChange(()=>{
            updateAllMaterials(debugObject.lightmapIntensity, debugObject.aoMapIntensity, debugObject.emissionMapIntensity)
        })


    })

}