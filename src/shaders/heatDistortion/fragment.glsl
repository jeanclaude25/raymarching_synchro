
uniform float uAlpha;
uniform float uTime;


varying vec2 vUv;



void main()
{


    // gl_FragColor = vec4(col, col.x * uAlpha);
    gl_FragColor = vec4(vec3(1.0), uAlpha);


}