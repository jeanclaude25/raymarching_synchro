import './style.css'
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
loading3dfiles.load_objects({path:'./models/static/tapis.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/sofa_1.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/walls.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/poutres.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/armoire.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/plant.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/plant_2.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/table_basse.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/furniture_table.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/furniture_2.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/fauteuils.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/poil.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/lamps.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/lamps_2.glb',instance:false})
loading3dfiles.load_objects({path:'./models/static/windows.glb',instance:false})



// loading3dfiles.load_objects('./models/instances/clouds/cloud.gltf',true, 'json/cloudsPoints.json')
