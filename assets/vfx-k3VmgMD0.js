import{Dt as e,En as t,Et as n,_ as r,dt as i,kn as a,nt as o,q as s,s as c,tt as l,v as u,w as d,wt as f}from"./materials-Brbr6tVT.js";var p=`
float vHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vNoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(vHash(i), vHash(i + vec2(1, 0)), f.x), mix(vHash(i + vec2(0, 1)), vHash(i + vec2(1, 1)), f.x), f.y);
}
float vFbm(vec2 p) { float a = 0.5; float s = 0.0; for (int i = 0; i < 4; i++) { s += a * vNoise(p); p = p * 2.02 + vec2(11.7, 5.3); a *= 0.5; } return s; }
`;function m(a,o={}){let{width:l=.9,height:d=1.4,seed:m=1,heat:h=0,embers:g=12}=o,_=new s,v=new t({uniforms:{uTime:c,uRoomLit:a.kit.lit,uSeed:{value:m},uHeat:{value:h},uSize:{value:[l,d]}},vertexShader:`
      uniform vec2 uSize;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        // Upright billboard: the quad turns about its vertical axis to face the camera.
        vec4 origin = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec3 up = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        vec3 right = normalize(cross(up, vec3(0.0, 0.0, 1.0)));
        float sy = length((modelMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        vec3 p = origin.xyz + right * (uv.x - 0.5) * uSize.x * sy + up * uv.y * uSize.y * sy;
        gl_Position = projectionMatrix * vec4(p, 1.0);
      }`,fragmentShader:`
      uniform float uTime; uniform float uRoomLit; uniform float uSeed; uniform float uHeat;
      varying vec2 vUv;
      ${p}
      void main() {
        float h = vUv.y;
        float x0 = (vUv.x - 0.5) * 2.0;
        // Buoyancy: the noise's height coordinate is logarithmic, so features accelerate upwards.
        float rise = 0.3 * log(1.0 + h / 0.3) * 3.4 - uTime * 1.35;
        float warp = vFbm(vec2(x0 * 1.5 + uSeed * 7.1, rise * 0.8)) - 0.5;
        float x = x0 + warp * 0.5 * smoothstep(0.0, 0.7, h) + sin(uTime * 2.3 + h * 5.0 + uSeed) * 0.05 * h;
        float profile = mix(0.6, 0.0, pow(h, 0.7)) * smoothstep(0.0, 0.06, h);
        float n = vFbm(vec2(x * 2.6 + uSeed * 3.3, rise * 2.0));
        float licks = vFbm(vec2(x * 6.0 - uSeed, rise * 3.4));
        float field = profile - abs(x) + (n - 0.5) * 0.4 * (0.25 + h) + (licks - 0.5) * 0.12;
        float density = smoothstep(0.0, 0.07, field);
        float temp = clamp(field * 2.6 + 0.2, 0.0, 1.0) * (1.0 - h * 0.8) + 0.1 * n + uHeat * 0.15;
        temp *= smoothstep(-0.02, 0.08, h);
        vec3 col = mix(vec3(0.5, 0.03, 0.0), vec3(1.0, 0.3, 0.02), smoothstep(0.04, 0.3, temp));
        col = mix(col, vec3(1.0, 0.7, 0.14), smoothstep(0.28, 0.56, temp));
        col = mix(col, vec3(1.0, 0.96, 0.84), smoothstep(0.56, 0.86, temp));
        float alpha = density * smoothstep(0.0, 0.16, temp + 0.06);
        gl_FragColor = vec4(col * (1.1 + temp * 2.6) * alpha * uRoomLit, alpha * 0.92);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,side:2}),y=new i(a.track(new f(1,1)),v);y.frustumCulled=!1,y.renderOrder=4,_.add(y),a.cleanups.push(()=>v.dispose());let b=new Float32Array(g*3),x=a.track(new u);x.setAttribute(`position`,new r(b,3));let S=new n(x,a.kit.track(new e({color:16753210,size:l*.07,transparent:!0,opacity:.9,depthWrite:!1,blending:2})));return S.frustumCulled=!1,g&&_.add(S),{mesh:y,group:_,update(e){for(let t=0;t<g;t++){let n=(e*.5+t/g+m)%1,r=t*2.4+e*.7,i=l*(.05+n*.28);b[t*3]=Math.cos(r)*i,b[t*3+1]=d*(.45+n*1.1),b[t*3+2]=Math.sin(r)*i}x.getAttribute(`position`).needsUpdate=!0}}}function h(e,n=.3,f=10116336,m=7){let h=new s,g=new d(f),_=new t({uniforms:{uTime:c,uRoomLit:e.kit.lit,uColor:{value:g}},vertexShader:`
      varying vec3 vNormal; varying vec3 vView; varying vec3 vPos;
      void main() {
        vPos = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uTime; uniform float uRoomLit; uniform vec3 uColor;
      varying vec3 vNormal; varying vec3 vView; varying vec3 vPos;
      ${p}
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
        // Billows that churn in place: two noise layers turning against each other.
        vec3 d = normalize(vPos);
        vec2 a = vec2(atan(d.z, d.x) * 1.6, d.y * 2.4);
        float cloud = vFbm(a * 1.7 + vec2(uTime * 0.35, -uTime * 0.2)) * vFbm(a * 3.1 - vec2(uTime * 0.27, uTime * 0.31) + 4.0);
        float body = smoothstep(0.08, 0.34, cloud) * (0.35 + 0.65 * rim);
        float hair = smoothstep(0.82, 0.98, rim);
        vec3 col = uColor * (body * 1.6 + pow(rim, 3.0) * 0.9) + vec3(1.0, 0.94, 1.0) * hair * 1.8;
        float alpha = clamp(body * 0.75 + pow(rim, 2.5) * 0.5 + hair, 0.0, 1.0);
        gl_FragColor = vec4(col * alpha * uRoomLit, alpha * 0.85);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,transparent:!0,premultipliedAlpha:!0,depthWrite:!1});e.cleanups.push(()=>_.dispose());let v=new i(e.track(new a(n,32,20)),_);v.renderOrder=3;let y=new i(e.track(new a(n*.26,16,12)),e.kit.basic({color:16446207})),b=new i(e.track(new a(n*.52,16,12)),e.kit.basic({color:f,transparent:!0,opacity:.35,depthWrite:!1,blending:2}));h.add(v,b,y);let x=e.kit.track(new o({color:15326463,transparent:!0,opacity:.9,blending:2,depthWrite:!1})),S=Array.from({length:m},()=>{let t=e.track(new u);t.setAttribute(`position`,new r(new Float32Array(21),3));let n=new l(t,x);return n.frustumCulled=!1,h.add(n),t}),C=-1,w=625341585,T=()=>(w^=w<<13,w^=w>>>17,w^=w<<5,(w>>>0)/4294967296);return{group:h,update(e){let t=Math.sin(e*3.2);y.scale.setScalar(1+t*.12),b.scale.setScalar(1+t*.2);let r=Math.floor(e*12);if(r!==C){C=r;for(let e of S){let t=e.getAttribute(`position`),r=T()*Math.PI*2,i=Math.acos(T()*2-1),a=Math.sin(i)*Math.cos(r),o=Math.cos(i),s=Math.sin(i)*Math.sin(r);for(let e=0;e<7;e++){let r=e/6,i=Math.sin(Math.PI*r)*n*.22;t.setXYZ(e,a*n*.94*r+(T()-.5)*i,o*n*.94*r+(T()-.5)*i,s*n*.94*r+(T()-.5)*i)}t.needsUpdate=!0}}}}}export{h as n,m as t};