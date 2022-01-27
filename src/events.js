import { renderer } from './renderer'
import { camera } from './camera'
import { config } from './config';


const viewer = document.getElementById("viewer");//choppe le viewer
// viewer.oncontextmenu =(e)=>{ add_anchor(e) }

const upload_env_hdr = document.getElementById('image_uploads_env_hdr')
upload_env_hdr.onchange = (e) => {update_image(e,upload_env_hdr.files[0])}

const upload_env_front = document.getElementById('image_uploads_env_front')
const upload_env_back = document.getElementById('image_uploads_env_back')
const upload_env_left = document.getElementById('image_uploads_env_left')
const upload_env_right = document.getElementById('image_uploads_env_right')
const upload_env_up = document.getElementById('image_uploads_env_up')
const upload_env_down = document.getElementById('image_uploads_env_down')
upload_env_front.onchange = (e) => {update_image(e,upload_env_front.files[0])}
upload_env_back.onchange = (e) => { update_image(e,upload_env_back.files[0])}
upload_env_left.onchange = (e) => { update_image(e,upload_env_left.files[0])}
upload_env_right.onchange = (e) => { update_image(e,upload_env_right.files[0])}
upload_env_up.onchange = (e) => { update_image(e,upload_env_up.files[0])}
upload_env_down.onchange = (e) => { update_image(e,upload_env_down.files[0])}




const update_image = (e,file) => {
const src = window.URL.createObjectURL(file)
	if(e.target.name==!'env_hdr'){
	const img_to_replace = document.getElementById(e.target.name)
	img_to_replace.src = src
		}

const environment = require('./environmentMap')

environment.environment_object.hdrOrnot=e.target.name==='env_hdr'?true:false
environment.environment_object.path[e.target.name] = src
environment.update_environment()
}


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(config.scene.pixelRatio) //quality
})


let bl_bool = false;
const mobile = false;

document.addEventListener("keydown", (event) => {

   if(event.key === 't'){
       toggle_panel()
       };

   if(event.key == "n"){

       };
});



export const toggle_panel = () => {

	const p_L = document.getElementById('panel_L');//attrape le panneau de gauche

	if(bl_bool){
		//augmenter le menu
		if( mobile ) {
							p_L.style.marginLeft = "0%" ;//déplace le panneau gauche
							
									
							}else{
									p_L.style.marginLeft = "0%" ;//déplace le panneau gauche
									
									};
	}else{
		//diminuer le menu
		if( mobile ) {
							p_L.style.marginLeft = "-25%" ;
							}else{
								p_L.style.marginLeft = "-20%" ;
								};
		
		
	};
	bl_bool = ! bl_bool;
};
toggle_panel()