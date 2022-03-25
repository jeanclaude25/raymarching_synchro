precision lowp float;

uniform sampler2D tDiffuse;
uniform sampler2D tHeatDistortion;


		varying vec2 vUv;

		void main() {

			// vec4 texHeatTest = texture2D( tHeatDistortion, vUv );

			vec3 texHeat = texture2D( tHeatDistortion, vUv ).xyz *2. -1.;
			
			vec2 newUv = vUv + texHeat.xy *0.002;
			vec4 tex = texture2D( tDiffuse, newUv );

			gl_FragColor = vec4(tex + 0.05);

			// gl_FragColor = LinearTosRGB( tex );


		}