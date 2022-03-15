import * as THREE from 'three'
import { scene } from './scene'
import { debugObject } from './gui'
import { DoubleSide, FrontSide } from 'three'
import { general_quality } from './quality'
import { load_image } from './textures'
import { config } from './config'
import {candleShader} from './shaders/candle/CandleShader'
import { iFireShader } from './shaders/indirectFire/IndirectFire'
import { waterShader } from './shaders/water/Water'
import { SmokeShader } from './shaders/smoke/Smoke'
import { uTimeArrays } from './draw'



/**Mount Materials */
export const mountMaterials = () => {

    scene.traverse((child)=>{
        // if(child instanceof THREE.Mesh){
        //     console.log(child.userData)
        // }
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
            texturesMount(child)
            shaderMount(child)
                
         }
     })
}



/**Shader mount */
const shaderMount = (child) => {
    if(child.material.userData.shader){
        const data = child.material.userData.shader
        if(data == 'candle')child.material = candleShader
        if(data == 'indirectFire'){
        child.material = new THREE.RawShaderMaterial(iFireShader)
        child.material.transparent = false
        }
        if(data == 'indirectFireFloor')child.material = new THREE.RawShaderMaterial(iFireShader)
        if(data == 'water')child.material = waterShader
        if(data == 'smoke')child.material = new THREE.ShaderMaterial(SmokeShader)
    
        uTimeArrays.push(child.material)
    
    }
}

/**Textures mount */
const texturesMount = (child) => {
/**Ambient Occlusion map */
if(child.material.userData.ao && !config.debug.rawLoad && general_quality.textures.ao.allow){
    const path =  `./models/static/textures/${general_quality.textures.ao.size}/${child.material.userData.ao}.${general_quality.textures.ao.extension}`
    // console.log(path)
    load_image(path, child.material.aoMap)
    .then(response =>{
        child.material.aoMap = response
        child.material.aoMap.encoding = THREE.LinearEncoding
        child.material.aoMap.flipY = false
        // child.material.aoMapIntensity = 1
    })
}
/**LIGHTSMAP */
if(child.material.userData.lightsmap && !config.debug.rawLoad && general_quality.textures.lightsMap.allow){
const path = `./models/static/textures/${general_quality.textures.lightsMap.size}/${child.material.userData.lightsmap}.${general_quality.textures.lightsMap.extension}`
load_image(path, child.material.lightMap)
.then(response =>{
    child.material.lightMap = response
    child.material.lightMap.flipY = false
    child.material.lightMapIntensity = 10
    child.material.lightMap.encoding = THREE.LinearEncoding
})
}
if(general_quality.id == 'very_low')return // VERY FAST Raw load

/**DIFFUSE MAP */
if(child.material.userData.diffuse && !config.debug.rawLoad && general_quality.textures.diffuse.allow){
    const ext = child.material.userData.diffuse.includes('_mask')?'png':general_quality.textures.diffuse.extension // overwrite png if the image file is a mask
     const path = `./models/static/textures/${general_quality.textures.diffuse.size}/${child.material.userData.diffuse}.${ext}`
    // console.log(child.material)
    load_image(path, child.material.map)
    .then(response =>{
                        child.material.map = response
                        child.material.map.encoding = THREE.sRGBEncoding
                    })
}

/* NORMAL MAP */
if(child.material.userData.normal && !config.debug.rawLoad && general_quality.textures.normal.allow){
    const path = `./models/static/textures/${general_quality.textures.normal.size}/${child.material.userData.normal}.${general_quality.textures.normal.extension}`
    load_image(path, child.material.normalMap)
    .then(response =>{
        child.material.normalMap = response
        child.material.normalMap.encoding = THREE.LinearEncoding
    })
}

/** Roughness / METALNESS * */
if(child.material.userData.gloss && !config.debug.rawLoad && general_quality.textures.gloss.allow){
    const path =  `./models/static/textures/${general_quality.textures.gloss.size}/${child.material.userData.gloss}.${general_quality.textures.gloss.extension}`
    load_image(path,child.material.roughnessMap)
    .then(response =>{
            child.material.roughnessMap = response
            child.material.roughnessMap.encoding = THREE.LinearEncoding
            child.material.metalnessMap = response
            child.material.metalnessMap.encoding = THREE.LinearEncoding
    })
}

/** Diplacement Texture */
if(child.material.userData.disp && !config.debug.rawLoad && general_quality.textures.disp.allow){
    const path =  `./models/static/textures/${general_quality.textures.disp.size}/${child.material.userData.disp}.${general_quality.textures.disp.extension}`
    load_image(path,child.material.roughnessMap) //disp is null at start so it take uv transform from roughness
    .then(response =>{
            child.material.displacementMap = response
            child.material.displacementMap.encoding = THREE.LinearEncoding
            child.material.displacementScale = child.material.userData.dispScale
            child.material.displacementBias = child.material.userData.dispBias

    })
}
}
/**
 * Update all materials
 */
 export const updateAllMaterials = () =>
 {
     scene.traverse((child)=>
     {
         
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
                update_mat(child)
         }
     })
 }

 const update_mat = (child) => {
    child.material.envMapIntensity = debugObject.envMapIntensity
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
    child.userData.materialSide =='double'?child.material.side = DoubleSide: child.material.side = FrontSide
    child.material.needsUpdate = true
 }