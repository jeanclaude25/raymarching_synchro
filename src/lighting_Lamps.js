import * as THREE from 'three'
import { config } from './config'
import { updateAllMaterials } from './materials' //to require when debug
import { general_quality } from './quality'

const debugObject = {}

export const lighting = []
//si debug...
const gui = require('./gui')
const lightingGui = gui.gui.addFolder('Lamps')
/**
 * Lights
 */
 //AMBIENT
 if(config.lights.ambientLight.enable){
     const ambientLight = new THREE.AmbientLight(0xffffff, config.lights.ambientLight.intensity)
     lighting.push(ambientLight)
     
    /**
     * gui
     */
     const ambientGui = lightingGui.addFolder('AmbientLight')
     ambientGui.add(ambientLight, 'intensity')
    .min(0)
    .max(5)
    .step(0.001)
    .name('intensity')
    
     }
    
    //DIRECTIONNAL FillLights
    if(config.lights.fillLight.enable){
    const directionnalLight = new THREE.DirectionalLight(0xffffff, config.lights.keyLight.intensity)
    directionnalLight.position.x = config.lights.keyLight.position.x
    directionnalLight.position.y = config.lights.keyLight.position.y
    directionnalLight.position.z = config.lights.keyLight.position.z
    directionnalLight.shadow.normalBias = config.shadows.normalBias
    
    lighting.push(directionnalLight)
    
    /**
     * gui
     */

     const keylightGui = lightingGui.addFolder('keyLight')
     keylightGui.add(directionnalLight, 'intensity')
    .min(0)
    .max(500)
    .step(0.001)
    .name('intensity')
    const kpos =  keylightGui.addFolder('position')
    kpos.add(directionnalLight.position, 'x').min(-5).max(5).step(0.001).name('posX')
    kpos.add(directionnalLight.position, 'y').min(-5).max(5).step(0.001).name('posY')
    kpos.add(directionnalLight.position, 'z').min(-5).max(5).step(0.001).name('posZ')
    
    const renderer = require('./renderer')
    keylightGui.add(renderer.renderer, 'toneMapping', {
                No: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping,
            })
            .onFinishChange(()=>
            {
                renderer.renderer.toneMapping = Number(renderer.renderer.toneMapping)
                updateAllMaterials()
            })

            keylightGui.add(renderer.renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
            keylightGui.add(directionnalLight.shadow, 'normalBias').min(-1).max(1).step(0.001)
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
                        
                        const directionLightCameraHelper = new THREE.CameraHelper(directionnalLight.shadow.camera)
                        debugObject.shadowProjection = false
                        
                        const sScale =  keylightGui.addFolder('shadowScale')
                        sScale.add(directionnalLight.shadow.camera, 'near')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(directionnalLight.shadow.camera, 'far')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(directionnalLight.shadow.camera, 'left')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(directionnalLight.shadow.camera, 'right')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(directionnalLight.shadow.camera, 'top')
                        .min(0).max(50)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })
                        sScale.add(directionnalLight.shadow.camera, 'bottom')
                        .min(-50).max(0)
                        .step(0.001)
                        .onChange(()=>{
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                        })


                        keylightGui.add(directionnalLight.shadow.mapSize, 'x')
                        .min(256)
                        .max(2048)
                        .step(128)
                        .name("shadowQuality")
                        .onChange(()=>{
                            directionnalLight.shadow.mapSize.y = directionnalLight.shadow.mapSize.x
                            directionnalLight.shadow.camera.updateProjectionMatrix()
                            
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