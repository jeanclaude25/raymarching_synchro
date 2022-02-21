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
        antialias:{
            enable: true
        },
        background: 'white' ,
        pixelRatio: 2,
        toneExposure:0.4,
        physicallyCorrectLight: true

    },
    lights:{
        keyLight:{
            enable: true,
            intensity: 50,
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
            intensity: 0.03
        },
        environmentLight:{
            enable: true,
            intensity: 3.315,
            encoding: 2
        }
    },
    shadows: {
        enable: true,
        mapSize: 2048,
        farDistance: 10,
        scale:{
            near:0,
            far:10.6,
            left:-4.57,
            right:4.57,
            top:4.57,
            bottom:-1.1
        },
        normalBias: 0.117
    },
    camera:{
        position:{
            x:1,
            y:1.5,
            z:5
            },
        lookAt:{
            x:2,
            y:2,
            z:-2.4
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
        commandLine:'?debug'
        }


}