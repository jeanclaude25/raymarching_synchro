import * as THREE from 'three'
import { config } from './config'
import { updateAllMaterials } from './materials' //to require when debug
import { general_quality } from './quality'
import { renderer } from './renderer'

const debugObject = {
    ambientLight: null,
    directionnalLight: null
}

const colors = {
            ambient: new THREE.Color('white'),
            key: new THREE.Color('white')
                }

export const lighting = []


/**
 * Lights
 */
 //AMBIENT
 if(config.lights.ambientLight.enable && general_quality.ambientLight){
     const ambientLight = new THREE.AmbientLight(0xffffff, config.lights.ambientLight.intensity)
     lighting.push(ambientLight)
     debugObject.ambientLight = ambientLight
     }

    //DIRECTIONNAL FillLights
    if(config.lights.keyLight.enable && general_quality.keylight){
    const directionnalLight = new THREE.DirectionalLight(0xffffff, config.lights.keyLight.intensity)
    directionnalLight.position.x = config.lights.keyLight.position.x
    directionnalLight.position.y = config.lights.keyLight.position.y
    directionnalLight.position.z = config.lights.keyLight.position.z
    directionnalLight.shadow.normalBias = config.shadows.normalBias
    
    lighting.push(directionnalLight)
    debugObject.directionnalLight = directionnalLight
    
    
    
      /**
     * Shadows helpers
     */
     if(general_quality.shadows.enable){
                        directionnalLight.castShadow = general_quality.shadows.enable 
                        directionnalLight.shadow.camera.far = config.shadows.scale.far
                        directionnalLight.shadow.camera.near = config.shadows.scale.near
                        directionnalLight.shadow.camera.top = config.shadows.scale.top
                        directionnalLight.shadow.camera.bottom = config.shadows.scale.bottom
                        directionnalLight.shadow.camera.left = config.shadows.scale.left
                        directionnalLight.shadow.camera.right = config.shadows.scale.right

                        directionnalLight.shadow.mapSize.set(general_quality.shadows.mapSize, general_quality.shadows.mapSize)
        }
     }

/**
 * DEBUG 
 */
/******************************************************** */
let lightingGui;
let debug = false;
if(window.location.href.includes(config.debug.commandLine)){
    import('./gui').then(({gui})=>{
        lightingGui = gui.addFolder('Lamps')
        debugF()
    })
}

const debugF = () =>{

        /**
     * gui
     */
    if(config.lights.ambientLight.enable && general_quality.ambientLight){
        const ambientGui = lightingGui.addFolder('AmbientLight')
        ambientGui.add(debugObject.ambientLight, 'intensity')
        .min(0).max(5).step(0.001).name('intensity')
        ambientGui.addColor(colors, 'ambient').name('color')
        .onChange(()=>{
            debugObject.ambientLight.color.r = colors.ambient.r/255
            debugObject.ambientLight.color.g = colors.ambient.g/255
            debugObject.ambientLight.color.b = colors.ambient.b/255
                        })
            }

        /** */
        let keylightGui;

        if(config.lights.keyLight.enable && general_quality.keylight){
            /**
             * gui
             */

             keylightGui = lightingGui.addFolder('keyLight')
            keylightGui.add(debugObject.directionnalLight, 'intensity')
            .min(0).max(500).step(0.001).name('intensity')
            keylightGui.addColor(colors, 'key').name('color')
            .onChange(()=>{
                debugObject.directionnalLight.color.r = colors.key.r/255
                debugObject.directionnalLight.color.g = colors.key.g/255
                debugObject.directionnalLight.color.b = colors.key.b/255
            })
            const kpos =  keylightGui.addFolder('position')
            kpos.add(debugObject.directionnalLight.position, 'x').min(-25).max(25).step(0.001).name('posX')
            kpos.add(debugObject.directionnalLight.position, 'y').min(-25).max(25).step(0.001).name('posY')
            kpos.add(debugObject.directionnalLight.position, 'z').min(-25).max(25).step(0.001).name('posZ')
            
		keylightGui.add(renderer, 'toneMapping', {
                No: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping,
            })
            .onFinishChange(()=>
            {
                renderer.toneMapping = Number(renderer.toneMapping)
                updateAllMaterials()
            })

            keylightGui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
            keylightGui.add(debugObject.directionnalLight.shadow, 'normalBias').min(-1).max(1).step(0.001)
    
                }
                /******** */
			if(general_quality.shadows.enable){
			const directionLightCameraHelper = new THREE.CameraHelper(debugObject.directionnalLight.shadow.camera)
                        debugObject.shadowProjection = false
                        
                        const sScale =  keylightGui.addFolder('shadowScale')
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'near')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'far')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'left')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'right')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'top')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(debugObject.directionnalLight.shadow.camera, 'bottom')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                        })


                        keylightGui.add(debugObject.directionnalLight.shadow.mapSize, 'x')
                        .min(256)
                        .max(2048)
                        .step(128)
                        .name("shadowQuality")
                        .onChange(()=>{
                            debugObject.directionnalLight.shadow.mapSize.y = debugObject.directionnalLight.shadow.mapSize.x
                            debugObject.directionnalLight.shadow.camera.updateProjectionMatrix()
                            
                        })
                        
                        keylightGui.add(debugObject, 'shadowProjection')
                        .onChange(()=>
                        {
                            const scene = require('./scene')
                            if(debugObject.shadowProjection){
                                scene.scene.add(directionLightCameraHelper)
                            }else{
                                scene.scene.remove(directionLightCameraHelper)
                            }
                        })
			}
        
     }