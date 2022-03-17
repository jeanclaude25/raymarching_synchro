import * as THREE from 'three'
import waterVertex from './vertex.glsl'
import waterFragment from './fragment.glsl'


export const waterShader = new THREE.ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    // wireframe:true,
    depthTest: true,
    depthWrite: true,
    transparent:true,
    // opacity:1,
    uniforms:{
        uTime: {value: null},
        uSpeed : {value: 1.0},

        uBigWavesElevation : {value: .1},
        uBigWavesFrequency : {value: new THREE.Vector2()},
        uBigWavesSpeed : {value: .5},
        uSmallWavesElevation : {value: .5},
        uSmallWavesFrequency : {value: 1.0},
        uSmallWavesSpeed : {value: .4},
        uSmallIterations : {value: 1.0},

        /**NOT IN GUI YET */
        uDepthColor:{value: new THREE.Color('white')},
        uSurfaceColor:{value: new THREE.Color('blue')},
        uColorOffset:{value: new THREE.Color('red')},
        uColorMultiplier:{value: 10.0}
    }
})


// const waterGui = shadersGui.addFolder('Water')

// waterGui.add(waterShader.uniforms.uSpeed ,'value')
// .min(0).max(10).step(0.1).name('speed')

// waterGui.add(waterShader.uniforms.uBigWavesElevation ,'value')
// .min(0).max(10).step(0.1).name('uBigWavesElevation')

// waterGui.add(waterShader.uniforms.uBigWavesFrequency.value ,'x')
// .min(0).max(10).step(0.1).name('uBigWavesFrequencyX')
// waterGui.add(waterShader.uniforms.uBigWavesFrequency.value ,'y')
// .min(0).max(10).step(0.1).name('uBigWavesFrequencyY')

// waterGui.add(waterShader.uniforms.uBigWavesSpeed ,'value')
// .min(0).max(10).step(0.01).name('uBigWavesSpeed')


// waterGui.add(waterShader.uniforms.uSmallWavesElevation ,'value')
// .min(0).max(10).step(0.1).name('uSmallWavesElevation')

// waterGui.add(waterShader.uniforms.uSmallWavesFrequency ,'value')
// .min(0).max(10).step(0.1).name('uSmallWavesFrequency')

// waterGui.add(waterShader.uniforms.uSmallWavesSpeed ,'value')
// .min(0).max(10).step(0.01).name('uSmallWavesSpeed')

// waterGui.add(waterShader.uniforms.uSmallIterations ,'value')
// .min(0).max(10).step(1).name('uSmallIterations')