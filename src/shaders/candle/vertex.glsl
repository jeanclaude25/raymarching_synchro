        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 modelViewMatrix;

        uniform float uTime;
        
        attribute vec2 uv;
        attribute vec3 position;

        varying vec2 vUv;

		void main() {

			vUv = uv;

            vec2 uFrequency = vec2(20.0,20.0);

            vec4 modelPosition = vec4(position,1.0);
            float waves = sin(modelPosition.x * uFrequency.x -uTime) * .01;
            waves += sin(modelPosition.y * uFrequency.y - uTime) * .01;
            modelPosition.x += waves * (1.0 - vUv.y);
            modelPosition.y += waves * (1.0 - vUv.y);
            gl_Position = projectionMatrix * modelViewMatrix * modelPosition;

		}