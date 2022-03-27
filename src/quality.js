import * as THREE from 'three'

 const envMapArray = ['256','512','1k','2k']
 const texturesSizeArray = ['256','512','1K','2K','3K','4K']

export let general_quality = {
    id: 'custom',
    // pixel_ratio: Math.min(window.devicePixelRatio, 2),
    pixel_ratio: 2,
    antialias: false,
    smaa: false,
    fxaa: false,
    ambientLight: true,
    keylight: !true,
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
        enable: !true,
        mapSize: 2048,
        type: THREE.PCFShadowMap
    }
}

let qualityID;
if(window.location.href.includes('?very_low')) qualityID = 'very_low'
if(window.location.href.includes('?low')) qualityID = 'low'
if(window.location.href.includes('?medium')) qualityID = 'medium'
if(window.location.href.includes('?high')) qualityID = 'high'
if(window.location.href.includes('?very_high')) qualityID = 'very_high'
if(window.location.href.includes('?insane')) qualityID = 'insane'

if(qualityID){
    import(`./quality/${qualityID}`).then(({quality})=>{
        general_quality = quality
        console.log(general_quality)
    
    })
}
