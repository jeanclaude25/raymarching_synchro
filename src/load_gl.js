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


const animation = require('./draw')
animation.tick()

const loading3dfiles = require('./load3dFiles')
loading3dfiles.load_objects({path:'./models/static/sofa.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/walls.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/plants.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/last_furniture.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/fauteuils.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/lights.glb',instance:false})


// loading3dfiles.load_objects('./models/instances/clouds/cloud.gltf',true, 'json/cloudsPoints.json')
