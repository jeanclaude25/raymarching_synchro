import * as THREE from 'three'
import { scene } from './scene'
import { debugObject } from './gui'
import { DoubleSide, FrontSide, MathUtils } from 'three'
import { general_quality, texturesSizeArray } from './quality'
import { load_image } from './textures'
import { config } from './config'


const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

/**
 * Update all materials
 */
 export const updateAllMaterials = () =>
 {
     scene.traverse((child)=>
     {
         
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {

            
                if(child.material.userData.diffuse && !config.debug.rawLoad){
                    const ext = child.material.userData.diffuse.includes('_mask')?'png':general_quality.textures_ext.diffuse
                     const path = `./models/static/textures/${texturesSizeArray[general_quality.textures_size]}/${child.material.userData.diffuse}.${ext}`
                    // console.log(child.material)
                    load_image(path, child.material.map)
                    .then(response =>{
                                        child.material.map = response
                                        child.material.map.encoding = THREE.sRGBEncoding
                                    })
                }
                if(child.material.userData.normal && !config.debug.rawLoad){
                    const path = `./models/static/textures/${texturesSizeArray[general_quality.textures_size]}/${child.material.userData.normal}.${general_quality.textures_ext.normal}`
                    load_image(path, child.material.normalMap)
                    .then(response =>{
                        child.material.normalMap = response
                    })
                }
                if(child.material.userData.gloss && !config.debug.rawLoad){
                    const path =  `./models/static/textures/${texturesSizeArray[general_quality.textures_size]}/${child.material.userData.gloss}.${general_quality.textures_ext.gloss}`
                    load_image(path,child.material.roughnessMap)
                    .then(response =>{
                        child.material.roughnessMap = response
                        child.material.metalnessMap = response
                    })
                }
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
    
    child.material.needsUpdate = true
    child.castShadow = general_quality.shadows.enable
    child.receiveShadow = general_quality.shadows.enable
    child.userData.materialSide =='double'?child.material.side = DoubleSide: child.material.side = FrontSide
    child.material.needsUpdate = true
 }