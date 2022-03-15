import * as THREE from 'three'
import candleVertex from './vertex.glsl'
import candleFragment from './fragment.glsl'
import { shadersGui } from '../../gui'


export const candleShader = new THREE.RawShaderMaterial({
    vertexShader: candleVertex,
    fragmentShader: candleFragment,
    // wireframe:true,
    depthTest: !true,
    depthWrite: !true,
    transparent:true,
    blending: THREE.AdditiveBlending,
    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 1.0},
        uFrequency: {value: new THREE.Vector2(20,20)}
    }  
})

const candleGui = shadersGui.addFolder('Candles')

candleGui.add(candleShader.uniforms.uSpeed ,'value')
.min(0).max(10).step(0.1).name('speed')

candleGui.add(candleShader.uniforms.uFrequency.value ,'x')
.min(0).max(100).step(0.1).name('FrequencyX')
candleGui.add(candleShader.uniforms.uFrequency.value ,'y')
.min(0).max(100).step(0.1).name('FrequencyY')