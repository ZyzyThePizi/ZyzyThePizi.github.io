import{i as e,n as t,t as n}from"./dungeon-DCZET52P.js";import{$ as r,En as i,Jn as a,Mn as o,Z as s,_ as c,b as l,bt as u,dt as d,jn as f,q as p,qn as m,t as h,ut as g,v as _,w as v}from"./materials-Brbr6tVT.js";import{o as y}from"./world-FsRg1r4t.js";var b=e=>{let t=Math.min(Math.max(e,0),1);return t*t*(3-2*t)},x=(e,t,n)=>b(e/t)*b((1-e)/n);function S(){let e=new r([[0,0],[.15,.015],[.2,.07],[.17,.14],[.11,.24],[.095,.5],[.11,.76],[.17,.87],[.19,.94],[.13,.99],[0,1]].map(([e,t])=>new m(e,t)),9),t=new m(40,200),n=new i({uniforms:{uBone:{value:new v(10130563)},uFogColor:{value:new v(h.bg)},uFogRange:{value:t}},vertexShader:`
      varying vec3 vNormal; varying vec3 vWorld;
      void main() {
        vec4 p = vec4(position, 1.0);
        vec3 n = normal;
        #ifdef USE_INSTANCING
        p = instanceMatrix * p;
        n = mat3(instanceMatrix) * n;
        #endif
        vec4 w = modelMatrix * p;
        vNormal = normalize(mat3(modelMatrix) * n);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`
      uniform vec3 uBone; uniform vec3 uFogColor; uniform vec2 uFogRange;
      varying vec3 vNormal; varying vec3 vWorld;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 v = normalize(cameraPosition - vWorld);
        float key = max(dot(n, normalize(vec3(-0.4, 0.85, 0.5))), 0.0);
        float rim = pow(1.0 - abs(dot(n, v)), 2.5);
        vec3 col = uBone * (0.22 + 0.7 * key) + vec3(0.12, 0.14, 0.13) * rim;
        float haze = smoothstep(uFogRange.x, uFogRange.y, length(cameraPosition - vWorld));
        gl_FragColor = vec4(mix(col, uFogColor, haze), 1.0);
        #include <colorspace_fragment>
      }`}),a=new p,o=new p;a.add(o);let c=[],l=(e,t,n)=>{let r=new u;return e.add(r),c.push({node:r,length:t,thick:n}),r},d=(e,t,n,r)=>{let i=new u;return i.position.set(t,n,r),e.add(i),i};for(let e of[-.24,.26]){let t=d(o,e,-.1,0);t.rotation.z=Math.PI+(e<0?.03:-.03),l(t,7.5,e<0?.95:.8)}for(let[e,t,n]of[[-.42,0,.5],[-.14,-.04,.55],[.16,-.02,.52],[.42,.02,.46],[-.26,.2,.44],[.06,.22,.48],[.34,.22,.42]])l(d(o,e,t,0),.3,n*1.9);let f=[];for(let e of[{x:-.5,splay:.17,lengths:[1.42,.95,.62,.5],thick:.62},{x:-.17,splay:.05,lengths:[1.5,1.06,.7,.53],thick:.64},{x:.17,splay:-.07,lengths:[1.4,.98,.65,.5],thick:.6},{x:.48,splay:-.2,lengths:[1.25,.76,.48,.42],thick:.54}]){let t=d(o,e.x,.38,0);t.rotation.z=e.splay,l(t,e.lengths[0],e.thick);let n=d(t,0,e.lengths[0],0);l(n,e.lengths[1],e.thick*.92);let r=d(n,0,e.lengths[1],0);l(r,e.lengths[2],e.thick*.84);let i=d(r,0,e.lengths[2],0);l(i,e.lengths[3],e.thick*.72),f.push({knuckle:n,middle:r,tip:i,grip:[1.3,.78,.55]})}let _=d(o,-.62,.16,.08);_.rotation.z=.85,l(_,.86,.7);let y=d(_,0,.86,0);l(y,.72,.64);let x=d(y,0,.72,0);l(x,.56,.56),f.push({knuckle:y,middle:null,tip:x,grip:[.5,0,.6]});let S=new s(e,n,c.length);S.frustumCulled=!1,S.visible=!1;let C=new g,w=new g;return{mesh:S,root:a,geometry:e,material:n,fogRange:t,pose(e,t){let n=b(e/.22)*(1-b((e-.8)/.2)),r=b((e-.2)/.14),i=b((e-.33)/.1)*(1-b((e-.76)/.08)),s=b((e-.46)/.04)*(1-b((e-.72)/.04));o.position.y=-7+n*8.6,o.rotation.x=-.3+r*.42+Math.sin(t*9)*.006*i,o.rotation.z=Math.sin(t*.8)*.03*(1-i),f.forEach((e,n)=>{let r=!e.middle,a=r?i:b((i-(3-n)*.08)/.76),o=r?0:Math.max(0,Math.sin(t*7.5-n*1.25))**3*s,c=.16+Math.sin(t*1.3+n)*.05;e.knuckle.rotation.x=c*(1-a)+e.grip[0]*a-o*.42,e.middle&&(e.middle.rotation.x=c*1.4*(1-a)+e.grip[1]*a-o*.1),e.tip.rotation.x=c*(1-a)+e.grip[2]*a}),a.updateMatrixWorld(!0),c.forEach((e,t)=>{C.makeScale(e.thick,e.length,e.thick),S.setMatrixAt(t,w.multiplyMatrices(e.node.matrixWorld,C))}),S.instanceMatrix.needsUpdate=!0}}}var C=.13;function w(){let e=[];for(let t=0;t<28;t++)e.push(C*(t/28)**1.6);for(let t=0;t<92;t++)e.push(C+t/91*.87);let r=[],a=[],o=[];for(let t of e)for(let e=0;e<12;e++){let n=e/12*Math.PI*2;r.push(t,Math.cos(n),Math.sin(n)),a.push(0)}for(let t=0;t<e.length-1;t++)for(let e=0;e<12;e++){let n=t*12+e,r=t*12+(e+1)%12;o.push(n,r,n+12,r,r+12,n+12)}for(let e=C*.7;e<.93;e+=e<C*1.5?.011:.017){let t=r.length/3,n=e<C*1.5?1.7:1;r.push(e-.004,1,0,e+.007,1,0,e+.008+.004*n,1,0),a.push(0,0,n),o.push(t,t+1,t+2)}let s=new _;s.setAttribute(`position`,new c(new Float32Array(r.length),3)),s.setAttribute(`aRing`,new c(new Float32Array(r),3)),s.setAttribute(`aFin`,new c(new Float32Array(a),1)),s.setIndex(o);let l={uTime:{value:0},uHead:{value:0},uSpan:{value:.95},uRise:{value:-9},uRadii:{value:new m(t/2+13,n/2+12)},uFogColor:{value:new v(h.bg)},uFogRange:{value:new m(40,200)}},u=new i({uniforms:l,defines:{HEAD:C.toFixed(3)},side:2,vertexShader:`
      attribute vec3 aRing;
      attribute float aFin;
      uniform float uTime; uniform float uHead; uniform float uSpan; uniform float uRise; uniform vec2 uRadii;
      varying vec3 vNormal; varying vec3 vWorld; varying vec3 vBody;
      vec3 spine(float s) {
        float a = uHead - s * uSpan;
        // Humps travel down the body as it swims; the head is carried higher and steadier.
        float lead = 1.0 - smoothstep(0.0, 0.26, s);
        float y = uRise + (4.1 - 2.5 * lead) * sin(s * 20.0 - uTime * 0.7) + 0.6 * (1.0 - lead) * sin(s * 47.0 + uTime * 1.1) + 2.0 * lead;
        return vec3(cos(a) * uRadii.x, y, sin(a) * uRadii.y);
      }
      void main() {
        float s = aRing.x;
        vec3 c = spine(s);
        vec3 t = normalize(spine(s + 0.004) - c);
        vec3 b = normalize(cross(vec3(0.0, 1.0, 0.0), t));
        vec3 n = cross(t, b);
        // The head: a blunt snout that widens to the hinge of the jaw, then the neck.
        float h = clamp(s / HEAD, 0.0, 1.0);
        float snout = sqrt(clamp(h / 0.16, 0.0, 1.0));
        float wide = snout * mix(0.5, 1.24, smoothstep(0.0, 0.72, h)) * mix(1.0, 0.8, smoothstep(0.72, 1.0, h));
        float tall = snout * mix(0.3, 0.76, smoothstep(0.0, 0.66, h)) * mix(1.0, 1.18, smoothstep(0.66, 1.0, h));
        float neck = smoothstep(HEAD, HEAD + 0.06, s);
        wide = mix(wide, 1.0, neck);
        tall = mix(tall, 1.0, neck);
        // Flat under the jaw.
        tall *= aRing.y < 0.0 ? mix(0.6, 1.0, neck) : 1.0;
        float girth = 1.55 * pow(clamp((1.0 - s) / 0.36, 0.0, 1.0), 0.7);
        vec3 p = c + (n * aRing.y * tall + b * aRing.z * wide) * girth + n * aFin * girth * (0.75 + 0.5 * sin(s * 190.0));
        vNormal = aFin > 0.0 ? b : n * aRing.y * max(wide, 0.05) + b * aRing.z * max(tall, 0.05);
        vWorld = p;
        vBody = aRing;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,fragmentShader:`
      uniform vec3 uFogColor; uniform vec2 uFogRange;
      varying vec3 vNormal; varying vec3 vWorld; varying vec3 vBody;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 v = normalize(cameraPosition - vWorld);
        float rim = pow(1.0 - abs(dot(n, v)), 2.2);
        // Wet plates: narrow bands along the body that catch the light from above.
        float h = vBody.x / HEAD;
        // The skull is smooth; the plates begin at the neck.
        float plate = mix(0.5, 0.5 + 0.5 * sin(vBody.x * 420.0), smoothstep(0.75, 1.15, h));
        float top = max(n.y, 0.0);
        vec3 col = vec3(0.012, 0.016, 0.018) + vec3(0.16, 0.2, 0.21) * rim * 0.34 + vec3(0.07, 0.085, 0.085) * top * (0.3 + 0.7 * plate);
        float glow = 0.0;
        if (h < 1.0) {
          // The line of the mouth, and the teeth that hang over it, each to a point.
          float along = smoothstep(0.06, 0.12, h) * (1.0 - smoothstep(0.58, 0.66, h));
          float down = (0.03 - vBody.y) / 0.23;
          float tooth = step(abs(fract(h * 24.0) - 0.5) * 2.0, 0.92 - down) * step(0.0, down);
          col *= 1.0 - (1.0 - smoothstep(0.0, 0.3, abs(vBody.y + 0.14))) * along * 0.75;
          col = mix(col, vec3(0.21, 0.22, 0.19), tooth * along * 0.9);
          // A slit eye either side, deep in its socket.
          vec2 e = vec2((h - 0.5) / 0.045, (vBody.y - 0.52) / 0.17);
          float side = step(0.3, abs(vBody.z));
          col *= 1.0 - (1.0 - smoothstep(0.9, 1.9, length(e))) * side * 0.8;
          float eye = (1.0 - smoothstep(0.55, 1.0, length(e))) * side;
          col = mix(col, vec3(0.66, 0.84, 0.5) * smoothstep(0.1, 0.34, abs(e.x)) * (1.25 - 0.5 * length(e)), eye);
          glow = eye;
        }
        float haze = smoothstep(uFogRange.x, uFogRange.y, length(cameraPosition - vWorld));
        // The eyes carry further through the fog than the body does.
        gl_FragColor = vec4(mix(col, uFogColor, haze * (1.0 - 0.45 * glow)), 1.0);
        #include <colorspace_fragment>
      }`}),f=new d(s,u);return f.frustumCulled=!1,f.visible=!1,{mesh:f,geometry:s,material:u,uniforms:l}}function T(){let e=1370193469,t=()=>(e^=e<<13,e^=e>>>17,e^=e<<5,(e>>>0)/4294967296),n=[],r=[],o=[],s=[];for(let e=0;e<6;e++){let i=[e/6*Math.PI*2+(t()-.5)*.7,t()*6.283,6.4+t()*4.2,.18+t()*.5],a=[t()*.15,.5+t()*.24,1+t()*1.2],c=e*46*8;for(let e=0;e<46;e++)for(let t=0;t<8;t++){let s=t/8*Math.PI*2;n.push(e/45,Math.cos(s),Math.sin(s)),r.push(...i),o.push(...a)}for(let e=0;e<45;e++)for(let t=0;t<8;t++){let n=c+e*8+t,r=c+e*8+(t+1)%8;s.push(n,n+8,r,r,n+8,r+8)}}let l=new _;l.setAttribute(`position`,new c(new Float32Array(n.length),3)),l.setAttribute(`aRing`,new c(new Float32Array(n),3)),l.setAttribute(`aArm`,new c(new Float32Array(r),4)),l.setAttribute(`aMore`,new c(new Float32Array(o),3)),l.setIndex(s);let u={uTime:{value:0},uK:{value:0},uAt:{value:new a(0,0,1)},uFogColor:{value:new v(h.bg)},uFogRange:{value:new m(40,200)}},f=new i({uniforms:u,side:2,vertexShader:`
      attribute vec3 aRing;
      attribute vec4 aArm;
      attribute vec3 aMore;
      uniform float uTime; uniform float uK; uniform vec3 uAt;
      varying vec3 vNormal; varying vec3 vWorld; varying vec3 vBody;
      float ease(float t) { t = clamp(t, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
      // Which way the arm runs at height u (0 at the mist, 1 a whole arm up), as outward, up,
      // sideways. It leans out of the hole and sways, and the last of it hooks over.
      vec3 heading(float u, float body) {
        float bend = aArm.w * u * 1.5 + sin(u * 4.6 - uTime * 1.35 + aArm.y) * 0.44 * (0.25 + u)
          + smoothstep(0.5, 1.0, body) * (2.2 + 0.8 * sin(uTime * 0.9 + aArm.y * 2.0));
        float yaw = sin(u * 3.3 - uTime * 1.05 + aArm.y * 1.7) * 0.55 * (0.2 + u);
        return normalize(vec3(sin(bend), cos(bend), sin(yaw) * 0.7));
      }
      void main() {
        float s = aRing.x;
        float len = aArm.z;
        // Each arm comes up tip first, a little after the last, and is drawn down the same way.
        float shown = ease((uK - 0.1 - aMore.x) / 0.2) * (1.0 - ease((uK - 0.7 - aMore.x * 0.6) / 0.24));
        float u1 = s - (1.0 - shown);
        vec3 d = vec3(0.0, 1.0, 0.0);
        vec3 p = vec3(0.0, min(u1, 0.0) * len, 0.0);
        if (u1 > 0.0) {
          // The arm keeps its length however it bends: its shape is walked, not sheared.
          float du = u1 / 12.0;
          for (int i = 0; i < 12; i++) {
            float u = (float(i) + 0.5) * du;
            p += heading(u, u + 1.0 - shown) * du * len;
          }
          d = heading(u1, s);
        }
        vec3 outward = vec3(cos(aArm.x), 0.0, sin(aArm.x));
        vec3 sideways = vec3(-outward.z, 0.0, outward.x);
        vec3 t = outward * d.x + vec3(0.0, d.y, 0.0) + sideways * d.z;
        vec3 b = normalize(cross(t, sideways));
        vec3 n = cross(b, t);
        float girth = aMore.y * (0.04 + 0.96 * pow(max(1.0 - s, 0.0), 0.72)) * (1.0 + 0.05 * sin(s * 34.0 - uTime * 3.1 + aArm.y)) * step(s, 0.999);
        vec3 radial = b * aRing.y + n * aRing.z;
        vec3 local = outward * (aMore.z + p.x) + vec3(0.0, p.y, 0.0) + sideways * p.z + radial * girth;
        vec3 world = vec3(uAt.x, 0.0, uAt.y) + local * uAt.z;
        vNormal = radial;
        vWorld = world;
        vBody = aRing;
        gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
      }`,fragmentShader:`
      uniform vec3 uFogColor; uniform vec2 uFogRange;
      varying vec3 vNormal; varying vec3 vWorld; varying vec3 vBody;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 v = normalize(cameraPosition - vWorld);
        float rim = pow(1.0 - abs(dot(n, v)), 2.2);
        float top = max(n.y, 0.0);
        float plate = 0.5 + 0.5 * sin(vBody.x * 260.0);
        vec3 hide = vec3(0.012, 0.016, 0.018) + vec3(0.16, 0.2, 0.21) * rim * 0.36 + vec3(0.07, 0.085, 0.085) * top * (0.3 + 0.7 * plate);
        // The inside of the curl is pale, with two rows of cups down it.
        float belly = smoothstep(0.2, 0.7, vBody.y);
        vec3 pale = vec3(0.105, 0.11, 0.092) * (0.5 + 0.5 * top + rim * 0.9);
        float cups = 1.0 - smoothstep(0.55, 1.0, length(vec2((abs(vBody.z) - 0.45) / 0.22, (fract(vBody.x * 27.0) - 0.5) / 0.36)));
        vec3 col = mix(hide, pale * (1.0 - 0.8 * cups), belly);
        float haze = smoothstep(uFogRange.x, uFogRange.y, length(cameraPosition - vWorld));
        gl_FragColor = vec4(mix(col, uFogColor, haze), 1.0);
        #include <colorspace_fragment>
      }`}),p=new d(l,f);return p.frustumCulled=!1,p.visible=!1,{mesh:p,geometry:l,material:f,uniforms:u}}function E(){let e=document.createElement(`canvas`);e.width=192,e.height=64;let t=e.getContext(`2d`);for(let[e,n]of[[52,1],[140,-1]]){let r=t.createRadialGradient(e,32,2,e,32,31);r.addColorStop(0,`rgba(206,222,190,0.5)`),r.addColorStop(.4,`rgba(140,165,145,0.17)`),r.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=r,t.fillRect(e-32,0,64,64),t.save(),t.translate(e,32),t.rotate(n*.2);let i=t.createRadialGradient(0,0,1,0,0,22);i.addColorStop(0,`rgba(244,248,226,1)`),i.addColorStop(1,`rgba(176,198,160,0.9)`),t.fillStyle=i,t.beginPath(),t.moveTo(-22,1),t.quadraticCurveTo(0,-13,22,-1),t.quadraticCurveTo(0,10,-22,1),t.fill(),t.fillStyle=`rgba(0,0,0,0.92)`,t.beginPath(),t.ellipse(0,-1,1.5,7.5,0,0,Math.PI*2),t.fill(),t.restore()}return new l(e)}function D(t){let{level:n,rooms:r}=e(),i=new p;i.name=`haunts`;let s=[],c=(e,t)=>e>=0&&e<4&&t>=0&&t<4&&(n.cells[t*4+e]?.order??-1)>=0;for(let e of r)for(let[t,n]of[[1,0],[-1,0],[0,1],[0,-1]])if(!c(e.col+t,e.row+n))for(let r of[-1,1]){let i=t?3.4:6.6;s.push({x:e.cx+t*20/2+(t?0:r*i),z:e.cz+n*10/2+(n?0:r*i),nx:t,nz:n,room:e.index})}let l=S(),u=w(),d=T();i.add(l.root,l.mesh,u.mesh,d.mesh);let m=E(),h=[0,1].map(()=>{let e=new o({map:m,transparent:!0,opacity:0,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),t=new f(e);return t.visible=!1,t.renderOrder=30,i.add(t),{sprite:t,material:e,at:new a,size:1,delay:0}}),g=523918459,_=()=>(g^=g<<13,g^=g>>>17,g^=g<<5,(g>>>0)/4294967296),v=null,b=-1,C=null,D=0,O=1,k=1,A=(e,n)=>{let r=Math.sin(e.az),i=Math.cos(e.az);for(let a=0;a<14;a++){let a=(_()-.5)*e.dist*(e.overview>.5?.9:.6),o=e.dist*(e.overview>.5?-.25+_()*.7:.2+_()*.34),s=e.tx+i*a-r*o,c=e.tz-r*a-i*o;if([[0,0],[n,0],[-n,0],[0,n],[0,-n]].every(([e,n])=>t.isOpen(s+e,c+n)))return[s,c]}return null},j=(e,n,i)=>{let a=Math.sin(i.az),o=Math.cos(i.az);if(e===`arms`){let r=i.overview>.5?2.2+_()*.5:Math.min(Math.max(i.dist/27,.8),1.3),a=A(i,3.4*r);return!a||!t.swirl(a[0],a[1],12*r,_()>.5?2.7:-2.7,13)?!1:(d.uniforms.uAt.value.set(a[0],a[1],r),d.uniforms.uK.value=0,d.mesh.visible=!0,v={kind:e,born:n,life:11.5},!0)}if(e===`eyes`){let t=0;for(let e of h){if(e.sprite.visible=!1,t&&_()>.55)continue;let n=A(i,1.2);n&&(e.at.set(n[0],1.5+_()*1.2,n[1]),e.size=Math.max(1.1,i.dist/24)*(.85+_()*.4),e.delay=t*(.6+_()*.8),e.material.opacity=0,e.sprite.visible=!0,t++)}return t?(v={kind:e,born:n,life:6.5},!0):!1}if(e===`hand`){let c=s.filter(e=>{if(i.overview>.5)return!0;let t=r[i.focus];return t?Math.abs(r[e.room].col-t.col)+Math.abs(r[e.room].row-t.row)<=1&&e.nx*a+e.nz*o<-.3&&(e.x-t.cx)*a+(e.z-t.cz)*o<2:!1}),u=c[Math.floor(_()*c.length)];return u?(k=1.12*(1+i.overview*.7),l.root.position.set(u.x+u.nx*.62*k,0,u.z+u.nz*.62*k),l.root.rotation.y=Math.atan2(-u.nx,-u.nz),l.root.scale.setScalar(k),l.root.position.y=y+.28-3.48*k,l.mesh.visible=!0,t.swirl(l.root.position.x,l.root.position.z,6,.9,10),v={kind:e,born:n,life:10.5},!0):!1}let c=i.overview>.5?(_()>.5?1:-1)*30:26,f=i.tx-a*c+o*(_()-.5)*20,p=i.tz-o*c-a*(_()-.5)*20,m=u.uniforms.uRadii.value,g=Math.atan2(p/m.y,f/m.x);return i.overview<.5&&Math.hypot(Math.cos(g)*m.x-i.tx,Math.sin(g)*m.y-i.tz)>42?!1:(O=_()>.5?1:-1,D=g-O*.55,u.uniforms.uSpan.value=.95*O,u.mesh.visible=!0,v={kind:`leviathan`,born:n,life:17},!0)},M=()=>{l.mesh.visible=!1,u.mesh.visible=!1,d.mesh.visible=!1,h.forEach(e=>e.sprite.visible=!1),v=null};return{group:i,get busy(){return v!==null},update(e,t,n){if(b<0&&(b=e+5),!v&&(C||e>b)){let n=C?[C]:t.overview>.5?[`leviathan`,`hand`,`arms`,`eyes`,`arms`,`hand`]:[`arms`,`eyes`,`hand`,`eyes`,`arms`,`hand`,`leviathan`],r=Math.floor(_()*n.length);for(let i=0;i<n.length&&!v;i++)j(n[(r+i)%n.length],e,t);C=null,b=e+(v?7+_()*8:3)}if(!v)return;let r=(e-v.born)/v.life;if(r>=1)return b=e+6+_()*9,M();if(v.kind===`hand`)l.pose(r,e),l.fogRange.set(n.near,n.far);else if(v.kind===`arms`){let t=d.uniforms;t.uTime.value=e,t.uK.value=r,t.uFogRange.value.set(n.near,n.far)}else if(v.kind===`leviathan`){let t=u.uniforms;t.uTime.value=e,t.uHead.value=D+O*r*1.15,t.uRise.value=-9+x(r,.22,.25)*7.9,t.uFogRange.value.set(n.near,n.far)}else if(v.kind===`eyes`){let t=e-v.born;for(let e of h){if(!e.sprite.visible)continue;let n=Math.min(Math.max((t-e.delay)/(v.life-e.delay-.2),0),1),r=x(n,.12,.14)*(1-.94*Math.max(0,1-Math.abs(n-.55)/.035));e.material.opacity=x(n,.18,.2)*.9,e.sprite.position.set(e.at.x+Math.sin(t*.7)*.25,e.at.y+Math.sin(t*1.1)*.06,e.at.z),e.sprite.scale.set(e.size*3,e.size*Math.max(r,.03),1)}}},summon(e){M(),C=e},at(){if(v?.kind===`arms`)return[d.uniforms.uAt.value.x,4,d.uniforms.uAt.value.y];if(v?.kind===`hand`)return[l.root.position.x,y,l.root.position.z];if(v?.kind!==`leviathan`)return null;let e=u.uniforms;return[Math.cos(e.uHead.value)*e.uRadii.value.x,e.uRise.value+2,Math.sin(e.uHead.value)*e.uRadii.value.y]},dispose(){l.geometry.dispose(),l.material.dispose(),u.geometry.dispose(),u.material.dispose(),d.geometry.dispose(),d.material.dispose(),m.dispose(),h.forEach(e=>e.material.dispose())}}}export{D as createHaunts};