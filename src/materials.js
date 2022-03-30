import * as THREE from 'three'
import { heatScene, scene } from './scene'
import { debugObject } from './gui'
import { DoubleSide, FrontSide } from 'three'
import { general_quality } from './quality'
import { load_image } from './textures'
import { config } from './config'
import {candleShader} from './shaders/candle/CandleShader'
// import { iFireShader } from './shaders/indirectFire/IndirectFire'
// import { waterShader } from './shaders/water/Water'
import { SmokeShader } from './shaders/smoke/Smoke'
import { uTimeArrays } from './draw'
import { shadowTreeShader } from './shaders/shadowTrees/ShadowTrees'
import { HeatDistortionShader } from './shaders/heatDistortion/HeatDistortion'
import { FireShader } from './shaders/Fire/Fire'
import { mobileAndTabletCheck } from './detect_mobile'
// import { videoShader } from './shaders/video/video'
import { createHtmlVideo } from './htmlComponents'
import { camera, fitCameraToObject } from './camera'
import { orbitControls } from './controls'
import { backgroundShader } from './shaders/background/Background'
import { candleShader_pc } from './shaders/candle_pc/Candle_pc'
import { mainShader } from './shaders/main/Main'


export const candleList = []
/**Mount Materials */
export const mountMaterials = () => {

    scene.traverse((child)=>{
        // if(child instanceof THREE.Mesh){
        //     console.log(child.userData)
        // }
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
            // texturesMount(child)
            shaderMount(child)
                
         }
     })
     heatScene.traverse((child)=>{
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
            // texturesMount(child)
            shaderMount(child)
                
         }
     })
}

const createVideoTexture = (path, fileName, fileExt, material, speed) =>{
    const video = createHtmlVideo(path, fileName, fileExt, speed)
                const texture = new THREE.VideoTexture( video )
                // texture.format = THREE.RGBAFormat; // for video with alpha
                material.map = texture
                material.flatShading = true
                material.transparent = true
                material.blending = THREE.AdditiveBlending
                material.emissiveMap = texture
}

/**Shader mount */
const shaderMount = (child) => {

    if(child.userData.camera){
        fitCameraToObject(camera, child, 0.3, orbitControls)
    }

    if(child.material.userData.shader){
        const data = child.material.userData.shader

        if(data === 'background'){
            const mat = backgroundShader
            child.material = mat
            load_image('./models/static/textures/back512.jpg')
            .then(response =>{
                response.flipY = false
            child.material.uniforms.uBackgroundDiffuse.value = response
            })
            load_image('./models/static/textures/background_layers_png.png')
            .then(response =>{
                response.flipY = false
            child.material.uniforms.uBackgroundLayers.value = response
            })
            load_image('./models/static/textures/fnoise.png')
            .then(response => {
                response.wrapS = THREE.RepeatWrapping
                response.wrapT = THREE.RepeatWrapping
                child.material.uniforms.uFnoise.value = response 
            })
            load_image('./models/static/textures/cellnoise.png')
            .then(response => {
                response.wrapS = THREE.RepeatWrapping
                response.wrapT = THREE.RepeatWrapping
                child.material.uniforms.uCnoise.value = response 
            })

        }
        if(data === 'candle'){
            if(!mobileAndTabletCheck()){
                child.visible = false
            }else{
                const mat = candleShader.clone()
            mat.uniforms.uOffset.value = Math.random() * 10
            child.material = mat
            candleList.push(child.material)
            }
            
        }

        if(data === 'candle_pc'){
            if(!mobileAndTabletCheck()){
                const mat = candleShader_pc.clone()
                mat.uniforms.uOffset.value = Math.random() * 10
                child.material = mat
                candleList.push(child.material)
            }else{
                child.visible = false
            }
        }
        
        if(data === 'shadowTree'){
            child.material = shadowTreeShader
            child.customDepthMaterial = shadowTreeShader
            load_image('./models/static/textures/other128.png')
            .then(response =>{
                response.flipY = false
            child.material.uniforms.uDiffuse.value = response
            })
        }
        
        if(data === 'fire'){
            if(!mobileAndTabletCheck()){
                const mat = FireShader.clone()
                child.material = mat
                child.material.index0AttributeName = "position"
                child.material.uniforms.uDetail.value = child.userData.fireDetail
                child.material.uniforms.uAmplitude.value = child.userData.fireAmplitude
                child.position.y += 0.1        
            }else{
                //create video html and then catch it
                createVideoTexture("./videoTextures/",'fire', 'ogg', child.material, 1)
                }
            }
        if(data === 'main'){
            const mat = mainShader
            load_image('./models/static/textures/texture.png')
            .then(response =>{
                response.flipY = false
                mat.uniforms.uLight.value = response
            })
            load_image('./models/static/textures/shadow.jpg')
            .then(response =>{
                response.flipY = false
                mat.uniforms.uDark.value = response
            })
            load_image('./models/static/textures/shadow_mask.jpg')
            .then(response =>{
                response.flipY = false
                mat.uniforms.uMask.value = response
            })
            load_image('./models/static/textures/passes/uv.jpg')
            .then(response =>{
                response.flipY = false
                mat.uniforms.uNormal.value = response
            })
            load_image('./models/static/textures/passes/z_denoise.jpg')
            .then(response =>{
                response.flipY = false
                mat.uniforms.uParallax.value = response
            })

            child.material = mat
        }
            
        // if(data === 'indirectFire'){
        //     const mat = iFireShader.clone()
        //     child.material = mat
        //     child.material.index0AttributeName = "position"
        //     child.material.transparent = false
        //     child.material.uniforms.uStrength.value = 0.003;
        //     }
        // if(data === 'indirectFireFloor'){
        //     const mat = iFireShader.clone()
        //     child.material = mat
        //     child.material.index0AttributeName = "position"
        //     child.material.uniforms.uStrength.value = 1;
        // }
        // if(data === 'water')child.material = waterShader
        if(data === 'smoke'){
            if(!mobileAndTabletCheck()){

            const mat = SmokeShader.clone()
            child.material = mat
            child.material.index0AttributeName = "position"
            if(child.userData.smokeIntensity) child.material.uniforms.uIntensity.value = child.userData.smokeIntensity
            if (child.userData.smokeX) child.material.uniforms.uX.value = child.userData.smokeX
            if (child.userData.smokeY) child.material.uniforms.uY.value = child.userData.smokeY
            
            if (child.userData.offset) child.material.uniforms.uOffset.value = child.userData.offset
            }else{
                //create video html and then catch it
                const filename = child.userData.videoSmokeName
                console.log(filename)
                createVideoTexture("./videoTextures/",filename, 'ogg', child.material, 0.5)
                child.rotation.z = Math.PI/2
                child.material.map.flipY = false
                if(child.userData.mobilePosX)child.position.x += child.userData.mobilePosX
                if(child.userData.mobilePosY)child.position.y += child.userData.mobilePosY
                
                }
            }

        if(data === 'heatDistortion'){
            child.material = HeatDistortionShader
            child.material.index0AttributeName = "position"
            heatScene.add(child)
        }
        if(child.material.type === 'ShaderMaterial' || child.material.type === 'RawShaderMaterial') uTimeArrays.push(child.material)
    
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
if(general_quality.id === 'very_low')return // VERY FAST Raw load

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
            // console.log(child.material)
    })
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
    child.userData.materialSide =='double'?child.material.side = DoubleSide: child.material.side = FrontSide
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