import * as THREE from 'three'

const envMapArray = ['512','1k','2k']
const texturesSizeArray = ['256','512','1K','2K','3K','4K']

export let general_quality = {
    id: 'custom',
    pixel_ratio:1,
    antialias: false,
    smaa:true,
    fxaa:false,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[0],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
        },
        normal:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        disp:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        }
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

const very_low_quality = {
    id: 'very_low',
    pixel_ratio:1,
    antialias: false,
    smaa: false,
    fxaa: true,
    ambientLight: false,
    keylight: false,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[1],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
        },
        normal:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        disp:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg'
        }
    },
    shadows: {
        enable: false,
        mapSize: 512,
        type: THREE.PCFSoftShadowMap
    }
}

const low_quality = {
    id: 'low',
    pixel_ratio:1,
    antialias: false,
    smaa:false,
    fxaa:true,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[1],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
        },
        normal:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        disp:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        }
    },
    shadows: {
        enable: true,
        mapSize: 512,
        type: THREE.PCFSoftShadowMap
    }
}

const medium_quality = {
    id: 'medium',
    pixel_ratio:1,
    antialias: false,
    smaa:true,
    fxaa:false,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
            
        },
        normal:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        disp:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        }
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

const high_quality = {
    id: 'high',
    pixel_ratio:2,
    antialias: false,
    smaa:false,
    fxaa:false,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        },
        normal:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
            
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg'
            
        },
        disp:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg'
            
        }
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

const very_high_quality = {
    id: 'very_high',
    pixel_ratio:2,
    antialias: false,
    smaa:false,
    fxaa:false,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg'
            
        },
        normal:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        },
        disp:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        }
    },
    shadows: {
        enable: true,
        mapSize: 3072,
        type: THREE.PCFShadowMap
    }
}

const insane_quality = {
    id: 'insane',
    pixel_ratio:2,
    antialias: true,
    smaa:false,
    fxaa:false,
    ambientLight: true,
    keylight: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg'
        },
        ao:{
            allow: true,
            size: texturesSizeArray[5],
            extension: 'jpg'
            
        },
        normal:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg'
            
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg'
            
        },
        disp:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        },
        lightsMap:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg'
            
        }
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