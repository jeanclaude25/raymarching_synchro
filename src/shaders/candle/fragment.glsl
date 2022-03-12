precision mediump float;

uniform float uTime;
uniform float uSpeed;

varying vec2 vUv;

float PI = 3.1415;

		void main() {

            vec3 color = vec3(0.9686, 1.0, 0.8235);
			gl_FragColor = vec4(color,1.0);

		}