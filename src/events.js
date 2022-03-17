import { heatRenderer, renderer, resizeRenderer } from './renderer'
import { cameraUpdate } from './camera'
import { refreshSizes } from './scene';
import { passes } from './postProcess';
import { config } from './config';





/**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
	let update_image;
	import('./environmentMap_debug').then(({default: environment_object, update_environment})=>{
	// environment = environment_object
	update_image = (e,file) => {
		const src = window.URL.createObjectURL(file)
			if(e.target.name==!'env_hdr'){
			const img_to_replace = document.getElementById(e.target.name)
			img_to_replace.src = src
				}
	
		// environment_object.hdrOrnot=e.target.name==='env_hdr'?true:false
		// environment_object.path[e.target.name] = src
		// update_environment()
		}
console.log(environment_object)
	})

	

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
	
}

window.addEventListener('resize', () =>
{
	refreshSizes()
    cameraUpdate()
	resizeRenderer(renderer)
	resizeRenderer(heatRenderer, false)
	passes.forEach((child)=> resizeRenderer(child) )
})


let bl_bool = false;
const mobile = false;

document.addEventListener("keydown", (event) => {

   if(event.key === 't'){
       toggle_panel()
       };

   if(event.key === "n"){

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