import * as THREE from 'three'

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

import {AdaptiveToneMappingPass} from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass'
import {AfterimagePass} from 'three/examples/jsm/postprocessing/AfterimagePass'
import {DotScreenPass} from 'three/examples/jsm/postprocessing/DotScreenPass'
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass'
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
import {HalftonePass} from 'three/examples/jsm/postprocessing/HalftonePass'

import {SAOPass} from 'three/examples/jsm/postprocessing/SAOPass'
import {SSAOPass} from 'three/examples/jsm/postprocessing/SSAOPass'

import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { camera } from './camera'
import { config } from './config'

import { renderer } from './renderer'
import { scene } from './scene'



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(config.scene.pixelRatio)
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

/**Postprocess pass to add or remove */
let allPasses = []


const gui = require('./gui')
const postProcess_gui = gui.gui.addFolder('PostProcessing')



const create_postProcess = (name,postP,tweek) => {
    const ob = {
                on:false,
                gui:null
                }
    postProcess_gui.add(ob, 'on')
    .name(name)
    .onChange( (value) => {
        if (value){
            clean_passes()
            const postprocessPass = {
                name,
                pass: postP
                }
            allPasses.push(postprocessPass)
            refresh_passes()

            /**gui */
            if(tweek){
                ob.gui = postProcess_gui.addFolder(name)
                ob.gui.open()
                tweek.forEach((elem)=>{
                    ob[elem.name] == undefined?ob[elem.name] = elem.default:''
                    ob.gui.add(ob, elem.name).min(elem.min).max(elem.max).step(elem.step)
                    .onChange((value)=>postP[elem.name] = value)
                    postprocessPass.pass[elem.name] = elem.default
                    })
            }
            
        }else{
            clean_passes()
            const nPasses = allPasses.filter((elem)=> elem.name != name)
            allPasses = nPasses
            refresh_passes()
            /**gui */
            tweek?postProcess_gui.removeFolder(ob.gui):''
                
        }
    })
}

const clean_passes = () =>{
    allPasses.forEach((passe)=>{
        effectComposer.removePass(passe.pass)
    })
}

const refresh_passes = () =>{
    allPasses.forEach((passe)=>{
        effectComposer.addPass(passe.pass)
    })
}


/**Adaptive tone mapping */
create_postProcess(
    'AdaptiveToneMapping',
    new AdaptiveToneMappingPass()
    )

/**AfterImagePass (MotionBlur) */
create_postProcess(
    'MotionBlur',
    new AfterimagePass()
    )

/**Bloom */
create_postProcess(
    'Bloom',
    new UnrealBloomPass(),
    [
        {
           name:'threshold',
           default:0.68,
           min:0,
           max:1,
           step:0.01 
        },
        {
            name:'radius',
            default:0,
            min:0,
            max:2,
            step:0.01 
         },
         {
            name:'strength',
            default:0.17,
            min:0,
            max:5,
            step:0.01 
         }
    ]
    )

create_postProcess(
    'DotScreenPass',
    new DotScreenPass()
)

create_postProcess(
    'FilmPass',
    new FilmPass()
)

create_postProcess(
    'GlitchPass',
    new GlitchPass()
)

create_postProcess(
    'HalftonePass',
    new HalftonePass()
)

create_postProcess(
    'SAOPass',
    new SAOPass(scene,camera)
    
)

create_postProcess(
    'SSAOPass',
    new SSAOPass(scene, camera)
)
