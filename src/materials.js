import * as THREE from 'three'
import { scene } from './scene'
import { config } from './config'
import { debugObject } from './gui'
/**
 * Update all materials
 */
 export const updateAllMaterials = () =>
 {
     scene.traverse((child)=>
     {
         
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
                 //child.material.envMap = environnmentMap
                 child.material.envMapIntensity = debugObject.envMapIntensity
                 child.material.transparent = true
                 child.material.needsUpdate = true
                 child.castShadow = config.shadows.enable
                 child.receiveShadow = config.shadows.enable
                 
         }
     })
 }