import * as THREE from 'three'
import smokeVertex from './vertex.glsl'
import smokeFragment from './fragment.glsl'
import { shadersGui } from '../../gui'


export const SmokeShader = new THREE.ShaderMaterial({
    vertexShader: smokeVertex,
    fragmentShader: smokeFragment,
    // wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    // opacity:1,
    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 1.0}
    }
})


const smokeGui = shadersGui.addFolder('Smoke')
