import * as THREE from 'three'
import { scene } from "./scene"

export const a = null
const geometry = new THREE.PlaneGeometry( 50, 50 )
geometry.rotateX( - Math.PI / 2 )

const material = new THREE.ShadowMaterial()
material.opacity = 0.2

const plane = new THREE.Mesh( geometry, material )
plane.position.y = 0
plane.receiveShadow = true
scene.add( plane )