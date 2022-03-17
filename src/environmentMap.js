import * as THREE from 'three'
import { update_sceneBackground, update_environmentBackground } from './scene'
import { debugObject } from './gui'
import { config } from './config'
import { general_quality } from './quality'

debugObject.envMapIntensity = config.lights.environmentLight.intensity
debugObject.background = true
debugObject.environment = true

const cubeTextureLoader = new THREE.CubeTextureLoader() 

/**
 * ENVIRONNEMENT MAP //realism
 */
const environment_object = {
     hdrOrnot:general_quality.textures.environment.hdr,
     envMap:null,
     path:{
    env_hdr:`./textures/hdr/${general_quality.textures.environment.size}.hdr`,
    env_front:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0001.${general_quality.textures.environment.extension}`,
    env_left:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0002.${general_quality.textures.environment.extension}`,
    env_back:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0003.${general_quality.textures.environment.extension}`,
    env_down:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0004.${general_quality.textures.environment.extension}`,
    env_up:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0005.${general_quality.textures.environment.extension}`,
    env_right:`./textures/environmentMaps/${general_quality.textures.environment.extension}/${general_quality.textures.environment.size}/cube_tile_0006.${general_quality.textures.environment.extension}`
     }
}
cubeTextureLoader.load([
    environment_object.path.env_front,
    environment_object.path.env_back,
    environment_object.path.env_up,
    environment_object.path.env_down,
    environment_object.path.env_left,
    environment_object.path.env_right,
],(texture)=>{
    texture.encoding = THREE.sRGBEncoding
    // texture.intensity = 1.5
    update_environmentBackground(texture)
    update_sceneBackground(texture)
})
            