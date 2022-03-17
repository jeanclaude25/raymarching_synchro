import * as THREE from 'three'
import { mountMaterials, updateAllMaterials } from './materials'

const loadingbar = document.querySelector('.loading-bar')

export const objectLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("Object loading finish")
        mountMaterials()
        
    },
    (e,v,s)=>{
        // const percent = (v/s)*100
        // const uniform_value = 1 - (v/s)
        loadingbar.style.transform = `scaleX(${v/s})`
    }
)

export const textureLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("All textures loaded")
        updateAllMaterials()
        const preloader = document.querySelector('.preloader')
        

        window.setTimeout(()=>{
            loadingbar.style.visibility = 'hidden'
            preloader.style.animationPlayState = 'running'
            const animation = require('./draw')
            animation.tick()
        },1000)
        
    },
    (e,v,s)=>{
        // const percent = (v/s)*100
        const uniform_value = 1 - (v/s)
        loadingbar.style.transformOrigin= 'top right';
        loadingbar.style.transform = `scaleX(${uniform_value})`
    }
)


