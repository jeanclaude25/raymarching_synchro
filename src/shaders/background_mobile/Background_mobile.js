import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { shadersGui } from '../../gui'
import { config } from '../../config'


export const backgroundMobileShader = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,

    uniforms:{
        uTime: {value: null},
        uBackgroundDiffuse: {value: null},
        uBackgroundLayers: {value: null}
        // uSpeed : {value: 1.1},
        // uOffset : {value: 0},
        // uFrequency: {value: new THREE.Vector2(20,20)},
        // uStrength: {value: 0.001}
    }
})


/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
const gui = shadersGui.addFolder('BackgroundMobile')

}