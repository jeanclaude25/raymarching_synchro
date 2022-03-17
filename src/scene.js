import * as THREE from 'three'

export const sizes = {
    width: null ,
    height: null
}
export const refreshSizes = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
}
refreshSizes()

//store scene_value
const history_size = 2
const scene_val = {
    scene:[],
    environment:[]
}

// Scene
export const scene = new THREE.Scene()
scene.name = 'mainScene'
export const heatScene = new THREE.Scene()
heatScene.background = new THREE.Color('black')
heatScene.name = 'FX_HeatScene'

//update background
export const update_sceneBackground = (value) => {
    store_sceneBackground(value)
    scene.background = value
}

export const update_environmentBackground = (value) => {
    store_environmentBackground(value)
    scene.environment = value
} 

export const store_sceneBackground = (value) => {
    scene_val.scene.push(value)
    scene_val.scene.length > history_size? scene_val.scene.shift():''
}
export const store_environmentBackground = (value) => {
    scene_val.environment.push(value)
    scene_val.environment.length > history_size? scene_val.environment.shift():''
}


export const restore_previousSceneBackground = () => {
    console.log(scene_val.scene)
    scene.background = scene_val.scene[scene_val.scene.length-1]
    scene_val.scene.pop()
}

export const restore_previousEnvironmentBackground = () => {
    console.log(scene_val.environment)
    scene.environment = scene_val.environment[scene_val.environment.length-1]
    scene_val.environment.pop()
}
