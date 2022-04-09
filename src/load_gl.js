import './style.css'
import { general_quality } from './quality'
import { config } from './config'
import { scene } from './scene'




// const test = require('./environmentMap')
/**FOR DEBUG */

if(!window.location.href.includes(config.debug.commandLine)){
import('./environmentMap').then(()=>{ })
const doc = document.querySelector('.preloader')
doc.style.backgroundImage = "url('./textures/logo.png')"
}else{
    const doc = document.querySelector('.loading-bar')
    doc.style.visibility = 'visible'
}


const light = require('./lighting_Lamps')
for(const ob of light.lighting){scene.add(ob)}


const loading3dfiles = require('./load3dFiles')
switch(general_quality.id){
    case 'very_low':
        break;
    case 'low':
        break;
    case 'medium':
        

        break;
    case 'high':
        break;
    case 'very_high':
        break;
    case 'insane':
        break;
}

loading3dfiles.load_objects({path:'./models/static/cube.glb',instance:false, scene})
