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

import { renderer } from './renderer'
import { scene } from './scene'

export const passes = []


export const effectComposer = new EffectComposer(renderer)
passes.push(effectComposer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)
const adaptive_1 = new AdaptiveToneMappingPass()
effectComposer.addPass(adaptive_1)

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
                    .onChange((value)=>{
                        if(elem.place){
                        postP[elem.place][elem.name] = value
                        console.log(postP[elem.place])
                        }else{
                            postP[elem.name] = value
                            console.log(postP)
                        }
                    })
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
    new SAOPass(scene,camera),
    [
        {
            place:'params',
           name:'saoIntensity',
           default:0.01,
           min:0,
           max:1,
           step:0.01 
        },
        {
            place:'params',
            name:'saoScale',
            default:1.5,
            min:0,
            max:200,
            step:0.01 
         },
         {
            place:'params',
            name:'saoKernelRadius',
            default:12,
            min:0,
            max:32,
            step:0.01 
         },
         {
            place:'params',
            name:'saoBlurRadius',
            default:1.3,
            min:0,
            max:32,
            step:0.01 
         },
         {
            place:'params',
            name:'saoBlurStdDev',
            default:1.5,
            min:0,
            max:8,
            step:0.01 
         },
         {
            place:'params',
            name:'saoMinResolution',
            default:0.00001,
            min:0,
            max:1,
            step:0.00001 
         },
         {
            place:'params',
            name:'saoBias',
            default:0.53,
            min:0,
            max:1,
            step:0.01 
         }
    ]
    
)

create_postProcess(
    'SSAOPass',
    new SSAOPass(scene, camera)
    
)
