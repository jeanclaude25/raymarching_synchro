precision lowp float;

uniform float uTreeStrength;
uniform float uWaterStrength;

uniform sampler2D uBackgroundDiffuse;
uniform sampler2D uBackgroundLayers;

uniform float uTime;

varying vec2 vUv;


		void main() {
            vec4 layers = texture2D(uBackgroundLayers, vUv);
            vec2 distortedUv = vUv;

            //Water movement
            float waterMask = (vUv.y * 0.1) * (vUv.x * (1.0-vUv.x) * 2.5) * layers.r;
            float waterWave = sin(vUv.x * 5.0 + sin(uTime+ vUv.y * clamp(waterMask * 10., 0., 10. ) + cos(vUv.x))) * uWaterStrength ;
            distortedUv.x +=  waterWave * waterMask ;

            
            vec4 diffuse = texture2D(uBackgroundDiffuse, distortedUv);
            
            // foreground tree
            vec2 foregroundUv = vUv;
            float foregroundgrad = max(layers.g, 0.1) - 0.1 ;
            float foregroundMask = floor((layers.g * 10.)) ;

            float treeWave = sin(vUv.x * .5 + sin(uTime+ vUv.y * clamp(foregroundgrad * 1., 0., 1. ) + cos(vUv.x))) * uTreeStrength ;
            foregroundUv.x += treeWave * foregroundMask;
            vec4 foreground = texture2D(uBackgroundDiffuse ,foregroundUv);
            
            vec4 final =  (foreground * clamp(foregroundMask, 0., 1.)) + (diffuse * (1.0 - clamp(foregroundMask, 0., 1.)));




            // vec3 color = vec3(0.9686, .0, .0);
			// gl_FragColor = vec4(waterWave);
			gl_FragColor = vec4(final);


		}