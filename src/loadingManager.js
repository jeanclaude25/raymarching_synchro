import * as THREE from 'three'
import { mountMaterials, updateAllMaterials } from './materials'

export const objectLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("Object loading finish")
        mountMaterials()
    },
    ()=>{
        console.log("progress Objects")
    }
)

export const textureLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("All textures loaded")
        updateAllMaterials()

    },
    ()=>{
        console.log("progress Textures")
    }
)


