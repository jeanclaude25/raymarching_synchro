precision lowp float;
#define MAX_STEPS 200
#define MAX_DIST 100.
#define SURFACE_DIST .001

#define S smoothstep
#define T uTime

        uniform float uIOR;

        uniform vec3 uCamPos; //camera position
        uniform vec3 uCamLookAt; //camera lookAt

        uniform vec3 uLightPosition;

        uniform vec3 uObjectPosition; //Object position
        uniform float uObjectScale; //Object scale
        //rotation ??

        uniform sampler2D tDiffuse; //Old rendering passes
        uniform sampler2D uEnvironment;

        uniform vec2 uResolution; //Screen sizes in pixels

        varying vec2 vUv;

        mat2 Rot(float a){
            float s=sin(a), c=cos(a);
            return mat2(c, -s, s, c);
        }

        float sdBox(vec3 p, vec3 s){
            p = abs(p) - s ;
            return length(max(p, 0.)) + min(max(p.x, max(p.y, p.z)), 0.);
        }

        float GetDist(vec3 p){
            vec4 s = vec4(uObjectPosition.x, uObjectPosition.z, uObjectPosition.y, uObjectScale);//define the sphere position x,y,z and scale
            float sphereDist = length(p-s.xyz)-s.w;
            float planeDist = p.y;
            float box = sdBox(p, vec3(uObjectScale));

            float d = min(sphereDist, planeDist);
            // return d; //a sphere on a floor
            return box;
            // return sphere; //You can try with the sphere too
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
            vec3 lightPos = uLightPosition; //LightPosition
            vec3 l = normalize(lightPos-p);
            vec3 n = GetNormal(p);

            float dif = dot(n, l);

            return dif ;

        }

		void main() {
            vec4 previousRender = texture2D(tDiffuse, vUv);

            vec3 col = previousRender.xyz; //Background color

            vec2 uv = ((vUv - .5) * uResolution) / uResolution.y;

            
            //camera
            vec3 ro = normalize(uCamPos.xyz); //camera space position
            // vec3 rd = normalize(uCamLookAt); //camera view vector
            vec3 rd = normalize(vec3(
                (uCamLookAt.x * 0.05) -uv.x, 
                (uCamLookAt.y * 0.05) +uv.y, 
                .75));

            float dOut = RayMarch(ro, rd, 1.); //Outside of object

            if(dOut<MAX_DIST){
                vec3 p = ro + rd * dOut; //3d hit position
                vec3 n = GetNormal(p); //orientation normals of surface 
                
                float dif = dot(n, normalize(vec3(1,2,3)))* .5 + .5;
                col = vec3(dif);
            }
            col = pow(col, vec3(.4545)); //gamma correction


			gl_FragColor = vec4(col, 1.);


		}