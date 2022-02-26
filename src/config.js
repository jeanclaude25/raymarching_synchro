export const config ={
    html:{
        canvasID:'canvas.webgl',
        sizeX: window.innerWidth,
        sizeY: window.innerHeight
    },
    assets:{
        envPath:'./textures/environmentMaps/0/',
        envFiles:['px','nx','py','ny','pz','nz'],
        envExt:'.jpg'
    },
    scene:{
        background: 'white' ,
        toneExposure:1,
        physicallyCorrectLight: true

    },
    lights:{
        keyLight:{
            enable: true,
            intensity: 5,
            position:{
                    x:-3.14,
                    y:2.36,
                    z:5
                    }
        },
        fillLight:{ //none here
            enable: true,
            intensity: 0
        },
        ambientLight:{
            enable: true,
            intensity: 0
        },
        environmentLight:{
            enable: true,
            intensity: 1.4,
            encoding: 2
        }
    },
    shadows: {
        farDistance: 10,
        scale:{
            near:0,
            far:10.951,
            left:-4.57,
            right:4.64,
            top:4.57,
            bottom:-2.1
        },
        normalBias: 0.117
    },
    camera:{
        position:{
            x:0.686,
            y:1.571,
            z:3.478
            },
        lookAt:{
            x:2,
            y:1.637,
            z:-0.696
        },
        constraint:{
            vertical:true,
            verticalMin:0.2,
            verticalMax:1,
            horizontal:false,
            horizontalMin:0,
            horizontalMax:1
        }
    },
    debug:{
        commandLine:'?debug',
        rawLoad: false //impact material texture swap or not
        }


}