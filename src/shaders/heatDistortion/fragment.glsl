precision lowp float;

uniform float uAlpha;
uniform float uTime;


varying vec2 vUv;
varying vec3 vColor;



void main()
{


    // gl_FragColor = vec4(col, col.x * uAlpha);
    gl_FragColor = vec4(vColor, uAlpha);


}