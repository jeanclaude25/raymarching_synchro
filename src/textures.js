import * as THREE from "three";
import { textureLoadingManager } from "./loadingManager";

const textureLoader = new THREE.TextureLoader(textureLoadingManager)

export const load_image = (path,sourceToCopy) => {
    // console.log("load" + path)
    return new Promise((resolve, reject) => {
        const texture = textureLoader.load(path,
            () => {},
          () => {},
          () => {
            console.log("couldn't load Image Texture");
          })
          if(texture.image !== null){
              if(sourceToCopy){
                const m = sourceToCopy
                texture.offset = m.offset.clone()
                texture.repeat = m.repeat.clone()
                texture.rotation = m.rotation
                texture.wrapS = m.wrapS
                texture.wrapT = m.wrapT
                texture.flipY = false
              }
            
              resolve(texture)
          }else{
              reject("can't load texture !")
          }

    })
    
}