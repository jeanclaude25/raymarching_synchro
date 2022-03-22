import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'


export const videoShader = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    // wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    blending: THREE.AdditiveBlending,
    // opacity:1,
    uniforms:{
        // uVideo:{value: null},
        uAlpha: { value:1 }
    }
})