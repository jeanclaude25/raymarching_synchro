precision lowp float;
#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST .01
#define pi 3.141593
#define S smoothstep
#define T uTime

        uniform float uSmooth1, uSmooth2, uTime, uIOR;

        uniform vec3 uCamLookAt; //camera lookAt
        uniform float uCameraAngle, uFov;

        uniform vec3 uLightPosition;

        uniform vec3 uObjectPosition, uObjectRotation; //Object location and rotation
        uniform float uObjectScale; //Object scale

        uniform sampler2D tDiffuse; //Old rendering passes
        //uniform sampler2D uEnvironment;

        uniform vec2 uResolution; //Screen sizes in pixels

        varying vec2 vUv;


        //ROTATION
        mat2 Rot(float a){
            float s=sin(a), c=cos(a);
            return mat2(c, -s, s, c);
        }

        //BASIC SHAPES
        float sphere( vec3 pos, vec3 center, float radius )
        {
            return length( pos - center ) - radius;
        }
 
        float box( vec3 pos, vec3 center, vec3 size, float corner )
        {
            return length( max( abs( pos-center )-size, 0.0 ) )-corner;
        }

        // BOOLEAN OPERATOR
        float unite( float a, float b){return min(a, b);}
        float uniteSmooth( float a, float b, float k){
                float h = clamp(.5+.5*(b-a)/k,0.,1.);
                return mix(b,a,h)-k*h*(1.-h);}
        float subtract( float a, float b ){ return max(-a, b); }
        float intersect( float a, float b ){ return max(a, b); }

        float GetDist(vec3 p){

            //Object position
            p.xyz += -uObjectPosition.xyz;
            p.yz *= Rot(uObjectRotation.x);
            p.xy *= Rot(-uObjectRotation.z);
            p.xz *= Rot(uObjectRotation.y);

            float boxe = box(p, vec3(0), vec3(uObjectScale),0.),
            s1 = sphere(p, vec3(0), uObjectScale + 0.2);
            p.x += sin(uTime);
            p.z += cos(uTime);
            float s = sphere(p, vec3(0), uObjectScale),
            sortie = uniteSmooth(uniteSmooth(s,boxe,uSmooth2),s1,uSmooth1);
            return sortie;
        }

        float RayMarch (vec3 ro, vec3 rd, float side){
            float dO = 0.;
            for(int i=0; i<MAX_STEPS; i++){
                vec3 p = ro+dO*rd;
                float dS = GetDist(p)*side;
                dO += dS;
                if(abs(dS)<SURFACE_DIST || dO>MAX_DIST) break;

            }
            return dO;
        }

        vec3 GetNormal(vec3 p) {
            float d = GetDist(p);
            vec2 e = vec2(.01,0);

            vec3 n = d - vec3(
                GetDist(p-e.xyy),
                GetDist(p-e.yxy),
                GetDist(p-e.yyx));

            return normalize(n);
        }

        float GetLight(vec3 p){
            vec3 lightPosition = normalize(uLightPosition-p), //LightPosition
            n = GetNormal(p);

            float dif = clamp(dot(n, lightPosition),0.,1.),
            d = RayMarch(p + n * SURFACE_DIST * 2.5, normalize(uLightPosition), 1.0),//shadow
            shadowIntensity = 1.;
            if(d<length(lightPosition-p)) dif *= clamp(d + (1.-shadowIntensity), 0., 1.) ;
            return dif ;

        }
// From https://www.shadertoy.com/view/lsSXzD, modified
vec3 GetCameraRayDir(vec2 vWindow, vec3 ro, vec3 lookAt, float fov)
{
	vec3 vForward = normalize(lookAt-ro),
	vRight = normalize(cross(vec3(0.0, 1.0, 0.0), vForward)),
	vUp = normalize(cross(vForward, vRight)),
	vDir = normalize(vWindow.x * vRight + vWindow.y * vUp + vForward * fov);

	return vDir;
}

		void main() {
            vec4 previousRender = texture2D(tDiffuse, vUv);

            vec3 col = previousRender.xyz; //Background color

            vec2 uv = ((vUv - .5) * uResolution) / uResolution.y;
            uv.x *= -0.89;
            uv.y *= 0.89;

            //camera
            vec3 ro = cameraPosition; 
            //linear (-.015*uFov)+1.887
            //exp 2.888*exp(-.02*uFov)
            //poly -3e(-6uFov^3) -.094uFov + 3.739
            //puiss 89.16*pow(uFov,-1.18)

            vec3 rd = GetCameraRayDir(uv, ro, uCamLookAt, 89.16*pow(uFov,-1.18) );

            float dOut = RayMarch(ro, rd, 1.); //Outside of object
            vec3 n = vec3(0);
            if(dOut<MAX_DIST){
                vec3 p = ro + rd * dOut; //3d hit position
                //setup materials
                //
                //
                vec3 ambientLight = vec3(.8,.75,.75);
                float dif = clamp(GetLight(p), 0., 1.);
                col = vec3(dif);
                col = mix(ambientLight, col, 0.8);
            }
            col = pow(col, vec3(.4545)); //gamma correction
            

			gl_FragColor = vec4(col, 1.);


		}