import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'


export const rayMarchCubeShader = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms:{
        tDiffuse: {value: null},
        cameraPosition:{value: new THREE.Vector3()},
        uCameraAngle:{value: null},
        uCameraDistance:{value: null},
        uIOR:{value: 2.46},
        uCamLookAt:{value: new THREE.Vector3()},
        uObjectPosition:{value: new THREE.Vector3()},
        uObjectScale:{value: null},
        uLightPosition:{value: new THREE.Vector3()},
        uResolution:{value: new THREE.Vector2()}
    }
})

export const resizeMarchCube = (elem, renderer) => {
    elem.uniforms.uResolution.value.x = renderer.domElement.width
    elem.uniforms.uResolution.value.y = renderer.domElement.height
}