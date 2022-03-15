import * as THREE from 'three'
import smokeVertex from './vertex.glsl'
import smokeFragment from './fragment.glsl'
import { shadersGui } from '../../gui'


export const SmokeShader = {
    vertexShader: smokeVertex,
    fragmentShader: smokeFragment,
    // wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    blending: THREE.AdditiveBlending,
    // opacity:1,
    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 1.0},
        uResolution:{value: new THREE.Vector2(1.1,1.5)},
        uScale:{value: 5},
        uAlpha:{value:1}
    }
}


const smokeGui = shadersGui.addFolder('Smoke')

smokeGui.add(SmokeShader.uniforms.uAlpha ,'value').min(0).max(1).step(0.01).name('alpha')

smokeGui.add(SmokeShader.uniforms.uSpeed ,'value').min(0).max(10).step(0.1).name('speed')
smokeGui.add(SmokeShader.uniforms.uScale ,'value').min(0).max(10).step(0.1).name('scale')

smokeGui.add(SmokeShader.uniforms.uResolution.value ,'x').min(0).max(10).step(0.01).name('ResolutionX')
smokeGui.add(SmokeShader.uniforms.uResolution.value ,'y').min(0).max(10).step(0.01).name('ResolutionY')