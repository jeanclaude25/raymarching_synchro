
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { camera } from './camera'

import { renderer } from './renderer'
import { scene } from './scene'
import { GammaCorrectionShader } from './shaders/gammaCorrection/GammaCorrection'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import { general_quality } from './quality'
import { config } from './config'

export const passes = []


export const effectComposer = new EffectComposer(renderer)
passes.push(effectComposer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const bloom = new UnrealBloomPass()
bloom.threshold = 0.9
bloom.radius = 0.1
bloom.strength = 0.3
effectComposer.addPass(bloom)

export const gammaCorrection = new ShaderPass( GammaCorrectionShader );
effectComposer.addPass(gammaCorrection)

if(general_quality.fxaa){
    import('three/examples/jsm/shaders/FXAAShader.js').then(({FXAAShader})=>{
        const fxaaPass = new ShaderPass( FXAAShader );
        effectComposer.addPass(fxaaPass)
    })
}

if(general_quality.smaa){
    import('three/examples/jsm/postprocessing/SMAAPass.js').then(({SMAAPass})=>{
        const smaaPass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() );
        effectComposer.addPass(smaaPass)
    })
}


/**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
    import('./gui').then(({gui})=>{



/**Postprocess pass to add or remove */
let allPasses = []


const postProcess_gui = gui.addFolder('PostProcessing')

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
import('three/examples/jsm/postprocessing/AdaptiveToneMappingPass').then(({AdaptiveToneMappingPass})=>{
    create_postProcess(
        'AdaptiveToneMapping',
        new AdaptiveToneMappingPass()
        )
})


/**AfterImagePass (MotionBlur) */
import('three/examples/jsm/postprocessing/AfterimagePass').then(({AfterimagePass})=>{
    create_postProcess(
        'MotionBlur',
        new AfterimagePass()
        )
})

/**Bloom */
import('three/examples/jsm/postprocessing/UnrealBloomPass').then(({UnrealBloomPass})=>{
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
})

import('three/examples/jsm/postprocessing/DotScreenPass').then(({DotScreenPass})=>{
create_postProcess(
    'DotScreenPass',
    new DotScreenPass()
)
})

import('three/examples/jsm/postprocessing/FilmPass').then(({FilmPass})=>{
create_postProcess(
    'FilmPass',
    new FilmPass()
)
})

import('three/examples/jsm/postprocessing/GlitchPass').then(({GlitchPass})=>{
    create_postProcess(
        'GlitchPass',
        new GlitchPass()
    )
})

import('three/examples/jsm/postprocessing/HalftonePass').then(({HalftonePass})=>{
    create_postProcess(
        'HalftonePass',
        new HalftonePass()
    )
})

import('three/examples/jsm/postprocessing/SAOPass').then(({SAOPass})=>{
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
           step:0.001 
        },
        {
            place:'params',
            name:'saoScale',
            default:1.5,
            min:0,
            max:200,
            step:0.001 
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
})


import('three/examples/jsm/postprocessing/SSAOPass').then(({SSAOPass})=>{
create_postProcess(
    'SSAOPass',
    new SSAOPass(scene, camera)
)
})


    })
}