import * as THREE from 'three'

export const envMapArray = ['512','1k','2k']
export const texturesSizeArray = ['256','512','1K','2K','3K','4K']
export let general_quality = {
    pixel_ratio:1,
    antialias: true,
    textures_size: 2,
    envMap:1,
    envMapExt:'jpg',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 1024,
        type: THREE.PCFShadowMap
    }
}

const very_low_quality = {
    pixel_ratio:1,
    antialias: false,
    textures_size: 0,
    envMap:0,
    envMapExt:'jpg',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 256,
        type: THREE.PCFShadowMap
    }
}

const low_quality = {
    pixel_ratio:1,
    antialias:true,
    textures_size: 1,
    envMap:1,
    envMapExt:'jpg',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 512,
        type: THREE.PCFShadowMap
    }
}

const medium_quality = {
    pixel_ratio:1,
    antialias:true,
    textures_size: 2,
    envMap:2,
    envMapExt:'jpg',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

const high_quality = {
    pixel_ratio:2,
    antialias:true,
    textures_size: 3,
    envMap:2,
    envMapExt:'jpg',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

const very_high_quality = {
    pixel_ratio:2,
    antialias:true,
    textures_size: 4,
    envMap:2,
    envMapExt:'png',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'jpg',
        gloss: 'jpg'
    },
    shadows: {
        enable: true,
        mapSize: 3072,
        type: THREE.PCFShadowMap
    }
}

const insane_quality = {
    pixel_ratio:2,
    antialias:true,
    textures_size: 5,
    envMap:2,
    envMapExt:'png',
    textures_ext: {
        diffuse: 'jpg',
        normal: 'png',
        gloss: 'png'
    },
    shadows: {
        enable: true,
        mapSize: 4096,
        type: THREE.PCFShadowMap
    }
}

if(window.location.href.includes('?very_low'))general_quality = very_low_quality
if(window.location.href.includes('?low'))general_quality = low_quality
if(window.location.href.includes('?medium'))general_quality = medium_quality
if(window.location.href.includes('?high'))general_quality = high_quality
if(window.location.href.includes('?very_high'))general_quality = very_high_quality
if(window.location.href.includes('?insane'))general_quality = insane_quality

console.log(general_quality)