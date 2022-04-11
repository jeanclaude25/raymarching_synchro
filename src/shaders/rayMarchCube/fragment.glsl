precision lowp float;
#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST .01

#define S smoothstep
#define T uTime

        uniform float uSmooth1;
        uniform float uSmooth2;
        uniform float uTime;

        uniform float uIOR;

        uniform vec3 uCamLookAt; //camera lookAt
        uniform float uCameraAngle; //Camera Angle in radians

        uniform vec3 uLightPosition;

        uniform vec3 uObjectPosition; //Object position
        uniform float uObjectScale; //Object scale
        //rotation ??

        uniform sampler2D tDiffuse; //Old rendering passes
        uniform sampler2D uEnvironment;

        uniform vec2 uResolution; //Screen sizes in pixels

        varying vec2 vUv;

        //CAMERA
        mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
            // target.xz -= uCamLookAt.xz;
            // target.y += uCamLookAt.y;
            vec3 rr = vec3(sin(roll), cos(roll), 0.0);
            vec3 ww = normalize(target - origin);
            vec3 uu = normalize(cross(ww, rr));
            vec3 vv = normalize(cross(uu, ww));

            return mat3(uu, vv, ww);
            }
        vec3 getRay(mat3 camMat, vec2 screenPos, float lensLength) {
            return normalize(camMat * vec3(screenPos, lensLength));
            }

        vec3 getRay(vec3 origin, vec3 target, vec2 screenPos, float lensLength) {
            mat3 camMat = calcLookAtMatrix(origin, target, 0.0);
            return getRay(camMat, screenPos, lensLength);
            }
        vec2 squareFrame(vec2 screenSize) {
            vec2 position = 2.0 * (gl_FragCoord.xy / screenSize.xy) - 1.0;
            position.x *= screenSize.x / screenSize.y;
            return position;
            }

        vec2 squareFrame(vec2 screenSize, vec2 coord) {
            vec2 position = 2.0 * (coord.xy / screenSize.xy) - 1.0;
            position.x *= screenSize.x / screenSize.y;
            return position;
            }
        void orbitCamera(
            in float camAngle,
            in float camHeight,
            in float camDistance,
            in vec2 screenResolution,
            out vec3 rayOrigin,
            out vec3 rayDirection
            ) {
        vec2 screenPos = squareFrame(screenResolution);
        vec3 rayTarget = vec3(0.0);

            rayOrigin = vec3(
                camDistance * sin(camAngle),
                camHeight,
                camDistance * cos(camAngle)
            );

            rayDirection = getRay(rayOrigin, rayTarget, screenPos, 2.0);
            }

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
            //camera pan
            // p.xz -= uCamLookAt.xz;
            // p.y += uCamLookAt.y;

            // p.xz -= cameraPosition.xz;
            // p.y += cameraPosition.y;

            //Object position
            p.xz += uObjectPosition.xz;
            p.y += -uObjectPosition.y;
            
            
            float boxe = box(p, vec3(0), vec3(uObjectScale),0.);
            float s1 = sphere(p, vec3(0), uObjectScale + 0.2);
            p.x += sin(uTime);
            p.z += cos(uTime);
            float s = sphere(p, vec3(0), uObjectScale);
            
            
            float sortie = uniteSmooth(uniteSmooth(s,boxe,uSmooth2),s1,uSmooth1);
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
            vec3 lightPosition = normalize(uLightPosition-p); //LightPosition
            vec3 n = GetNormal(p);

            float dif = dot(n, lightPosition);

            return dif ;

        }

		void main() {
            vec4 previousRender = texture2D(tDiffuse, vUv);

            vec3 col = previousRender.xyz; //Background color

            vec2 uv = ((vUv - .5) * uResolution) / uResolution.y;

            //camera
            vec3 ro, rd;
            float cameraAngle = uCameraAngle; // camera's rotation around the origin in radians
            float cameraHeight = cameraPosition.y; //camera's height relative to the origin.
            float cameraDistance = sqrt((cameraPosition.z * cameraPosition.z)+ (cameraPosition.x * cameraPosition.x));//uCameraDistance; //the distance the camera is placed from the origin
            orbitCamera(cameraAngle, cameraHeight, cameraDistance, uResolution.xy, ro, rd);

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