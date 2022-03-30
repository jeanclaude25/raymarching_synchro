import * as THREE from 'three'
import { config } from './config'
import { events } from './events'
import { mountMaterials, updateAllMaterials } from './materials'


const linePreload = document.querySelector('.loading-bar')

export const objectLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("Object loading finish")
        mountMaterials()

        end_load()
    },
    (e,v,s)=>{
        // const percent = (v/s)*100
        // const uniform_value = 1 - (v/s)
        linePreload.style.transform = `scaleX(${v/s})`
    }
)

export const textureLoadingManager = new THREE.LoadingManager(
    ()=>{
        console.log("All textures loaded")
        updateAllMaterials()
        
        
        end_load()
        
        
        
    },
    (e,v,s)=>{
        // const percent = (v/s)*100
        const uniform_value = 1 - (v/s)
        linePreload.style.transformOrigin= 'top right';
        linePreload.style.transform = `scaleX(${uniform_value})`
    }
)

const end_load = () => {
    window.setTimeout(()=>{
        const preloader = document.querySelector('.preloader')
        linePreload.style.visibility = 'hidden'
        preloader.style.animationPlayState = 'running'
        
        const animation = require('./draw')
        animation.tick()
        if(!window.location.href.includes(config.debug.commandLine)){
        events()
        }},100)
}

