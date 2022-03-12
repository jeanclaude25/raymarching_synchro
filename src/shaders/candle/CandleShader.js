import candleVertex from './vertex.glsl'
import candleFragment from './fragment.glsl'

export const GammaCorrectionShader = {
    uniforms:{
        'uTime': { value: null},
        'speedFactor': {value: 1}
    },
    vertexShader: candleVertex,
    fragmentShader: candleFragment
}