import * as THREE from 'three'
import { mountMaterials, updateAllMaterials } from './materials'

const loadingbar = document.querySelector('.loading-bar')

export const objectLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("Object loading finish")
        mountMaterials()
        loadingbar.style.visibility = 'hidden'
    },
    (e,v,s)=>{
        const percent = (v/s)*100
        const uniform_value = 1 - (v/s)
        loadingbar.style.transform = `scaleX(${v/s})`
    }
)

export const textureLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("All textures loaded")
        updateAllMaterials()
        const preloader = document.querySelector('.preloader')
        console.log(preloader.style)
        preloader.style.animationPlayState = 'running'
    },
    (e,v,s)=>{
        const percent = (v/s)*100
        const uniform_value = 1 - (v/s)
    }
)


