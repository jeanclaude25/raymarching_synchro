precision lowp float;

uniform vec3 uColor_1;
uniform vec3 uColor_2;
uniform float uIntensity;
uniform float uStrength;

varying vec2 vUv;
varying float vColorValue;

float Circle(vec2 position, float radius){
    return length(position - vec2(0.5))-0.2;
}

float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = position;
    shaper *= vec2(1.0 - position.x,  1.0 - position.y);
    return shaper.x * shaper.y;
}

		void main() {
            vec2 position = vUv;

            vec3 color = mix(uColor_1, uColor_2, vColorValue);
            color += 0.4;
            vec3 final = vec3(rectShape(vec2(position.x-.5,position.y),vec2(.1)));
			float alpha = rectShape(vec2(position.x-.5,position.y),vec2(.1)) * 1.5;
            alpha *= uIntensity;
            color *= uStrength;
            gl_FragColor = vec4(color, alpha);

		}