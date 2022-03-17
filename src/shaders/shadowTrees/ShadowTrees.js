import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'



export const shadowTreeShader = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,

    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 1.7},
        uFrequency: {value: new THREE.Vector2(0.9, 1.0)}
    }  
})

// const shadowGui = shadersGui.addFolder('shadow Tree')

// shadowGui.add(shadowTreeShader.uniforms.uSpeed ,'value')
// .min(0).max(10).step(0.1).name('speed')

// shadowGui.add(shadowTreeShader.uniforms.uFrequency.value ,'x')
// .min(0).max(100).step(0.1).name('FrequencyX')
// shadowGui.add(shadowTreeShader.uniforms.uFrequency.value ,'y')
// .min(0).max(100).step(0.1).name('FrequencyY')