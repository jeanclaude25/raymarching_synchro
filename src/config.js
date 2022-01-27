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
        toneExposure:0.62,
        physicallyCorrectLight: true

    },
    lights:{
        keyLight:{
            enable: true,
            intensity: 10,
            position:{
                    x:-1.6,
                    y:4.8,
                    z:-3.6
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
        mapSize: 1024,
        farDistance: 10,
        scale:{
            near:-8.4,
            far:18,
            left:-19.5,
            right:30.4,
            top:20.6,
            bottom:-10.8
        },
        normalBias: 0.117
    },
    camera:{
        position:{
            x:15,
            y:5,
            z:2
            },
        lookAt:{
            x:0,
            y:3,
            z:0
        },
        constraint:{
            vertical:true,
            verticalMin:0.2,
            verticalMax:1,
            horizontal:false,
            horizontalMin:0,
            horizontalMax:1
        }
    }


}