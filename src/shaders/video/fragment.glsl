precision lowp float;

// uniform sampler2D uVideo;
uniform float uAlpha;

varying vec2 vUv;

void main()
{

// vec4 video = texture2D(uVideo, vUv);
gl_FragColor = vec4(1.,0.,0.,1.);

}