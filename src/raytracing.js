// import * as THREE from 'three'
// import { DoubleSide } from 'three'
// import { camera } from './camera'
// // import { scene } from './scene'

// const raycaster = new THREE.Raycaster()


// //3d objects
// const geometry = new THREE.SphereGeometry( 50, 32, 32 )
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00
//     ,side: DoubleSide
// } )
// const sphere = new THREE.Mesh( geometry, material )


// export const positionFromRaycast = (cursor) => {
// 	const v = document.getElementById("viewer");//choppe le viewer

//     cursor.x = cursor.x / v.width * 2 - 1
//     cursor.y = - (cursor.y/ v.height) * 2 + 1

//     raycaster.setFromCamera(cursor, camera)
//     const intersects = raycaster.intersectObject(sphere) //array objects
    
//     const position= intersects[0].point
    
//     return position
//  }

