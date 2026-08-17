import * as THREE from 'three';

export interface HeroScene {
  dispose: () => void;
}

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
  scene.fog = new THREE.FogExp2(0x0a0a0b, 0.06);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8);

  // ---- Icosahedron core (wireframe + faint inner solid) ----
  const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
  const coreWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(coreGeo),
    new THREE.LineBasicMaterial({
      color: 0x8b7cf6,
      transparent: true,
      opacity: 0.55,
    })
  );
  scene.add(coreWire);

  const coreInner = new THREE.Mesh(
    coreGeo,
    new THREE.MeshBasicMaterial({
      color: 0x5b5bf5,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    })
  );
  scene.add(coreInner);

  // Outer faint shell
  const shellGeo = new THREE.IcosahedronGeometry(2.7, 0);
  const shell = new THREE.LineSegments(
    new THREE.WireframeGeometry(shellGeo),
    new THREE.LineBasicMaterial({
      color: 0x5b5bf5,
      transparent: true,
      opacity: 0.18,
    })
  );
  scene.add(shell);

  // ---- Particle cloud ----
  const particleCount = isMobile ? 900 : 2200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const cA = new THREE.Color(0x5b5bf5);
  const cB = new THREE.Color(0x8b7cf6);
  for (let i = 0; i < particleCount; i++) {
    const r = 3.2 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const c = cA.clone().lerp(cB, Math.random());
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: isMobile ? 0.035 : 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ---- Soft bloom plane (fake) ----
  const bloomGeo = new THREE.PlaneGeometry(14, 14);
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
        glow = pow(glow, 2.2);
        vec3 col = mix(vec3(0.36, 0.36, 0.96), vec3(0.55, 0.49, 0.96), vUv.x);
        float pulse = 0.85 + 0.15 * sin(uTime * 0.6);
        gl_FragColor = vec4(col * glow * pulse, glow * 0.5);
      }
    `,
  });
  const bloom = new THREE.Mesh(bloomGeo, bloomMat);
  bloom.position.z = -3;
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(w, h, false);
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
      coreWire.rotation.x = t * 0.12;
      coreWire.rotation.y = t * 0.16;
      coreInner.rotation.copy(coreWire.rotation);
      shell.rotation.x = -t * 0.05;
      shell.rotation.y = t * 0.08;
      particles.rotation.y = t * 0.03;
      particles.rotation.x = Math.sin(t * 0.1) * 0.15;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      camera.position.x = current.x * 0.9;
      camera.position.y = -current.y * 0.6;
      camera.lookAt(0, 0, 0);

      bloomMat.uniforms.uTime.value = t;
    }

    renderer.render(scene, camera);
  };

  // Pause when tab hidden
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

  // ---- Cleanup ----
  return {
    dispose: () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      coreGeo.dispose();
      shellGeo.dispose();
      pGeo.dispose();
      bloomGeo.dispose();
      pMat.dispose();
      bloomMat.dispose();
      coreWire.material instanceof THREE.Material && coreWire.material.dispose();
      shell.material instanceof THREE.Material && shell.material.dispose();
      (coreInner.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}
