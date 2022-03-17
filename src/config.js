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
        toneExposure:3.6,
        physicallyCorrectLight: true

    },
    lights:{
        keyLight:{
            enable: true,
            intensity: 36,
            position:{
                    x: -1.35,
                    y: 1.983,
                    z: 5.092
                    }
        },
        ambientLight:{
            enable: true,
            intensity: 2
        },
        environmentLight:{
            enable: true,
            intensity: 0.682,
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
            x: 2.2,
            y:1.11,
            z:2.4
            },
        lookAt:{
            x: 2.192,
            y: 1.03,
            z: -1.36
        },
        constraint:{
            vertical: true,
            verticalMin: 0.2,
            verticalMax: 1,
            horizontal: false,
            horizontalMin: 0,
            horizontalMax: 1
        }
    },
    debug:{
        commandLine:'?debug',
        rawLoad: false //impact material texture swap or not
        }


}