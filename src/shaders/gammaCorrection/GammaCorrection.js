import gammaVertex from './vertex.glsl'
import gammaFragment from './fragment.glsl'

export const GammaCorrectionShader = {
    uniforms:{
        'tDiffuse': { value: null}
    },
    vertexShader: gammaVertex,
    fragmentShader: gammaFragment
}