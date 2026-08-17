import * as THREE from 'three';

export interface HeroScene {
  dispose: () => void;
}

/* 3D simplex noise (GLSL) — used for organic vertex displacement. */
const noiseGLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export function createHeroScene(canvas: HTMLCanvasElement): HeroScene {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x08080a, 0.055);

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  // ---- Noise-displaced icosahedron core ----
  const detail = isMobile ? 3 : 5;
  const coreGeo = new THREE.IcosahedronGeometry(2, detail);

  const coreMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: isMobile ? 0.28 : 0.34 },
      uFreq: { value: 1.1 },
      uColorA: { value: new THREE.Color(0x5b5bf5) },
      uColorB: { value: new THREE.Color(0x8b7cf6) },
    },
    vertexShader: `
      ${noiseGLSL}
      uniform float uTime;
      uniform float uAmp;
      uniform float uFreq;
      varying float vDisp;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        float n = snoise(position * uFreq + vec3(uTime * 0.18));
        float n2 = snoise(position * (uFreq * 2.1) - vec3(uTime * 0.12));
        float disp = (n * 0.7 + n2 * 0.3) * uAmp;
        vec3 newPos = position + normal * disp;
        vDisp = disp;
        vNormal = normalize(normalMatrix * normal);
        vPos = newPos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vDisp;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        float t = clamp(vDisp * 2.4 + 0.5, 0.0, 1.0);
        vec3 col = mix(uColorA, uColorB, t);
        float fres = pow(1.0 - max(dot(vNormal, vec3(0.0,0.0,1.0)), 0.0), 2.0);
        col += fres * 0.35;
        float alpha = 0.22 + fres * 0.5;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  // Wireframe overlay
  const wireGeo = new THREE.IcosahedronGeometry(2.02, isMobile ? 1 : 2);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x9d8ff8,
    transparent: true,
    opacity: 0.12,
  });
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(wireGeo), wireMat);
  scene.add(wire);

  // ---- Particle cloud (two layers) ----
  const particleCount = isMobile ? 700 : 1800;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);
  const cA = new THREE.Color(0x5b5bf5);
  const cB = new THREE.Color(0x9d8ff8);
  for (let i = 0; i < particleCount; i++) {
    const r = 3.0 + Math.random() * 6.0;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = Math.random() * 0.6 + 0.4;
    const c = cA.clone().lerp(cB, Math.random());
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2) },
    },
    vertexShader: `
      attribute float aSize;
      uniform float uTime;
      uniform float uPixelRatio;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec3 p = position;
        p.y += sin(uTime * 0.4 + position.x * 0.5) * 0.12;
        p.x += cos(uTime * 0.3 + position.z * 0.4) * 0.12;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * 2.4 * uPixelRatio * (8.0 / -mv.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, a * 0.8);
      }
    `,
    vertexColors: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ---- Soft bloom plane ----
  const bloomGeo = new THREE.PlaneGeometry(16, 16);
  const bloomMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vec2 c = vUv - 0.5;
        float d = length(c);
        float glow = smoothstep(0.5, 0.0, d);
        glow = pow(glow, 2.4);
        vec3 col = mix(vec3(0.36, 0.36, 0.96), vec3(0.62, 0.56, 0.97), vUv.x);
        float pulse = 0.82 + 0.18 * sin(uTime * 0.5);
        gl_FragColor = vec4(col * glow * pulse, glow * 0.42);
      }
    `,
  });
  const bloom = new THREE.Mesh(bloomGeo, bloomMat);
  bloom.position.z = -3.5;
  scene.add(bloom);

  // ---- Interaction ----
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const pr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    pMat.uniforms.uPixelRatio.value = pr;
  };
  window.addEventListener('resize', onResize);

  // ---- Animation loop ----
  let raf = 0;
  let running = true;
  const clock = new THREE.Clock();

  const animate = () => {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reduced) {
      core.rotation.y = t * 0.14;
      core.rotation.x = Math.sin(t * 0.08) * 0.2;
      wire.rotation.copy(core.rotation);
      particles.rotation.y = t * 0.025;
      particles.rotation.x = Math.sin(t * 0.1) * 0.12;

      current.x += (target.x - current.x) * 0.035;
      current.y += (target.y - current.y) * 0.035;
      camera.position.x = current.x * 0.8;
      camera.position.y = -current.y * 0.5;
      camera.lookAt(0, 0, 0);

      coreMat.uniforms.uTime.value = t;
      pMat.uniforms.uTime.value = t;
      bloomMat.uniforms.uTime.value = t;
    }

    renderer.render(scene, camera);
  };

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      clock.getDelta();
      animate();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  animate();

  return {
    dispose: () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      coreGeo.dispose();
      wireGeo.dispose();
      pGeo.dispose();
      bloomGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      pMat.dispose();
      bloomMat.dispose();
      renderer.dispose();
    },
  };
}
