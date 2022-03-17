// attribute vec2 uv;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uFrequency;

uniform float uScale;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vColor;

float rand(vec2 n){
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise2d(vec2 p){
vec2 ip = floor(p);
vec2 u = fract(p) ;
u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.,0.)), u.x),
        mix(rand(ip+vec2(0.,1.)),rand(ip+vec2(1.,1.)), u.x), u.y);
     
    return res*res;
}

float turbulence(vec2 vUv){
    vec2 st = vUv.xy * uResolution.xy;
    st *= uScale * (sin(vUv.x)+0.1);

    // st -= vec2((1. - vUv.x ));
    // st = rotate((1. - vUv.x )) * st;
    // st += vec2((1. - vUv.x ));

    return noise2d(vec2(st.x + (uTime*uSpeed),st.y));
}

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

    
    float n = turbulence(vec2(uv.x,uv.y + uTime *0.1));
    vColor = vec3(n,n,n);

    vUv = uv;
}