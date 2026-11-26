'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BRAND_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  type FlaconMood,
  createBackEngravingCanvas,
  createBrushedMetalBumpCanvas,
  createCausticPoolCanvas,
  createDiamondKnurlCanvas,
  createEngravedMetalPlaqueCanvases,
  createLiquidVolumeCanvas,
  createLuxuryStudioEnvTarget,
  createMarbleSlabCanvases,
  createStudioBackdropCanvas,
} from './flaconTextures';

interface FlaconViewer360Props {
  productTitle?: string;
  monogramText?: string;
  compact?: boolean;
  className?: string;
}

function createChamferedRectPoints(width: number, depth: number, chamfer: number) {
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

export function FlaconViewer360({
  productTitle = 'Nocturne Oud Extrait de Parfum',
  monogramText = '',
  compact = false,
  className = '',
}: FlaconViewer360Props) {
  const [rotationAngle, setRotationAngle] = useState(326);
  const [autoSpin, setAutoSpin] = useState(true);
  const [lightingMood, setLightingMood] = useState<FlaconMood>('amber');
  const [mistActive, setMistActive] = useState(false);
  const [webglReady, setWebglReady] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef(monogramText);
  const moodRef = useRef<FlaconMood>(lightingMood);
  const autoSpinRef = useRef(autoSpin);

  const simRef = useRef({
    yaw: (326 * Math.PI) / 180,
    pitch: 0.16,
    velYaw: 0,
    velPitch: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    pauseAutoUntil: 0,
    mistTimer: 0,
    externalUpdate: null as null | ((yawDeg: number) => void),
    updatePlaque: null as null | ((text: string, mood: FlaconMood) => void),
    updateMood: null as null | ((mood: FlaconMood) => void),
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

    async function initPhotorealisticFlacon() {
      if (!container) return;
      try {
        const THREE = await import('three');
        if (!mounted || !container) return;

        const width = Math.max(container.clientWidth, 260);
        const height = Math.max(container.clientHeight, 260);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;

        container.innerHTML = '';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        // Dark Studio Photography Backdrop (refracted cleanly through glass transmission)
        const backdropCanvas = createStudioBackdropCanvas(moodRef.current);
        const backdropTex = new THREE.CanvasTexture(backdropCanvas);
        backdropTex.colorSpace = THREE.SRGBColorSpace;
        scene.background = backdropTex;

        // Custom Dark-Room Studio Softbox HDRI Environment
        let envTarget = createLuxuryStudioEnvTarget(THREE, renderer, moodRef.current);
        scene.environment = envTarget.texture;

        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 40);
        camera.position.set(0, 0.48, 6.25);
        camera.lookAt(0, 0.18, 0);

        // Controlled Studio Key, Backlight Rim, and Caustic Core Lights
        const keyLight = new THREE.DirectionalLight('#fff4de', 2.4);
        keyLight.position.set(4.5, 6.0, 5.2);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight('#ffd89c', 1.15);
        fillLight.position.set(-5.0, 2.0, 3.0);
        scene.add(fillLight);

        const backWarmLight = new THREE.PointLight('#d97706', 16, 14);
        backWarmLight.position.set(0, 0.25, -3.2);
        scene.add(backWarmLight);

        const rimTopLight = new THREE.SpotLight('#fff8eb', 28, 18, Math.PI / 4, 0.65);
        rimTopLight.position.set(-2.5, 5.8, -2.5);
        scene.add(rimTopLight);

        const stageGroup = new THREE.Group();
        scene.add(stageGroup);

        // Helper for razor-sharp 45° beveled faceted crystal geometry (bevelSegments: 1)
        const makeCrystalPrism = (
          w: number,
          d: number,
          chamfer: number,
          h: number,
          bevelSize: number,
          bevelThickness: number
        ) => {
          const pts = createChamferedRectPoints(w, d, chamfer);
          const shape = new THREE.Shape();
          shape.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) {
            shape.lineTo(pts[i][0], pts[i][1]);
          }
          shape.closePath();

          const geom = new THREE.ExtrudeGeometry(shape, {
            depth: h,
            bevelEnabled: true,
            bevelThickness,
            bevelSize,
            bevelSegments: 1,
          });
          geom.rotateX(-Math.PI / 2);
          geom.center();
          return geom;
        };

        // 1. Nero Marquina Veined Black Marble Plinth + Optical Caustic Projection
        const { colorCanvas: marbleColCanvas, roughnessCanvas: marbleRoughCanvas } =
          createMarbleSlabCanvases();
        const marbleMap = new THREE.CanvasTexture(marbleColCanvas);
        marbleMap.colorSpace = THREE.SRGBColorSpace;
        marbleMap.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

        const marbleRoughMap = new THREE.CanvasTexture(marbleRoughCanvas);

        const marbleMat = new THREE.MeshPhysicalMaterial({
          map: marbleMap,
          roughnessMap: marbleRoughMap,
          roughness: 0.28,
          metalness: 0.08,
          clearcoat: 0.92,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.15,
        });

        const marbleEdgeMat = new THREE.MeshStandardMaterial({
          color: '#0c0e12',
          roughness: 0.4,
          metalness: 0.15,
        });

        // Clean 6-face architectural marble slab (top displays sharp unstretched calcite veins)
        const marbleSlabGeom = new THREE.BoxGeometry(3.35, 0.24, 2.35);
        const marbleSlab = new THREE.Mesh(marbleSlabGeom, [
          marbleEdgeMat,
          marbleEdgeMat,
          marbleMat,
          marbleEdgeMat,
          marbleEdgeMat,
          marbleEdgeMat,
        ]);
        marbleSlab.position.y = -1.17;
        stageGroup.add(marbleSlab);

        // Subtle dark champagne metallic bevel inlay frame underneath slab
        const slabBevel = new THREE.Mesh(
          new THREE.BoxGeometry(3.39, 0.04, 2.39),
          new THREE.MeshStandardMaterial({ color: '#1b1814', roughness: 0.45, metalness: 0.5 })
        );
        slabBevel.position.y = -1.28;
        stageGroup.add(slabBevel);

        // Optical amber/sapphire light caustics cast on the top of marble under crystal base
        const causticCanvas = createCausticPoolCanvas(moodRef.current);
        const causticTex = new THREE.CanvasTexture(causticCanvas);
        causticTex.colorSpace = THREE.SRGBColorSpace;
        const causticMat = new THREE.MeshBasicMaterial({
          map: causticTex,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const causticPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.15, 2.15), causticMat);
        causticPlane.rotation.x = -Math.PI / 2;
        causticPlane.position.y = -1.048;
        stageGroup.add(causticPlane);

        // Bottle Root Group (orbits & pitches over marble plinth)
        const bottleGroup = new THREE.Group();
        stageGroup.add(bottleGroup);

        // 2. Outer Heavy Faceted Cut-Crystal Vessel
        // Resulting bounds: X in [-1.23, 1.23], Y in [-1.02, 1.02], Z in [-0.74, 0.74]
        const crystalGeom = makeCrystalPrism(2.02, 1.04, 0.34, 1.56, 0.22, 0.24);
        const crystalMat = new THREE.MeshPhysicalMaterial({
          color: '#ffffff',
          transmission: 0.98,
          transparent: false,
          opacity: 1,
          roughness: 0.02,
          metalness: 0.0,
          ior: 1.56,
          thickness: 1.65,
          specularIntensity: 1.0,
          reflectivity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          attenuationColor: new THREE.Color('#fff9ec'),
          attenuationDistance: 4.5,
          envMapIntensity: 1.45,
        });
        const crystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
        crystalMesh.renderOrder = 3;
        bottleGroup.add(crystalMesh);

        // 3. Rich Translucent Cognac-Amber Liquid Core (leaves crystal base cushion + top headspace)
        const liquidCanvas = createLiquidVolumeCanvas(moodRef.current);
        const liquidTex = new THREE.CanvasTexture(liquidCanvas);
        liquidTex.colorSpace = THREE.SRGBColorSpace;

        const liquidGeom = makeCrystalPrism(1.68, 0.74, 0.24, 1.18, 0.07, 0.07);
        const liquidMat = new THREE.MeshPhysicalMaterial({
          map: liquidTex,
          color: '#d97706',
          emissive: '#3a1400',
          emissiveIntensity: 0.14,
          transparent: false,
          roughness: 0.06,
          metalness: 0.02,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.15,
        });
        const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
        liquidMesh.position.y = 0.02; // Base sits at -0.64 leaving crisp 0.38 solid crystal floor!
        liquidMesh.renderOrder = 1;
        bottleGroup.add(liquidMesh);

        // Precision Internal Crystal Dip-Tube Atomizer Straw
        const tubeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.02, 0),
          new THREE.Vector3(0.02, 0.32, 0.01),
          new THREE.Vector3(0.28, -0.58, 0.08),
        ]);
        const tubeGeom = new THREE.TubeGeometry(tubeCurve, 20, 0.016, 10, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: '#e5d4b3',
          metalness: 0.35,
          roughness: 0.2,
          transparent: true,
          opacity: 0.65,
        });
        bottleGroup.add(new THREE.Mesh(tubeGeom, tubeMat));

        // 4. Shared Brushed Champagne-Gold & CNC Diamond Knurled Metal Materials
        const brushedBump = new THREE.CanvasTexture(createBrushedMetalBumpCanvas());
        brushedBump.wrapS = THREE.RepeatWrapping;
        brushedBump.wrapT = THREE.RepeatWrapping;

        const knurlTex = new THREE.CanvasTexture(createDiamondKnurlCanvas());
        knurlTex.wrapS = THREE.RepeatWrapping;
        knurlTex.wrapT = THREE.RepeatWrapping;
        knurlTex.repeat.set(9, 2);

        const brushedGoldMat = new THREE.MeshStandardMaterial({
          color: '#cbb178',
          metalness: 0.92,
          roughness: 0.27,
          bumpMap: brushedBump,
          bumpScale: 0.006,
          envMapIntensity: 1.35,
        });

        const knurledGoldMat = new THREE.MeshStandardMaterial({
          color: '#cbb178',
          metalness: 0.92,
          roughness: 0.32,
          bumpMap: knurlTex,
          bumpScale: 0.028,
          roughnessMap: knurlTex,
          envMapIntensity: 1.35,
        });

        // Stepped Bottle Shoulder Neck Base & Collar Ring
        const neckRing = new THREE.Mesh(
          new THREE.CylinderGeometry(0.39, 0.42, 0.09, 48),
          brushedGoldMat
        );
        neckRing.position.y = 1.05;
        bottleGroup.add(neckRing);

        const collarTrim = new THREE.Mesh(
          new THREE.TorusGeometry(0.39, 0.018, 16, 64),
          brushedGoldMat
        );
        collarTrim.rotation.x = Math.PI / 2;
        collarTrim.position.y = 1.095;
        bottleGroup.add(collarTrim);

        // Exposed Precision Turned Micro-Atomizer Spray Core (seen on Test Mist cap lift)
        const atomizerStem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.21, 0.24, 0.24, 36),
          brushedGoldMat
        );
        atomizerStem.position.y = 1.22;
        bottleGroup.add(atomizerStem);

        const nozzleOrifice = new THREE.Mesh(
          new THREE.CylinderGeometry(0.032, 0.032, 0.04, 16),
          new THREE.MeshStandardMaterial({ color: '#111318', metalness: 0.7, roughness: 0.3 })
        );
        nozzleOrifice.rotation.x = Math.PI / 2;
        nozzleOrifice.position.set(0, 1.26, 0.21);
        bottleGroup.add(nozzleOrifice);

        // 5. Turned & Diamond-Knurled Weighted Champagne Gold Cap (Matching perfume_flacon.jpg)
        const capGroup = new THREE.Group();
        const capRestY = 1.09;
        capGroup.position.y = capRestY;
        bottleGroup.add(capGroup);

        // Smooth brushed flared lower cap barrel (LatheGeometry)
        const lathePts = [
          new THREE.Vector2(0.0, 0.0),
          new THREE.Vector2(0.365, 0.0),
          new THREE.Vector2(0.365, 0.04),
          new THREE.Vector2(0.34, 0.08),
          new THREE.Vector2(0.352, 0.36),
          new THREE.Vector2(0.415, 0.40),
          new THREE.Vector2(0.415, 0.41),
          new THREE.Vector2(0.0, 0.41),
        ];
        const capLowerGeom = new THREE.LatheGeometry(lathePts, 64);
        const capLower = new THREE.Mesh(capLowerGeom, brushedGoldMat);
        capGroup.add(capLower);

        // Diamond-Knurled Crown Collar Grip
        const knurlBand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.422, 0.422, 0.22, 64, 1, true),
          knurledGoldMat
        );
        knurlBand.position.y = 0.515;
        capGroup.add(knurlBand);

        // Chamfered Cap Top Lid with Recessed Concentric Step
        const topLid = new THREE.Mesh(
          new THREE.CylinderGeometry(0.37, 0.422, 0.055, 64),
          brushedGoldMat
        );
        topLid.position.y = 0.65;
        capGroup.add(topLid);

        const topLip = new THREE.Mesh(
          new THREE.TorusGeometry(0.355, 0.012, 16, 64),
          brushedGoldMat
        );
        topLip.rotation.x = Math.PI / 2;
        topLip.position.y = 0.678;
        capGroup.add(topLip);

        // 6. Solid Engraved Brushed-Gold Front Plaque with Physical Embossed Bump Map
        const initPlaque = createEngravedMetalPlaqueCanvases(
          monogramRef.current,
          moodRef.current
        );
        const plaqueColorTex = new THREE.CanvasTexture(initPlaque.colorCanvas);
        plaqueColorTex.colorSpace = THREE.SRGBColorSpace;
        plaqueColorTex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

        const plaqueBumpTex = new THREE.CanvasTexture(initPlaque.bumpCanvas);

        const plaqueBacking = new THREE.Mesh(
          new THREE.BoxGeometry(1.18, 1.27, 0.044),
          brushedGoldMat
        );
        plaqueBacking.position.set(0, -0.01, 0.742);
        plaqueBacking.renderOrder = 4;
        bottleGroup.add(plaqueBacking);

        const plaqueFaceMat = new THREE.MeshStandardMaterial({
          map: plaqueColorTex,
          bumpMap: plaqueBumpTex,
          bumpScale: 0.022,
          metalness: 0.86,
          roughness: 0.3,
          envMapIntensity: 1.35,
        });
        const plaqueFace = new THREE.Mesh(
          new THREE.PlaneGeometry(1.13, 1.22),
          plaqueFaceMat
        );
        plaqueFace.position.set(0, -0.01, 0.766);
        plaqueFace.renderOrder = 5;
        bottleGroup.add(plaqueFace);

        // 7. Rear Glass Laser-Etched Serial Inscription
        const backCanvas = createBackEngravingCanvas(moodRef.current);
        const backTex = new THREE.CanvasTexture(backCanvas);
        backTex.colorSpace = THREE.SRGBColorSpace;
        const backFace = new THREE.Mesh(
          new THREE.PlaneGeometry(1.12, 1.22),
          new THREE.MeshBasicMaterial({
            map: backTex,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
          })
        );
        backFace.position.set(0, -0.01, -0.744);
        backFace.rotation.y = Math.PI;
        backFace.renderOrder = 5;
        bottleGroup.add(backFace);

        // 8. Fine Olfactory Atomizer Mist Spray Particles (triggered by Test Mist button)
        const mistCount = 150;
        const mistPos = new Float32Array(mistCount * 3);
        const mistVel = new Float32Array(mistCount * 3);
        const mistGeom = new THREE.BufferGeometry();
        mistGeom.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
        const mistMat = new THREE.PointsMaterial({
          color: '#fde68a',
          size: 0.036,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const mistCloud = new THREE.Points(mistGeom, mistMat);
        bottleGroup.add(mistCloud);

        const resetMistParticles = () => {
          for (let i = 0; i < mistCount; i++) {
            mistPos[i * 3] = (Math.random() - 0.5) * 0.03;
            mistPos[i * 3 + 1] = 1.26 + (Math.random() - 0.5) * 0.02;
            mistPos[i * 3 + 2] = 0.23;

            mistVel[i * 3] = (Math.random() - 0.5) * 0.028;
            mistVel[i * 3 + 1] = 0.01 + Math.random() * 0.024;
            mistVel[i * 3 + 2] = 0.036 + Math.random() * 0.05;
          }
          mistGeom.attributes.position.needsUpdate = true;
        };
        resetMistParticles();

        // Sync callbacks
        simRef.current.updatePlaque = (text, mood) => {
          const next = createEngravedMetalPlaqueCanvases(text, mood);
          const cCtx = initPlaque.colorCanvas.getContext('2d');
          cCtx?.clearRect(0, 0, initPlaque.colorCanvas.width, initPlaque.colorCanvas.height);
          cCtx?.drawImage(next.colorCanvas, 0, 0);
          plaqueColorTex.needsUpdate = true;

          const bCtx = initPlaque.bumpCanvas.getContext('2d');
          bCtx?.clearRect(0, 0, initPlaque.bumpCanvas.width, initPlaque.bumpCanvas.height);
          bCtx?.drawImage(next.bumpCanvas, 0, 0);
          plaqueBumpTex.needsUpdate = true;
        };

        simRef.current.updateMood = (mood) => {
          const isAmber = mood === 'amber';

          // Update Studio HDRI & Backdrop
          const nextEnvTarget = createLuxuryStudioEnvTarget(THREE, renderer, mood);
          scene.environment = nextEnvTarget.texture;
          envTarget.dispose();
          envTarget = nextEnvTarget;

          const nextBack = createStudioBackdropCanvas(mood);
          const bgCtx = backdropCanvas.getContext('2d');
          bgCtx?.clearRect(0, 0, 1024, 1024);
          bgCtx?.drawImage(nextBack, 0, 0);
          backdropTex.needsUpdate = true;

          // Update Liquid Gradient, Glass Attenuation, Metals, Lights & Caustics
          const nextLiq = createLiquidVolumeCanvas(mood);
          const lCtx = liquidCanvas.getContext('2d');
          lCtx?.clearRect(0, 0, 512, 512);
          lCtx?.drawImage(nextLiq, 0, 0);
          liquidTex.needsUpdate = true;

          liquidMat.color.set(isAmber ? '#d97706' : '#1d4ed8');
          liquidMat.emissive.set(isAmber ? '#3a1400' : '#0f172a');
          crystalMat.attenuationColor.set(isAmber ? '#fff9ec' : '#e0f2fe');

          brushedGoldMat.color.set(isAmber ? '#cbb178' : '#cbd5e1');
          knurledGoldMat.color.set(isAmber ? '#cbb178' : '#cbd5e1');

          fillLight.color.set(isAmber ? '#ffd89c' : '#93c5fd');
          backWarmLight.color.set(isAmber ? '#d97706' : '#3b82f6');
          mistMat.color.set(isAmber ? '#fde68a' : '#e0f2fe');

          const nextCaustic = createCausticPoolCanvas(mood);
          const caCtx = causticCanvas.getContext('2d');
          caCtx?.clearRect(0, 0, 512, 512);
          caCtx?.drawImage(nextCaustic, 0, 0);
          causticTex.needsUpdate = true;

          const nextRear = createBackEngravingCanvas(mood);
          const rCtx = backCanvas.getContext('2d');
          rCtx?.clearRect(0, 0, 512, 640);
          rCtx?.drawImage(nextRear, 0, 0);
          backTex.needsUpdate = true;
        };

        simRef.current.triggerSpray = () => {
          resetMistParticles();
          simRef.current.mistTimer = 2.0;
          simRef.current.pauseAutoUntil = performance.now() + 2600;
        };

        simRef.current.externalUpdate = (deg) => {
          simRef.current.yaw = (deg * Math.PI) / 180;
          simRef.current.velYaw = 0;
          simRef.current.pauseAutoUntil = performance.now() + 3000;
        };

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
              s.yaw += dt * 0.25;
            }
            s.pitch += (0.16 - s.pitch) * Math.min(dt * 1.4, 0.08);
          }

          s.pitch = Math.max(-0.32, Math.min(0.46, s.pitch));

          // Orbit entire marble plinth & decanter smoothly together so veins reflect asymmetrically
          stageGroup.rotation.y = s.yaw;
          stageGroup.rotation.x = s.pitch;

          // Cap lift & fine mist burst
          if (s.mistTimer > 0) {
            s.mistTimer = Math.max(0, s.mistTimer - dt);
            const t = 2.0 - s.mistTimer;
            const capLift =
              t < 0.28
                ? (t / 0.28) * 0.56
                : t < 1.55
                ? 0.56
                : ((2.0 - t) / 0.45) * 0.56;
            capGroup.position.y = capRestY + Math.max(0, capLift);

            if (t > 0.16) {
              mistMat.opacity = Math.max(0, 0.85 * (1 - (t - 0.16) / 1.84));
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
            capGroup.position.y = capRestY;
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

        rafId = requestAnimationFrame(animate);

        cleanupScene = () => {
          ro.disconnect();
          envTarget.dispose();
          backdropTex.dispose();
          marbleMap.dispose();
          marbleRoughMap.dispose();
          causticTex.dispose();
          liquidTex.dispose();
          brushedBump.dispose();
          knurlTex.dispose();
          plaqueColorTex.dispose();
          plaqueBumpTex.dispose();
          backTex.dispose();
          marbleSlabGeom.dispose();
          crystalGeom.dispose();
          liquidGeom.dispose();
          tubeGeom.dispose();
          capLowerGeom.dispose();
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

    initPhotorealisticFlacon();

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
      // Ignore synthetic events
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
    s.pitch = Math.max(-0.32, Math.min(0.46, s.pitch + s.velPitch));
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
        className="absolute inset-0 pointer-events-none transition-all duration-700 blur-[110px] opacity-30"
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
          'relative my-4 sm:my-5 w-full flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-[#040508] border border-white/10',
          compact ? 'h-60 sm:h-72' : 'h-72 sm:h-96'
        )}
      >
        {webglReady ? (
          <div ref={stageRef} className="w-full h-full" aria-label={productTitle} />
        ) : (
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
              { label: '3/4 View', deg: 326 },
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
            Cut Crystal &amp; Knurled Gold
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
                Faceted Crystal
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">480g Plinth</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
              <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">
                Knurled Crown
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">Satin Gold Cap</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
              <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">
                Nero Marquina
              </span>
              <span className="text-[9px] sm:text-xs opacity-80">Marble Base</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
