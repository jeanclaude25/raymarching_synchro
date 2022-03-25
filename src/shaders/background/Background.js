import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { shadersGui } from '../../gui'
import { config } from '../../config'


export const backgroundShader = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,

    uniforms:{
        uTime: {value: null},
        u_resolution: {value: new THREE.Vector2(1,1)},
        uBackgroundDiffuse: {value: null},
        uBackgroundLayers: {value: null},
        uTreeStrength: {value: 0.0005},
        uWaterStrength: {value: 0}
        // uSpeed : {value: 1.1},
        // uOffset : {value: 0},
        // uFrequency: {value: new THREE.Vector2(20,20)},
        // uStrength: {value: 0.001}
    }
})


/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
const gui = shadersGui.addFolder('Background')

}