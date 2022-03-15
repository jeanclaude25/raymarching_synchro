import './style.css'
import { general_quality } from './quality'
import { config } from './config'
import { scene } from './scene'
import { renderer } from './renderer'
import { camera } from './camera'
import { toggle_panel } from './events'
// import { a } from './shadowCatcher'



const test = require('./environmentMap')



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
//LOAD GLB 4K files for computer or wide screen devices
loading3dfiles.load_objects({path:'./models/static/walls.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/sofa.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/lights.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/fauteuils.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/plants.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/last_furniture.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/background.glb',instance:false})

//LOAD GLB 2K files for mobile devices

// loading3dfiles.load_objects('./models/instances/clouds/cloud.gltf',true, 'json/cloudsPoints.json')
