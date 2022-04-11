import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { shadersGui } from '../../gui'
import { config } from '../../config'

export const rayMarchCubeShader = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms:{
        tDiffuse: {value: null},
        cameraPosition:{value: new THREE.Vector3()},
        uCameraAngle:{value: null},
        uTest:{value: 0},
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

if(window.location.href.includes(config.debug.commandLine)){
const props = shadersGui.addFolder('CameraGLSL')
props.add(rayMarchCubeShader.uniforms.uTest ,'value').min(-250).max(250).step(0.001).name('Test')
}