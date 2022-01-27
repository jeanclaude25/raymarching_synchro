import * as THREE from 'three'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { renderer } from './renderer'
import {store_sceneBackground, store_environmentBackground, update_sceneBackground, update_environmentBackground } from './scene'
import { debugObject } from './gui'
import { updateAllMaterials } from './materials'
import { config } from './config'


debugObject.envMapIntensity = config.lights.environmentLight.intensity
debugObject.background = true
debugObject.environment = true

const cubeTextureLoader = new THREE.CubeTextureLoader() //realism
const rgbeLoader = new RGBELoader().setDataType(THREE.UnsignedByteType)
const pmremGenerator = new THREE.PMREMGenerator(renderer)
/**
 * ENVIRONNEMENT MAP //realism
 */
 export const environment_object = {
     hdrOrnot:true,
     envMap:null,
     path:{
    env_hdr:'./textures/hdr/Ridgecrest_Road_Env.hdr',
    env_front:'./textures/environmentMaps/0/px.jpg',
    env_back:'./textures/environmentMaps/0/nx.jpg',
    env_up:'./textures/environmentMaps/0/py.jpg',
    env_down:'./textures/environmentMaps/0/ny.jpg',
    env_left:'./textures/environmentMaps/0/pz.jpg',
    env_right:'./textures/environmentMaps/0/nz.jpg'
     }
}
const clean_obj=()=>{
        environment_object.path.env_hdr = ''
        environment_object.path.env_front = ''
        environment_object.path.env_back = ''
        environment_object.path.env_up = ''
        environment_object.path.env_down = ''
        environment_object.path.env_left = ''
        environment_object.path.env_right = ''
}

const refresh_env_scs = (val) => {
    environment_object.envMap = val
    debugObject.background?update_sceneBackground(val):store_sceneBackground(val)
    debugObject.environment?update_environmentBackground(val):store_environmentBackground(val)
    clean_obj()
}

export const update_environment = () =>{
    let environmentMap;

    if(environment_object.hdrOrnot){
       rgbeLoader
       .load(environment_object.path.env_hdr, (hdrEquiRect, textureData) => {
        environmentMap = pmremGenerator.fromEquirectangular(hdrEquiRect);
               pmremGenerator.compileCubemapShader()
               refresh_env_scs(environmentMap.texture)
               renderer.toneMappingExposure = 1
       })
    }else{
        environmentMap = cubeTextureLoader.load([
        environment_object.path.env_front,
        environment_object.path.env_back,
        environment_object.path.env_up,
        environment_object.path.env_down,
        environment_object.path.env_left,
        environment_object.path.env_right,
    ],(texture)=>{
        texture.encoding = THREE.sRGBEncoding
        texture.intensity=0.1
        refresh_env_scs(texture)
    })
    }
    
}
update_environment()


    const gui = require('./gui')
     /**
     * gui.gui
     */
    
    const envgui = gui.gui.addFolder('EnvironmentLight')
    envgui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001)
    .onChange(updateAllMaterials)

    envgui.add(debugObject, 'background')
    .name('env_visibility')
    .onChange((value)=>
    value?
    update_sceneBackground(environment_object.envMap):
    update_sceneBackground(config.scene.background)
    )
    envgui.add(debugObject, 'environment')
    .name('env_effect')
    .onChange((value)=>
    value?
    update_environmentBackground(environment_object.envMap):
    update_environmentBackground(null)
    )
    
            