'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BRAND_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FlaconViewer360Props {
  productTitle?: string;
  monogramText?: string;
  compact?: boolean;
  className?: string;
}

function createChamferedRectShape(width: number, depth: number, chamfer: number) {
  const hw = width / 2;
  const hd = depth / 2;
  const c = Math.min(chamfer, hw * 0.45, hd * 0.45);
  return [
    [-hw + c, -hd],
    [hw - c, -hd],
    [hw, -hd + c],
    [hw, hd - c],
    [hw - c, hd],
    [-hw + c, hd],
    [-hw, hd - c],
    [-hw, -hd + c],
  ] as const;
}

function createFrontPlaqueCanvas(
  monogramText: string,
  mood: 'amber' | 'moonlight'
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 960;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Brushed dark obsidian velvet or sapphire metallic plate background
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (mood === 'amber') {
    bg.addColorStop(0, '#16120c');
    bg.addColorStop(0.5, '#0b0a08');
    bg.addColorStop(1, '#1c150c');
  } else {
    bg.addColorStop(0, '#0b1220');
    bg.addColorStop(0.5, '#070b14');
    bg.addColorStop(1, '#101b2e');
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle gold hairline metallic sheen stripes
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = `rgba(255, 224, 150, ${i % 2 === 0 ? 0.014 : 0.005})`;
    ctx.fillRect(0, i * 16, canvas.width, 1);
  }

  const gold = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (mood === 'amber') {
    gold.addColorStop(0, '#f5d98e');
    gold.addColorStop(0.5, '#d4a348');
    gold.addColorStop(1, '#fce6ab');
  } else {
    gold.addColorStop(0, '#e2e8f0');
    gold.addColorStop(0.5, '#93c5fd');
    gold.addColorStop(1, '#f8fafc');
  }

  // Outer & inner embossed borders
  ctx.strokeStyle = gold;
  ctx.lineWidth = 10;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  ctx.lineWidth = 3;
  ctx.strokeRect(52, 52, canvas.width - 104, canvas.height - 104);

  // Corner diamonds
  const drawDiamond = (cx: number, cy: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = gold;
    ctx.fillRect(-7, -7, 14, 14);
    ctx.restore();
  };
  drawDiamond(52, 52);
  drawDiamond(canvas.width - 52, 52);
  drawDiamond(52, canvas.height - 52);
  drawDiamond(canvas.width - 52, canvas.height - 52);

  ctx.textAlign = 'center';
  ctx.fillStyle = gold;

  ctx.font = '600 28px Georgia, serif';
  ctx.fillText('MAISON', canvas.width / 2, 165);

  ctx.font = 'bold 92px Georgia, serif';
  ctx.fillText(BRAND_NAME, canvas.width / 2, 275);

  // Thin ornamental rule
  ctx.fillRect(canvas.width / 2 - 140, 322, 280, 3);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 58px Georgia, serif';
  ctx.fillText(
    mood === 'amber' ? 'Nocturne Oud' : 'Midnight Noir',
    canvas.width / 2,
    435
  );

  ctx.fillStyle = gold;
  ctx.font = '500 26px monospace';
  ctx.fillText('EXTRAIT DE PARFUM', canvas.width / 2, 505);

  // Live Custom Engraved Monogram Cartouche
  const trimmedMono = monogramText.trim().toUpperCase();
  if (trimmedMono) {
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(120, 565, canvas.width - 240, 128);
    ctx.fillStyle = mood === 'amber' ? 'rgba(212, 163, 72, 0.1)' : 'rgba(147, 197, 253, 0.1)';
    ctx.fillRect(120, 565, canvas.width - 240, 128);

    ctx.fillStyle = gold;
    ctx.font = '500 20px monospace';
    ctx.fillText('ATELIER MONOGRAM', canvas.width / 2, 606);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.fillText(trimmedMono.slice(0, 18), canvas.width / 2, 662);
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = 'italic 30px Georgia, serif';
    ctx.fillText('Damask Rose & Agarwood', canvas.width / 2, 635);
  }

  // Footer Batch Specs
  ctx.fillStyle = gold;
  ctx.font = '600 24px monospace';
  ctx.fillText('38% PURE EXTRAIT', canvas.width / 2, 795);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '400 22px monospace';
  ctx.fillText('100 ML  •  3.4 FL.OZ  •  GRASSE', canvas.width / 2, 850);

  return canvas;
}

function createBackEngravingCanvas(mood: 'amber' | 'moonlight'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ink = mood === 'amber' ? 'rgba(245, 217, 142, 0.85)' : 'rgba(191, 219, 254, 0.85)';
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';

  ctx.lineWidth = 3;
  ctx.strokeRect(36, 48, canvas.width - 72, canvas.height - 96);

  ctx.font = 'bold 40px Georgia, serif';
  ctx.fillText(BRAND_NAME, canvas.width / 2, 160);

  ctx.font = '500 18px monospace';
  ctx.fillText('HAUTE PARFUMERIE', canvas.width / 2, 210);

  ctx.fillRect(canvas.width / 2 - 90, 245, 180, 2);

  ctx.font = 'italic 26px Georgia, serif';
  ctx.fillText('Macération Privée', canvas.width / 2, 310);

  ctx.font = '400 20px monospace';
  ctx.fillText('38% BOTANICAL EXTRAIT', canvas.width / 2, 375);
  ctx.fillText('GRASSE, FRANCE', canvas.width / 2, 420);

  ctx.fillRect(canvas.width / 2 - 90, 460, 180, 2);

  ctx.font = 'bold 22px monospace';
  ctx.fillText('EDITION N° 001 / 500', canvas.width / 2, 525);

  return canvas;
}

export function FlaconViewer360({
  productTitle = 'Nocturne Oud Extrait de Parfum',
  monogramText = '',
  compact = false,
  className = '',
}: FlaconViewer360Props) {
  const [rotationAngle, setRotationAngle] = useState(24);
  const [autoSpin, setAutoSpin] = useState(true);
  const [lightingMood, setLightingMood] = useState<'amber' | 'moonlight'>('amber');
  const [mistActive, setMistActive] = useState(false);
  const [webglReady, setWebglReady] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef(monogramText);
  const moodRef = useRef(lightingMood);
  const autoSpinRef = useRef(autoSpin);

  // Live simulation state shared cleanly with requestAnimationFrame loop
  const simRef = useRef({
    yaw: (24 * Math.PI) / 180,
    pitch: 0.14,
    velYaw: 0,
    velPitch: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    pauseAutoUntil: 0,
    mistTimer: 0,
    externalUpdate: null as null | ((yawDeg: number) => void),
    updatePlaque: null as null | ((text: string, mood: 'amber' | 'moonlight') => void),
    updateMood: null as null | ((mood: 'amber' | 'moonlight') => void),
    triggerSpray: null as null | (() => void),
  });

  useEffect(() => {
    monogramRef.current = monogramText;
    simRef.current.updatePlaque?.(monogramText, moodRef.current);
  }, [monogramText]);

  useEffect(() => {
    moodRef.current = lightingMood;
    simRef.current.updateMood?.(lightingMood);
    simRef.current.updatePlaque?.(monogramRef.current, lightingMood);
  }, [lightingMood]);

  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  useEffect(() => {
    const container = stageRef.current;
    if (!container) return;

    let mounted = true;
    let rafId = 0;
    let cleanupScene: (() => void) | null = null;

    async function init3DFlacon() {
      if (!container) return;
      try {
        const THREE = await import('three');
        const { RoomEnvironment } = await import(
          'three/examples/jsm/environments/RoomEnvironment.js'
        );

        if (!mounted || !container) return;

        const width = Math.max(container.clientWidth, 260);
        const height = Math.max(container.clientHeight, 260);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;

        container.innerHTML = '';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        const camera = new THREE.PerspectiveCamera(37, width / height, 0.1, 40);
        camera.position.set(0, 0.45, 6.5);
        camera.lookAt(0, 0.25, 0);

        // Studio Key, Fill, and Atmospheric Backlight
        const keyLight = new THREE.DirectionalLight('#fff2d6', 2.8);
        keyLight.position.set(4.5, 5.5, 5.5);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight('#fbbf24', 18, 16);
        rimLight.position.set(-3.8, 1.5, -2.5);
        scene.add(rimLight);

        const coreGlow = new THREE.PointLight('#f59e0b', 10, 9);
        coreGlow.position.set(0, 0.15, 2.2);
        scene.add(coreGlow);

        const ambientLight = new THREE.AmbientLight('#ffffff', 0.45);
        scene.add(ambientLight);

        // Turntable Group (Pedestal + Bottle)
        const stageGroup = new THREE.Group();
        scene.add(stageGroup);

        // 1. Nero Marquina Obsidian Pedestal
        const pedestalMat = new THREE.MeshStandardMaterial({
          color: '#0c1018',
          roughness: 0.22,
          metalness: 0.45,
        });
        const pedestalMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(1.65, 1.78, 0.16, 64),
          pedestalMat
        );
        pedestalMesh.position.y = -1.34;
        stageGroup.add(pedestalMesh);

        const pedestalGoldRingMat = new THREE.MeshStandardMaterial({
          color: '#e6bd64',
          metalness: 0.94,
          roughness: 0.2,
        });
        const pedestalRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.64, 0.018, 16, 80),
          pedestalGoldRingMat
        );
        pedestalRing.rotation.x = Math.PI / 2;
        pedestalRing.position.y = -1.26;
        stageGroup.add(pedestalRing);

        // Soft glowing base floor halo under glass
        const glowRingMat = new THREE.MeshBasicMaterial({
          color: '#f59e0b',
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
        });
        const glowDisc = new THREE.Mesh(new THREE.CircleGeometry(1.38, 48), glowRingMat);
        glowDisc.rotation.x = -Math.PI / 2;
        glowDisc.position.y = -1.255;
        stageGroup.add(glowDisc);

        // Bottle Root Group (tilts & orbits together)
        const bottleGroup = new THREE.Group();
        stageGroup.add(bottleGroup);

        // Helper: Octagonal Chamfered ExtrudeGeometry centered around origin
        const makePrism = (w: number, d: number, chamfer: number, h: number, bevel: number) => {
          const pts = createChamferedRectShape(w, d, chamfer);
          const shape = new THREE.Shape();
          shape.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) {
            shape.lineTo(pts[i][0], pts[i][1]);
          }
          shape.closePath();

          const geom = new THREE.ExtrudeGeometry(shape, {
            depth: h,
            bevelEnabled: true,
            bevelThickness: bevel,
            bevelSize: bevel * 0.9,
            bevelSegments: 4,
          });
          geom.rotateX(-Math.PI / 2);
          geom.center();
          return geom;
        };

        // 2. Heavy Faceted Outer Lead-Crystal Flacon Body
        const crystalGeom = makePrism(2.02, 1.08, 0.27, 2.16, 0.12);
        const crystalMat = new THREE.MeshPhysicalMaterial({
          color: '#ffffff',
          transmission: 0.94,
          transparent: false,
          opacity: 1,
          roughness: 0.04,
          metalness: 0.0,
          ior: 1.54,
          thickness: 1.4,
          reflectivity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          attenuationColor: new THREE.Color('#fff1d6'),
          attenuationDistance: 3.6,
          envMapIntensity: 1.85,
        });
        const crystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
        crystalMesh.renderOrder = 3;
        bottleGroup.add(crystalMesh);

        // 3. Inner Glowing Extrait Liquid Core (opaque to transmission pass so glass refracts it crisply!)
        const liquidGeom = makePrism(1.64, 0.72, 0.2, 1.62, 0.05);
        const liquidMat = new THREE.MeshPhysicalMaterial({
          color: '#d97706',
          emissive: '#b45309',
          emissiveIntensity: 0.68,
          transparent: false,
          roughness: 0.14,
          metalness: 0.08,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.4,
        });
        const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
        liquidMesh.position.y = 0.04;
        liquidMesh.renderOrder = 1;
        bottleGroup.add(liquidMesh);

        // Microscopic Suspended Gold Alchemy Dust Inside Liquid
        const sparkleCount = 70;
        const sparklePositions = new Float32Array(sparkleCount * 3);
        for (let i = 0; i < sparkleCount; i++) {
          sparklePositions[i * 3] = (Math.random() - 0.5) * 1.35;
          sparklePositions[i * 3 + 1] = -0.68 + Math.random() * 1.44;
          sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.55;
        }
        const sparkleGeom = new THREE.BufferGeometry();
        sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
        const sparkleMat = new THREE.PointsMaterial({
          color: '#fde68a',
          size: 0.032,
          transparent: true,
          opacity: 0.78,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sparkles = new THREE.Points(sparkleGeom, sparkleMat);
        bottleGroup.add(sparkles);

        // Micro Atomizer Dip Tube Straw visible inside glass neck
        const tubeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.15, 0),
          new THREE.Vector3(0.05, 0.3, 0.03),
          new THREE.Vector3(0.45, -0.78, 0.14),
        ]);
        const tubeGeom = new THREE.TubeGeometry(tubeCurve, 20, 0.022, 10, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: '#f5e7c8',
          metalness: 0.45,
          roughness: 0.25,
        });
        bottleGroup.add(new THREE.Mesh(tubeGeom, tubeMat));

        // 4. Stepped Shoulder + Brushed 24K Gold Atomizer Collar
        const goldMat = new THREE.MeshStandardMaterial({
          color: '#e5bc61',
          metalness: 0.94,
          roughness: 0.18,
          envMapIntensity: 1.5,
        });

        const shoulderCrystal = new THREE.Mesh(
          makePrism(0.95, 0.62, 0.15, 0.14, 0.04),
          crystalMat
        );
        shoulderCrystal.position.y = 1.24;
        bottleGroup.add(shoulderCrystal);

        const collarBase = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.36, 0.22, 36),
          goldMat
        );
        collarBase.position.y = 1.4;
        bottleGroup.add(collarBase);

        const collarRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.34, 0.024, 14, 48),
          goldMat
        );
        collarRing.rotation.x = Math.PI / 2;
        collarRing.position.y = 1.32;
        bottleGroup.add(collarRing);

        // Exposed Micro-Atomizer Spray Head (revealed when Crown Cap lifts during mist test)
        const atomizerHead = new THREE.Mesh(
          new THREE.CylinderGeometry(0.19, 0.21, 0.2, 32),
          goldMat
        );
        atomizerHead.position.y = 1.58;
        bottleGroup.add(atomizerHead);

        const nozzleDot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.032, 0.032, 0.05, 16),
          new THREE.MeshStandardMaterial({ color: '#111827', metalness: 0.8, roughness: 0.2 })
        );
        nozzleDot.rotation.x = Math.PI / 2;
        nozzleDot.position.set(0, 1.61, 0.19);
        bottleGroup.add(nozzleDot);

        // 5. Weighted Faceted Crown Cap (Animates upward during Mist Preview)
        const capGroup = new THREE.Group();
        const capBaseY = 1.77;
        capGroup.position.y = capBaseY;
        bottleGroup.add(capGroup);

        const capCrown = new THREE.Mesh(makePrism(0.76, 0.76, 0.16, 0.62, 0.06), goldMat);
        capGroup.add(capCrown);

        const capWaist = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.38, 0.12, 32),
          goldMat
        );
        capWaist.position.y = -0.34;
        capGroup.add(capWaist);

        const capTopJewel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.27, 0.05, 8),
          new THREE.MeshStandardMaterial({
            color: '#111318',
            metalness: 0.6,
            roughness: 0.2,
          })
        );
        capTopJewel.position.y = 0.37;
        capGroup.add(capTopJewel);

        // 6. Front Beveled 24K Gold Plaque + Live Monogram CanvasTexture
        const plaqueCanvas = createFrontPlaqueCanvas(monogramRef.current, moodRef.current);
        const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);
        plaqueTexture.colorSpace = THREE.SRGBColorSpace;
        plaqueTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

        const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.42, 0.04), goldMat);
        plaqueFrame.position.set(0, -0.02, 0.652);
        plaqueFrame.renderOrder = 4;
        bottleGroup.add(plaqueFrame);

        const plaqueMat = new THREE.MeshStandardMaterial({
          map: plaqueTexture,
          metalness: 0.35,
          roughness: 0.28,
        });
        const plaqueFace = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.36), plaqueMat);
        plaqueFace.position.set(0, -0.02, 0.674);
        plaqueFace.renderOrder = 5;
        bottleGroup.add(plaqueFace);

        // 7. Rear Glass Batch Engraving Plane (Visible on 180° back rotation)
        const backCanvas = createBackEngravingCanvas(moodRef.current);
        const backTexture = new THREE.CanvasTexture(backCanvas);
        backTexture.colorSpace = THREE.SRGBColorSpace;
        const backMat = new THREE.MeshBasicMaterial({
          map: backTexture,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        const backFace = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.36), backMat);
        backFace.position.set(0, -0.02, -0.654);
        backFace.rotation.y = Math.PI;
        backFace.renderOrder = 5;
        bottleGroup.add(backFace);

        // 8. 3D Vapor Mist Spray Particle Cloud
        const mistCount = 120;
        const mistPos = new Float32Array(mistCount * 3);
        const mistVel = new Float32Array(mistCount * 3);
        const mistGeom = new THREE.BufferGeometry();
        mistGeom.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
        const mistMat = new THREE.PointsMaterial({
          color: '#fde68a',
          size: 0.055,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const mistCloud = new THREE.Points(mistGeom, mistMat);
        bottleGroup.add(mistCloud);

        const resetMistParticles = () => {
          for (let i = 0; i < mistCount; i++) {
            mistPos[i * 3] = (Math.random() - 0.5) * 0.04;
            mistPos[i * 3 + 1] = 1.62 + (Math.random() - 0.5) * 0.04;
            mistPos[i * 3 + 2] = 0.22;

            mistVel[i * 3] = (Math.random() - 0.5) * 0.032;
            mistVel[i * 3 + 1] = 0.012 + Math.random() * 0.026;
            mistVel[i * 3 + 2] = 0.032 + Math.random() * 0.045;
          }
          mistGeom.attributes.position.needsUpdate = true;
        };
        resetMistParticles();

        // Bind live callbacks to React UI controls
        simRef.current.updatePlaque = (text, mood) => {
          const updated = createFrontPlaqueCanvas(text, mood);
          const ctx = plaqueCanvas.getContext('2d');
          ctx?.clearRect(0, 0, plaqueCanvas.width, plaqueCanvas.height);
          ctx?.drawImage(updated, 0, 0);
          plaqueTexture.needsUpdate = true;
        };

        simRef.current.updateMood = (mood) => {
          const isAmber = mood === 'amber';
          crystalMat.attenuationColor.set(isAmber ? '#fff1d6' : '#dbeafe');
          liquidMat.color.set(isAmber ? '#d97706' : '#2563eb');
          liquidMat.emissive.set(isAmber ? '#b45309' : '#1e3a8a');
          goldMat.color.set(isAmber ? '#e5bc61' : '#d8dee9');
          pedestalGoldRingMat.color.set(isAmber ? '#e5bc61' : '#93c5fd');
          rimLight.color.set(isAmber ? '#fbbf24' : '#60a5fa');
          coreGlow.color.set(isAmber ? '#f59e0b' : '#3b82f6');
          glowRingMat.color.set(isAmber ? '#f59e0b' : '#60a5fa');
          sparkleMat.color.set(isAmber ? '#fde68a' : '#bfdbfe');
          mistMat.color.set(isAmber ? '#fde68a' : '#e0f2fe');

          const updatedBack = createBackEngravingCanvas(mood);
          const bCtx = backCanvas.getContext('2d');
          bCtx?.clearRect(0, 0, backCanvas.width, backCanvas.height);
          bCtx?.drawImage(updatedBack, 0, 0);
          backTexture.needsUpdate = true;
        };

        simRef.current.triggerSpray = () => {
          resetMistParticles();
          simRef.current.mistTimer = 2.0;
          simRef.current.pauseAutoUntil = performance.now() + 2500;
        };

        simRef.current.externalUpdate = (deg) => {
          simRef.current.yaw = (deg * Math.PI) / 180;
          simRef.current.velYaw = 0;
          simRef.current.pauseAutoUntil = performance.now() + 3000;
        };

        // Ensure initial mood matches state
        simRef.current.updateMood(moodRef.current);

        // Resize Observer for crisp responsiveness on Mobile & Desktop
        const handleResize = () => {
          if (!container || !mounted) return;
          const w = Math.max(container.clientWidth, 240);
          const h = Math.max(container.clientHeight, 240);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(container);

        // Smooth 60fps Animation Loop
        let lastTime = performance.now();
        let lastUiSync = 0;

        const animate = (now: number) => {
          if (!mounted) return;
          const dt = Math.min((now - lastTime) / 1000, 0.05);
          lastTime = now;

          const s = simRef.current;

          if (!s.isDragging) {
            if (Math.abs(s.velYaw) > 0.0002 || Math.abs(s.velPitch) > 0.0002) {
              s.yaw += s.velYaw;
              s.pitch += s.velPitch;
              s.velYaw *= 0.92;
              s.velPitch *= 0.9;
            } else if (autoSpinRef.current && now > s.pauseAutoUntil && s.mistTimer <= 0) {
              s.yaw += dt * 0.34;
            }
            // Gently relax extreme pitch toward showcase angle
            s.pitch += (0.14 - s.pitch) * Math.min(dt * 1.4, 0.08);
          }

          s.pitch = Math.max(-0.36, Math.min(0.48, s.pitch));

          bottleGroup.rotation.y = s.yaw;
          bottleGroup.rotation.x = s.pitch;
          pedestalGroupUpdate(pedestalMesh, pedestalRing, s.yaw);

          // Gentle shimmer inside Extrait fluid
          const sp = sparkleGeom.attributes.position as InstanceType<typeof THREE.BufferAttribute>;
          for (let i = 0; i < sparkleCount; i++) {
            let py = sp.getY(i) + dt * 0.08;
            if (py > 0.76) py = -0.68;
            sp.setY(i, py);
          }
          sp.needsUpdate = true;

          // Mist Spray + Magnetic Cap Lift animation
          if (s.mistTimer > 0) {
            s.mistTimer = Math.max(0, s.mistTimer - dt);
            const t = 2.0 - s.mistTimer;
            // Lift cap cleanly during first 1.5s then settle back
            const capOffset = t < 0.3 ? (t / 0.3) * 0.56 : t < 1.55 ? 0.56 : ((2.0 - t) / 0.45) * 0.56;
            capGroup.position.y = capBaseY + Math.max(0, capOffset);

            if (t > 0.18) {
              mistMat.opacity = Math.max(0, 0.85 * (1 - (t - 0.18) / 1.82));
              const mp = mistGeom.attributes.position as InstanceType<typeof THREE.BufferAttribute>;
              for (let i = 0; i < mistCount; i++) {
                mp.setXYZ(
                  i,
                  mp.getX(i) + mistVel[i * 3],
                  mp.getY(i) + mistVel[i * 3 + 1],
                  mp.getZ(i) + mistVel[i * 3 + 2]
                );
                mistVel[i * 3 + 2] *= 0.975;
                mistVel[i * 3 + 1] *= 0.985;
              }
              mp.needsUpdate = true;
            }
          } else {
            capGroup.position.y = capBaseY;
            mistMat.opacity = 0;
          }

          renderer.render(scene, camera);

          if (now - lastUiSync > 90) {
            lastUiSync = now;
            const deg = ((Math.round((s.yaw * 180) / Math.PI) % 360) + 360) % 360;
            setRotationAngle(deg);
          }

          rafId = requestAnimationFrame(animate);
        };

        function pedestalGroupUpdate(
          ped: InstanceType<typeof THREE.Mesh>,
          ring: InstanceType<typeof THREE.Mesh>,
          yaw: number
        ) {
          ped.rotation.y = yaw;
          ring.rotation.z = yaw;
        }

        rafId = requestAnimationFrame(animate);

        cleanupScene = () => {
          ro.disconnect();
          envTex.dispose();
          pmrem.dispose();
          plaqueTexture.dispose();
          backTexture.dispose();
          crystalGeom.dispose();
          liquidGeom.dispose();
          sparkleGeom.dispose();
          tubeGeom.dispose();
          mistGeom.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        if (mounted) setWebglReady(false);
      }
    }

    init3DFlacon();

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      cleanupScene?.();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = simRef.current;
    s.isDragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.velYaw = 0;
    s.velPitch = 0;
    s.pauseAutoUntil = performance.now() + 3500;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore synthetic events without active pointerId
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = simRef.current;
    if (!s.isDragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;

    s.velYaw = dx * 0.011;
    s.velPitch = dy * 0.007;
    s.yaw += s.velYaw;
    s.pitch = Math.max(-0.36, Math.min(0.48, s.pitch + s.velPitch));
  };

  const handlePointerUp = () => {
    simRef.current.isDragging = false;
    simRef.current.pauseAutoUntil = performance.now() + 2600;
  };

  const handleTriggerMist = () => {
    setMistActive(true);
    simRef.current.triggerSpray?.();
    window.setTimeout(() => setMistActive(false), 2000);
  };

  const jumpToAngle = (deg: number) => {
    setRotationAngle(deg);
    simRef.current.externalUpdate?.(deg);
  };

  const normalizedAngle = ((Math.round(rotationAngle) % 360) + 360) % 360;

  return (
    <div
      className={cn(
        'rounded-2xl sm:rounded-3xl border border-amber-500/25 bg-[#090D16] text-white relative overflow-hidden shadow-2xl',
        compact ? 'p-4 sm:p-6' : 'p-4 sm:p-7',
        className
      )}
    >
      {/* Dynamic Ambient Backlight matching chosen Lighting Mood */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 blur-[110px] opacity-35"
        style={{
          background:
            lightingMood === 'amber'
              ? 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 65%)'
              : 'radial-gradient(circle at 50% 50%, #60A5FA 0%, transparent 65%)',
        }}
      />

      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/10 relative z-10">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold block">
            Real-Time 3D WebGL Atelier
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-light">
            Crystal Flacon Architecture
          </h3>
        </div>

        {/* Lighting Mood Switcher */}
        <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setLightingMood('amber')}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap',
              lightingMood === 'amber'
                ? 'bg-amber-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Amber Dusk
          </button>
          <button
            type="button"
            onClick={() => setLightingMood('moonlight')}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap',
              lightingMood === 'moonlight'
                ? 'bg-blue-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Midnight Moon
          </button>
        </div>
      </div>

      {/* Main Real-Time 360° Interactive Touch & Mouse 3D Canvas Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          'relative my-4 sm:my-5 w-full flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-gradient-to-b from-[#070B13] via-[#05080F] to-[#03050A] border border-white/10',
          compact ? 'h-60 sm:h-72' : 'h-72 sm:h-96'
        )}
      >
        {webglReady ? (
          <div ref={stageRef} className="w-full h-full" aria-label={productTitle} />
        ) : (
          /* Pure CSS 3D preserve-3d Fallback if WebGL disabled */
          <div className="flex flex-col items-center justify-center h-full w-full [perspective:900px]">
            <div
              className="relative w-32 h-44 transition-transform duration-150 [transform-style:preserve-3d]"
              style={{ transform: `rotateX(-8deg) rotateY(${normalizedAngle}deg)` }}
            >
              <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-500/35 via-amber-900/50 to-black/70 backdrop-blur-md flex flex-col items-center justify-center p-3 [transform:translateZ(26px)] shadow-2xl">
                <span className="font-serif text-base text-amber-200 tracking-widest font-bold">{BRAND_NAME}</span>
                <span className="text-[9px] text-white/80 font-serif italic mt-1">Nocturne Oud</span>
                {monogramText && (
                  <span className="mt-2 px-2 py-0.5 border border-amber-300/40 text-[9px] font-mono text-amber-200">
                    {monogramText}
                  </span>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl border border-amber-400/30 bg-amber-950/60 flex items-center justify-center [transform:rotateY(180deg)_translateZ(26px)]">
                <span className="text-[9px] font-mono text-amber-300 tracking-widest">38% EXTRAIT</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Badges: Degree + Live Spin Toggle */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAutoSpin((v) => !v);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="bg-black/75 hover:bg-black/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[9.5px] font-mono text-gray-200 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {autoSpin ? '❚❚ Auto Spin' : '▶ Auto Spin'}
          </button>
          <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40 text-[10px] font-mono text-amber-300 pointer-events-none">
            {normalizedAngle}°
          </div>
        </div>

        {/* Bottom HUD: Swipe Cue + Mist Atomizer Button */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] sm:text-[10px] text-gray-200 flex items-center gap-1.5">
            <span className="text-amber-400">⟲</span>
            <span className="sm:hidden">Drag 360° 3D</span>
            <span className="hidden sm:inline">Drag to orbit 360° 3D</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTriggerMist();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              'pointer-events-auto px-3 py-1 rounded-full border text-[9.5px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer backdrop-blur-md',
              mistActive
                ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/30'
                : 'bg-black/75 text-amber-300 border-amber-400/40 hover:bg-amber-400 hover:text-black'
            )}
          >
            {mistActive ? '✦ Atomizing...' : '✦ Test Mist'}
          </button>
        </div>
      </div>

      {/* Angle Presets, 360° Scrubber Slider & Material Callouts */}
      <div className="space-y-3 pt-3 border-t border-white/10 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {[
              { label: 'Front', deg: 0 },
              { label: 'Side', deg: 90 },
              { label: 'Back Seal', deg: 180 },
              { label: '3/4 View', deg: 325 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => jumpToAngle(preset.deg)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/40 text-[10px] font-mono text-gray-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
            Interactive Cut-Crystal 3D
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[10px] sm:text-xs font-mono text-gray-400">0°</span>
          <input
            type="range"
            min={0}
            max={359}
            value={normalizedAngle}
            onChange={(e) => jumpToAngle(Number(e.target.value))}
            aria-label="Rotate Flacon 360 Degrees"
            className="flex-1 accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
          />
          <span className="text-[10px] sm:text-xs font-mono text-gray-400">360°</span>
        </div>

        {!compact && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center pt-1">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
              <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">
                French Crystal
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">480g Base</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
              <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">
                24K Gold Cap
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">Magnetic Seal</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
              <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">
                Micro Atomizer
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">Fine Mist</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
