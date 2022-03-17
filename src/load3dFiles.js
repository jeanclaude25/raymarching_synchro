import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { objectLoadingManager } from './loadingManager'
import { config } from './config'



export const loaded_obj={}
/**
 * LOADERS
 */
 const dracoLoader = new DRACOLoader(objectLoadingManager)
 //Use Draco compression to load lighter file
 //use worker & assembly to load file
 dracoLoader.setDecoderPath('./draco/') //lighter loading
 const gltfLoader = new GLTFLoader(objectLoadingManager)
 gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Models
 */
export const load_objects = (obj) => {
 gltfLoader.load(
    obj.path,
    (gltf)=>
    {
        console.log('success ')
        
        //Animation de l'objet
        //ajouter mixer.update(delaTime) dans la tick function if!=null
        //mixer = new THREE.AnimationMixer(gltf.scene)
        //const action = mixer.clipAction(gltf.animations[0])
        if(!obj.instance)
        {
        obj.scene.add(gltf.scene)
        }else{
            //send to instances
            makeInstance(gltf.scene.children[0],obj.instance_path, obj.scene)
        }

        
        /**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
    import('./gui').then(({gui})=>{
        const scobj = gui.addFolder(gltf.scene.children[0].name)

         scobj.add(gltf.scene.rotation, 'y')
         .min(-Math.PI).max(Math.PI).step(0.001).name('rotation')
    })
}
         
    },
    ()=>
    {
        console.log('progress')
    },
    ()=>
    {
        console.log('error')
    }
)
}

const makeInstance = (obj,pointsFiles, scene) => {
    //read and parse json
    const json = require("./"+pointsFiles) 
    const points = Object.entries(json)
    const listPoints = points[0][1]

    //Create Instanced Mesh
    const instancedMesh = new THREE.InstancedMesh(obj.geometry, obj.material, listPoints.length);
    const matrix = new THREE.Matrix4()

    if(obj.isMesh){
        for (let i = 0; i < listPoints.length;i++){
            matrix.setPosition( listPoints[i].pos[0] , listPoints[i].pos[1], listPoints[i].pos[2] )
            instancedMesh.setMatrixAt(i , matrix)
        }
        scene.add(instancedMesh)
    }
    

}