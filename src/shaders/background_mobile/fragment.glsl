precision lowp float;

uniform sampler2D uBackgroundDiffuse;
uniform sampler2D uBackgroundLayers;

uniform float uTime;

varying vec2 vUv;



		void main() {
            vec4 layers = texture2D(uBackgroundLayers, vUv);
            vec2 distortedUv = vUv;

            vec4 diffuse = texture2D(uBackgroundDiffuse, distortedUv);
            
			gl_FragColor = vec4(diffuse);

		}