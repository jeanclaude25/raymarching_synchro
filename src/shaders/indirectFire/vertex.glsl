        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 modelViewMatrix;

        uniform float uTime;
        uniform float uSpeed;
        
        uniform float amplitude;   
        uniform float frequency;  
        uniform float mini;
        uniform float maxi;
        
        attribute vec2 uv;
        attribute vec3 position;

        varying vec2 vUv;
        varying float vColorValue;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            vColorValue = sin(frequency);
            float t = uSpeed * .1 *(-uTime*130.0);
            vColorValue += sin(frequency*2.1 + t)*4.5;
            vColorValue += sin(frequency*1.72 + t*1.121)*4.0;
            vColorValue += sin(frequency*2.221 + t*0.437)*5.0;
            vColorValue += sin(frequency*3.1122+ t*4.269)*2.5;
            vColorValue = max(mini,min(maxi,vColorValue));

            vUv = uv;

        }