import { canvas, heatRenderer, renderer, resizeRenderer } from './renderer'
import { cameraTilt, cameraUpdate, cameraZero } from './camera'
import { refreshSizes } from './scene';
import { passes } from './postProcess';
import { config } from './config';
import { mobileAndTabletCheck, orientationProcess } from './detect_mobile';
import { rayMarchCube } from './materials';

export const events = () => {

	/**MouseTilt */
	if(!mobileAndTabletCheck()){
		/**Computer */
		canvas.addEventListener('mousemove', (e) =>{
			e.stopPropagation()
			
				cameraTilt(e,canvas)
		})
		canvas.addEventListener('mouseout', (e) =>{
			//camera to zero pos
			cameraZero()
		})
	}else{
		/**Mobile device */
		window.DeviceOrientationEvent?window.addEventListener("deviceorientation", orientationProcess, true):''
        
	}

	
}

/**RESIZE EVENT */
window.addEventListener('resize', () => {
	refreshSizes()
	cameraUpdate()
	resizeRenderer(renderer)
	resizeRenderer(heatRenderer, false)
	passes.forEach((child)=> resizeRenderer(child) )

	if(rayMarchCube.length>0)
		import('./shaders/rayMarchCube/Cube').then( ({resizeMarchCube})=>
			rayMarchCube.forEach((cube)=> resizeMarchCube(cube, renderer) )
			)
	
})

/*************************************************************** */
/**DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
	
	import('./environmentMap_debug').then(({environment_object, update_environment})=>{
		
			const body = document.querySelector('body')
			const hdrDiv = document.createElement("div")
			hdrDiv.id = "panel_L"
			body.append(hdrDiv)
			

			const table = document.createElement("table")
			table.border = "0"
			table.cellPadding = "1"
			table.cellSpacing = "1"
			hdrDiv.append(table)

			const envD = document.createElement("div")
			envD.id = "environment"
			table.append(envD)

			const title = document.createElement("h1")
			title.textContent = 'Environment'
			envD.append(title)
			envD.append(document.createElement('hr'))
			envD.append(document.createElement('br'))

			const field = document.createElement("fieldset")
			envD.append(field)
			envD.append(document.createElement('br'))
			envD.append(document.createElement('br'))

			const titleField = document.createElement("h2")
			titleField.textContent = 'hdr_import'
			field.append(titleField)

			const inputFile = document.createElement("input")
			inputFile.type = "file"
			inputFile.id = "image_uploads_env_hdr"
			inputFile.name = "env_hdr"
			inputFile.accept = ".hdr"
			inputFile.onchange = (e) => {update_image(e,inputFile.files[0])}
			field.append(inputFile)

			const divOrtho = document.createElement('div')
			divOrtho.id = 'ortho_load'
			envD.append(divOrtho)

			const fieldOrtho = document.createElement("fieldset")
			divOrtho.append(fieldOrtho)

			const titleOrtho = document.createElement("h2")
			titleOrtho.textContent = 'cube_import'
			fieldOrtho.append(titleOrtho)

			const titleContent = ['front', 'back', 'left', 'right', 'up', 'down']

			titleContent.forEach((elem)=>{
				const titleFrontField = document.createElement("h2")
				titleFrontField.textContent = elem
				fieldOrtho.append()
				const inputF = document.createElement("input")
				inputF.type = "file"
				inputF.id = "image_uploads_env_" + elem
				inputF.name = "env_"+ elem
				inputF.accept = ".jpg, .jpeg, .png, .tga"
				fieldOrtho.append(inputF)
				fieldOrtho.append(document.createElement('br'))
				fieldOrtho.append(document.createElement('br'))
				inputF.onchange = (e) => {update_image(e,inputF.files[0])}
			})
			
		

	const update_image = (e,file) => {
		const src = window.URL.createObjectURL(file)
			if(e.target.name==!'env_hdr'){
			const img_to_replace = document.getElementById(e.target.name)
			img_to_replace.src = src
				}
	
		environment_object.hdrOrnot=e.target.name==='env_hdr'?true:false
		environment_object.path[e.target.name] = src
		update_environment()
		}
	})

	

	/**Panel for hdr change */
	let bl_bool = false;
const mobile = false;

document.addEventListener("keydown", (event) => {

   if(event.key === 't'){
       toggle_panel()
       };

   if(event.key === "n"){

       };
});



	const toggle_panel = () => {
		const menu = document.getElementById('panel_L')
	
		if(bl_bool){
			//augmenter le menu
			if( mobile ) {
								menu.style.marginLeft = "0%" ;//déplace le panneau gauche
		
								}else{
										menu.style.marginLeft = "0%" ;//déplace le panneau gauche
										
										};
		}else{
			//diminuer le menu
			if( mobile ) {
								menu.style.marginLeft = "-25%" ;
								}else{
									menu.style.marginLeft = "-20%" ;
									};
			
			
		};
		bl_bool = ! bl_bool;
	};
// toggle_panel()
}

