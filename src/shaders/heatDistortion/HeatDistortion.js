import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { shadersGui } from '../../gui'


export const HeatDistortionShader = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    // blending: THREE.AdditiveBlending,
    // opacity:1,
    uniforms:{
        uTime: {value: null},
        uAlpha : {value: 1.0},
        uSpeed : {value: 1.0},
        uFrequency: {value: new THREE.Vector2(5.4,4.8)}
        
    }
})


const heatGui = shadersGui.addFolder('Heat Distortion')

heatGui.add(HeatDistortionShader.uniforms.uAlpha ,'value').min(0).max(1).step(0.01).name('alpha')
heatGui.add(HeatDistortionShader.uniforms.uSpeed ,'value').min(0).max(10).step(0.1).name('speed')

heatGui.add(HeatDistortionShader.uniforms.uFrequency.value ,'x').min(0).max(10).step(0.1).name('freqX')
heatGui.add(HeatDistortionShader.uniforms.uFrequency.value ,'y').min(0).max(10).step(0.1).name('freqY')
