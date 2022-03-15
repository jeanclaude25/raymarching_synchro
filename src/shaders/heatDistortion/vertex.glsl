// attribute vec2 uv;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uFrequency;
varying vec2 vUv;

void main()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float waves = sin(modelPosition.x * uFrequency.x -(uTime * uSpeed)) * .01;
    waves += cos(modelPosition.y * uFrequency.y - (uTime * uSpeed)) * .01;
    waves += cos(modelPosition.z * uFrequency.y - (uTime * uSpeed)) * .005;

    modelPosition.xy += waves * 2.0 ;
    vec4 viewPosition = viewMatrix * modelPosition ;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
}