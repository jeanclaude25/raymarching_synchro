import './style.css'
import { config } from './config'
import { scene } from './scene'
import { renderer } from './renderer'
import { camera } from './camera'
import { toggle_panel } from './events'
import { a } from './shadowCatcher'

const test = require('./environmentMap')


const sizes = {
    width: config.html.sizeX,
    height: config.html.sizeY
}





const light = require('./lighting_Lamps')
for(const ob of light.lighting){scene.add(ob)}


const animation = require('./draw')
animation.tick()

const loading3dfiles = require('./load3dFiles')
loading3dfiles.load_objects('./models/static/Gabelstapler-WebGL_test_v3.glb',false)
// loading3dfiles.load_objects('./models/instances/clouds/cloud.gltf',true, 'json/cloudsPoints.json')
