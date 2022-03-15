// float4 frag (v2f_img i) : COLOR
// {
//     // Cell centre
//     fixed2 uv = round(i.uv * _Pixels) / _Pixels;
//     // Neighbour cells
//     half s = 1 / _Pixels;
//     float cl = tex2D(_MainTex, uv + fixed2(-s, 0)).a;    // Centre Left
//     float tc = tex2D(_MainTex, uv + fixed2(-0, -s)).a;    // Top Centre
//     float cc = tex2D(_MainTex, uv + fixed2(0, 0)).a;    // Centre Centre
//     float bc = tex2D(_MainTex, uv + fixed2(0, +s)).a;    // Bottom Centre
//     float cr = tex2D(_MainTex, uv + fixed2(+s, 0)).a;    // Centre Right
//     // Diffusion step
//     float factor = 
//         _Dissipation *
//         (
//             0.25 * (cl + tc + bc + cr)
//             - cc
//         );
    
//     if (factor >= -_Minimum && factor < 0.0)  factor = -_Minimum;
    
//     cc += factor;
    
//     return float4(1, 1, 1, cc);    
// }

void main()
{
    gl_FragColor = vec4(1.,0.,0., 1.0);
}