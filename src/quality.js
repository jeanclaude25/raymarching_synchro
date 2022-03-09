import * as THREE from 'three'

const envMapArray = ['512','1k','2k']
const texturesSizeArray = ['256','512','1K','2K','3K','4K']

export let general_quality = {
    id: 'custom',
    pixel_ratio:1,
    antialias: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: false,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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
    antialias: true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[1],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[0],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: false,
            size: texturesSizeArray[0],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        }
    },
    shadows: {
        enable: true,
        mapSize: 512,
        type: THREE.PCFSoftShadowMap
    }
}

const low_quality = {
    id: 'low',
    pixel_ratio:1,
    antialias:true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[1],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: false,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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
    antialias:true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: false,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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
    pixel_ratio:1,
    antialias:true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[2],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: true,
            size: texturesSizeArray[1],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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
    antialias:true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: true,
            size: texturesSizeArray[3],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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
    antialias:true,
    textures:{
        environment:{
            hdr: false,
            size: envMapArray[2],
            extension: 'jpg'
        },
        diffuse:{
            allow: true,
            size: texturesSizeArray[5],
            extension: 'jpg',
            encoding: THREE.sRGBEncoding
        },
        ao:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        normal:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        gloss:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
        },
        disp:{
            allow: true,
            size: texturesSizeArray[4],
            extension: 'jpg',
            // encoding: THREE.sRGBEncoding
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