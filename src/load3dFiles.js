import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { config } from './config'
import { scene } from './scene'
import { updateAllMaterials } from './materials' //to require when debug
import { random } from 'gsap/all'
const gui = require('./gui')

export const loaded_obj={}
/**
 * LOADERS
 */
 const dracoLoader = new DRACOLoader()
 //Use Draco compression to load lighter file
 //use worker & assembly to load file
 dracoLoader.setDecoderPath('./draco/') //lighter loading
 const gltfLoader = new GLTFLoader()
 gltfLoader.setDRACOLoader(dracoLoader)

/**Animation Gltf */
export let mixer = null
const animations_gltf = []

/**
 * Models
 */
export const load_objects = (objPath,instance,instance_path) => {
 gltfLoader.load(
    objPath,
    (gltf)=>
    {
        console.log('success ')
        
        //Animation de l'objet
        //ajouter mixer.update(delaTime) dans la tick function if!=null
        //mixer = new THREE.AnimationMixer(gltf.scene)
        //const action = mixer.clipAction(gltf.animations[0])
        if(!instance)
        {
            /**Animation gltf */
        mixer = new THREE.AnimationMixer(gltf.scene)
        let anim_gui;
        if(gltf.animations.length>0){
           anim_gui = gui.gui.addFolder('Animations')
        }

        gltf.animations.forEach((anim)=> {
            anim.toggle = false
            const action = mixer.clipAction(anim)
            animations_gltf.push(action)
            
            /**Debug */
            
            anim_gui.add(anim,'toggle')
            .name(anim.name)
            .onChange((value)=>{
                value?action.play():action.stop()
            })
        })
        console.log(gltf.animations)
        console.log(animations_gltf)

        scene.add(gltf.scene)
        updateAllMaterials()
        }else{
            //send to instances
            makeInstance(gltf.scene.children[0],instance_path)
        }

        /**
         * gui.gui
         */
         const scobj = gui.gui.addFolder(gltf.scene.children[0].name)
         gltf.scene.rotation.y = -0.274
         scobj.add(gltf.scene.rotation, 'y')
         .min(-Math.PI)
         .max(Math.PI)
         .step(0.001)
         .name('rotation')
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

const makeInstance = (obj,pointsFiles) => {
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