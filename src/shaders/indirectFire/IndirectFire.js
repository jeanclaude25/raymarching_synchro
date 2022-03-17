import * as THREE from 'three'
import iFireVertex from './vertex.glsl'
import iFireFragment from './fragment.glsl'


export const iFireShader = new THREE.RawShaderMaterial({
    vertexShader: iFireVertex,
    fragmentShader: iFireFragment,
    // wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    // opacity:1,
    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 3.2},
        amplitude: {value: 2.0},
        frequency: {value: 10.0},
        mini: {value: 0},
        maxi: {value: 1.0},
        uColor_1: {value: new THREE.Color('#ae3d00')},
        uColor_2: {value: new THREE.Color('red')},
        uIntensity: {value: 0.16},
        uStrength:{value: 0.005}

    }
})

// const iFGui = shadersGui.addFolder('Indirect Fire')

// iFGui.add(iFireShader.uniforms.uSpeed ,'value')
// .min(0).max(10).step(0.1).name('speed')

// iFGui.add(iFireShader.uniforms.amplitude ,'value')
// .min(0).max(10).step(0.1).name('amplitude')

// iFGui.add(iFireShader.uniforms.frequency ,'value')
// .min(0).max(100).step(0.1).name('frequency')

// iFGui.add(iFireShader.uniforms.mini ,'value')
// .min(0).max(1).step(0.01).name('mini')

// iFGui.add(iFireShader.uniforms.maxi ,'value')
// .min(0).max(1).step(0.01).name('maxi')

// iFGui.add(iFireShader.uniforms.uIntensity ,'value')
// .min(0).max(1).step(0.01).name('Alpha Intensity')

// iFGui.add(iFireShader.uniforms.uStrength ,'value')
// .min(0).max(1).step(0.01).name('strength')