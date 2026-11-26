import { BRAND_NAME } from '@/lib/constants';
import type * as ThreeNS from 'three';

export type FlaconMood = 'amber' | 'moonlight';

/**
 * Generates a moody out-of-focus dark luxury photography studio backdrop
 * so WebGL refractive crystal transmission samples realistic depth instead of flat void.
 */
export function createStudioBackdropCanvas(mood: FlaconMood): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#040508';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle textured bokeh cloud in upper/mid studio background
  const primaryGlow = ctx.createRadialGradient(480, 440, 20, 480, 440, 520);
  if (mood === 'amber') {
    primaryGlow.addColorStop(0, 'rgba(130, 74, 18, 0.34)');
    primaryGlow.addColorStop(0.45, 'rgba(56, 30, 10, 0.22)');
    primaryGlow.addColorStop(1, 'rgba(4, 5, 8, 0)');
  } else {
    primaryGlow.addColorStop(0, 'rgba(37, 99, 235, 0.28)');
    primaryGlow.addColorStop(0.45, 'rgba(20, 38, 82, 0.20)');
    primaryGlow.addColorStop(1, 'rgba(4, 5, 8, 0)');
  }
  ctx.fillStyle = primaryGlow;
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft unfocused stone/studio highlights left & lower-left like macro commercial lighting
  const leftSpot = ctx.createRadialGradient(180, 700, 10, 180, 700, 340);
  leftSpot.addColorStop(
    0,
    mood === 'amber' ? 'rgba(180, 110, 36, 0.16)' : 'rgba(96, 165, 250, 0.14)'
  );
  leftSpot.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftSpot;
  ctx.fillRect(0, 0, 1024, 1024);

  return canvas;
}

/**
 * Fine horizontal brushed satin champagne metal bump & roughness map.
 */
export function createBrushedMetalBumpCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y++) {
    const v = 108 + ((y * 37) % 42);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, 512, 1);
  }
  return canvas;
}

/**
 * Precision CNC-style diamond knurling normal-style height map for the cap grip collar.
 */
export function createDiamondKnurlCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#555555';
  ctx.fillRect(0, 0, 512, 256);

  const step = 16;
  for (let y = 0; y < 256; y += step) {
    for (let x = 0; x < 512; x += step) {
      const grad = ctx.createRadialGradient(
        x + step / 2,
        y + step / 2,
        1,
        x + step / 2,
        y + step / 2,
        step * 0.72
      );
      grad.addColorStop(0, '#f0f0f0');
      grad.addColorStop(0.65, '#8c8c8c');
      grad.addColorStop(1, '#262626');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(x + step / 2, y);
      ctx.lineTo(x + step, y + step / 2);
      ctx.lineTo(x + step / 2, y + step);
      ctx.lineTo(x, y + step / 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  return canvas;
}

/**
 * Solid brushed satin champagne-gold engraved label color + matching bump heightmap.
 * Matches QXYRA's metallic engraved gold plate with dark debossed serif lettering.
 */
export function createEngravedMetalPlaqueCanvases(
  monogramText: string,
  mood: FlaconMood
): { colorCanvas: HTMLCanvasElement; bumpCanvas: HTMLCanvasElement } {
  const w = 896;
  const h = 960;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = w;
  colorCanvas.height = h;
  const ctx = colorCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const bCtx = bumpCanvas.getContext('2d');

  if (!ctx || !bCtx) return { colorCanvas, bumpCanvas };

  // Satin champagne gold / brushed platinum metallic plate gradient
  const plateGrad = ctx.createLinearGradient(0, 0, w, h);
  if (mood === 'amber') {
    plateGrad.addColorStop(0, '#d8bc7e');
    plateGrad.addColorStop(0.28, '#c5a25b');
    plateGrad.addColorStop(0.58, '#e8d096');
    plateGrad.addColorStop(0.85, '#b69049');
    plateGrad.addColorStop(1, '#d3b574');
  } else {
    plateGrad.addColorStop(0, '#cbd5e1');
    plateGrad.addColorStop(0.35, '#94a3b8');
    plateGrad.addColorStop(0.6, '#e2e8f0');
    plateGrad.addColorStop(1, '#94a3b8');
  }
  ctx.fillStyle = plateGrad;
  ctx.fillRect(0, 0, w, h);

  // Neutral raised plateau in bump map (light grey = raised face; dark = engraved)
  bCtx.fillStyle = '#cfcfcf';
  bCtx.fillRect(0, 0, w, h);

  // Micro satin grain across metal plate
  for (let y = 0; y < h; y += 2) {
    const alpha = (y % 6 === 0 ? 0.035 : 0.015);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(0, y, w, 1);
    bCtx.fillStyle = y % 4 === 0 ? '#c8c8c8' : '#d5d5d5';
    bCtx.fillRect(0, y, w, 1);
  }

  const darkEtch = mood === 'amber' ? '#2c1f0a' : '#0f172a';
  const bevelHighlight =
    mood === 'amber' ? 'rgba(255, 245, 214, 0.55)' : 'rgba(255, 255, 255, 0.65)';

  // Outer recessed channel + hairline bevel border
  ctx.strokeStyle = bevelHighlight;
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  ctx.strokeStyle = darkEtch;
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  ctx.lineWidth = 2.5;
  ctx.strokeRect(52, 52, w - 104, h - 104);

  bCtx.strokeStyle = '#303030';
  bCtx.lineWidth = 8;
  bCtx.strokeRect(28, 28, w - 56, h - 56);
  bCtx.lineWidth = 4;
  bCtx.strokeRect(52, 52, w - 104, h - 104);

  // Helper to stamp engraved text with bottom micro-highlight and bump recess
  const stampText = (
    text: string,
    y: number,
    font: string,
    maxWidth?: number
  ) => {
    ctx.textAlign = 'center';
    ctx.font = font;
    ctx.fillStyle = bevelHighlight;
    ctx.fillText(text, w / 2, y + 3, maxWidth);
    ctx.fillStyle = darkEtch;
    ctx.fillText(text, w / 2, y, maxWidth);

    bCtx.textAlign = 'center';
    bCtx.font = font;
    bCtx.fillStyle = '#252525';
    bCtx.fillText(text, w / 2, y, maxWidth);
  };

  stampText('MAISON', 148, '600 28px Georgia, serif');
  stampText(BRAND_NAME, 268, 'bold 116px Georgia, serif', w - 140);

  // Delicate center rule
  ctx.fillStyle = bevelHighlight;
  ctx.fillRect(w / 2 - 140, 318, 280, 3);
  ctx.fillStyle = darkEtch;
  ctx.fillRect(w / 2 - 140, 315, 280, 3);
  bCtx.fillStyle = '#282828';
  bCtx.fillRect(w / 2 - 140, 315, 280, 4);

  stampText(
    mood === 'amber' ? 'NOCTURNE OUD' : 'MIDNIGHT NOIR',
    438,
    '500 66px Georgia, serif',
    w - 130
  );

  // Monogrammed Client Inscription Cartouche if provided
  const cleanMono = monogramText.trim().toUpperCase();
  if (cleanMono) {
    ctx.strokeStyle = darkEtch;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(148, 520, w - 296, 128);
    ctx.strokeStyle = bevelHighlight;
    ctx.strokeRect(150, 522, w - 300, 124);

    bCtx.strokeStyle = '#323232';
    bCtx.lineWidth = 4;
    bCtx.strokeRect(148, 520, w - 296, 128);

    stampText('ATELIER MONOGRAM', 562, '600 20px monospace');
    stampText(cleanMono.slice(0, 18), 618, 'bold 46px Georgia, serif', w - 330);
  } else {
    stampText('RESERVE PRIVEE', 585, 'italic 36px Georgia, serif');
  }

  stampText('EXTRAIT DE PARFUM', 775, '600 32px Georgia, serif');
  stampText('100ml   3.4 FL.OZ.', 842, '500 28px monospace');

  return { colorCanvas, bumpCanvas };
}

export function createBackEngravingCanvas(mood: FlaconMood): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const ink = mood === 'amber' ? 'rgba(248, 226, 166, 0.72)' : 'rgba(219, 234, 254, 0.72)';
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';

  ctx.lineWidth = 2.5;
  ctx.strokeRect(48, 60, canvas.width - 96, canvas.height - 120);

  ctx.font = 'bold 38px Georgia, serif';
  ctx.fillText(BRAND_NAME, canvas.width / 2, 175);
  ctx.font = '500 17px monospace';
  ctx.fillText('HAUTE PARFUMERIE', canvas.width / 2, 222);

  ctx.fillRect(canvas.width / 2 - 80, 256, 160, 1.5);
  ctx.font = 'italic 24px Georgia, serif';
  ctx.fillText('Maceration Privee', canvas.width / 2, 316);
  ctx.font = '400 18px monospace';
  ctx.fillText('38% BOTANICAL EXTRAIT', canvas.width / 2, 376);
  ctx.fillText('GRASSE · FRANCE', canvas.width / 2, 416);

  ctx.fillRect(canvas.width / 2 - 80, 454, 160, 1.5);
  ctx.font = 'bold 20px monospace';
  ctx.fillText('EDITION N° 001 / 500', canvas.width / 2, 514);

  return canvas;
}

/**
 * Rich translucent cognac-amber or deep midnight-sapphire texture for the internal parfum liquid.
 * Dark burnt edges + warm illuminated golden core mimic authentic backlit glass oil.
 */
export function createLiquidVolumeCanvas(mood: FlaconMood): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  if (mood === 'amber') {
    vGrad.addColorStop(0, '#5c2806');
    vGrad.addColorStop(0.2, '#8b4108');
    vGrad.addColorStop(0.55, '#c46a0d');
    vGrad.addColorStop(0.85, '#8a3d07');
    vGrad.addColorStop(1, '#4b1f03');
  } else {
    vGrad.addColorStop(0, '#0c1836');
    vGrad.addColorStop(0.25, '#172e66');
    vGrad.addColorStop(0.55, '#2563eb');
    vGrad.addColorStop(0.85, '#162859');
    vGrad.addColorStop(1, '#091126');
  }
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Luminous golden center heart glow
  const core = ctx.createRadialGradient(256, 285, 24, 256, 285, 235);
  if (mood === 'amber') {
    core.addColorStop(0, 'rgba(245, 168, 42, 0.72)');
    core.addColorStop(0.55, 'rgba(180, 88, 12, 0.25)');
    core.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    core.addColorStop(0, 'rgba(96, 165, 250, 0.55)');
    core.addColorStop(0.55, 'rgba(37, 99, 235, 0.2)');
    core.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, 512, 512);

  return canvas;
}

/**
 * Veined Nero Marquina dark marble slab texture + gloss/roughness map.
 */
export function createMarbleSlabCanvases(): {
  colorCanvas: HTMLCanvasElement;
  roughnessCanvas: HTMLCanvasElement;
} {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d');

  const roughnessCanvas = document.createElement('canvas');
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const rCtx = roughnessCanvas.getContext('2d');

  if (!ctx || !rCtx) return { colorCanvas, roughnessCanvas };

  ctx.fillStyle = '#090b0f';
  ctx.fillRect(0, 0, size, size);

  rCtx.fillStyle = '#242424'; // Mirror-polished low roughness dark marble
  rCtx.fillRect(0, 0, size, size);

  // Subtle dark stone mineral variation
  const stoneGlow = ctx.createRadialGradient(256, 256, 30, 256, 256, 280);
  stoneGlow.addColorStop(0, 'rgba(28, 25, 22, 0.55)');
  stoneGlow.addColorStop(1, 'rgba(6, 7, 10, 0)');
  ctx.fillStyle = stoneGlow;
  ctx.fillRect(0, 0, size, size);

  // Organic white & subtle warm gold diagonal calcite veins
  const drawVein = (
    points: [number, number][],
    color: string,
    width: number,
    roughVal: string
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();

    rCtx.strokeStyle = roughVal;
    rCtx.lineWidth = width + 1;
    rCtx.beginPath();
    rCtx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      rCtx.lineTo(points[i][0], points[i][1]);
    }
    rCtx.stroke();
  };

  drawVein(
    [
      [15, 420],
      [110, 355],
      [185, 330],
      [285, 255],
      [390, 210],
      [495, 130],
    ],
    'rgba(226, 232, 240, 0.36)',
    2.2,
    '#525252'
  );
  drawVein(
    [
      [185, 330],
      [240, 395],
      [330, 445],
      [430, 495],
    ],
    'rgba(226, 232, 240, 0.22)',
    1.4,
    '#444444'
  );
  drawVein(
    [
      [40, 145],
      [140, 185],
      [220, 175],
      [355, 85],
      [475, 45],
    ],
    'rgba(218, 175, 98, 0.24)',
    1.6,
    '#484848'
  );

  return { colorCanvas, roughnessCanvas };
}

/**
 * Soft optical glass caustic pool cast onto the marble around the flacon base.
 */
export function createCausticPoolCanvas(mood: FlaconMood): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, 512, 512);
  const grad = ctx.createRadialGradient(256, 256, 28, 256, 256, 240);
  if (mood === 'amber') {
    grad.addColorStop(0, 'rgba(245, 165, 35, 0.55)');
    grad.addColorStop(0.35, 'rgba(217, 119, 6, 0.28)');
    grad.addColorStop(0.7, 'rgba(146, 64, 14, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    grad.addColorStop(0, 'rgba(96, 165, 250, 0.45)');
    grad.addColorStop(0.35, 'rgba(37, 99, 235, 0.22)');
    grad.addColorStop(0.7, 'rgba(30, 58, 138, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  return canvas;
}

/**
 * Custom Dark Luxury Softbox Studio HDRI Environment via PMREMGenerator.
 * Eliminates the milky neutral gray reflections of RoomEnvironment so cut-crystal
 * shows razor-sharp specular highlights and deep glossy dark crystal contrast.
 */
export function createLuxuryStudioEnvTarget(
  THREE: typeof ThreeNS,
  renderer: ThreeNS.WebGLRenderer,
  mood: FlaconMood
): ThreeNS.WebGLRenderTarget {
  const studioScene = new THREE.Scene();
  studioScene.background = new THREE.Color('#020305');

  const disposables: { dispose: () => void }[] = [];

  const addSoftbox = (
    w: number,
    h: number,
    colorHex: string,
    intensity: number,
    pos: [number, number, number],
    lookAt: [number, number, number] = [0, 0, 0]
  ) => {
    const c = new THREE.Color(colorHex).multiplyScalar(intensity);
    const geom = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide });
    disposables.push(geom, mat);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    studioScene.add(mesh);
  };

  // Tall crisp left & right photography strip softboxes -> vertical facet highlights
  addSoftbox(2.2, 11.0, '#fff5e4', 5.2, [-8.5, 2.5, 5.5]);
  addSoftbox(1.8, 11.0, mood === 'amber' ? '#ffd28a' : '#bfdbfe', 4.6, [8.5, 2.0, 5.0]);

  // Overhead diffused studio key hairlight -> illuminates 45° beveled shoulder & cap
  addSoftbox(7.5, 4.0, '#fffaf0', 4.4, [0, 9.5, 2.0]);

  // Subtle rear amber/sapphire backlight bounce -> crystal edge refraction sparkle
  addSoftbox(6.0, 8.0, mood === 'amber' ? '#e59a32' : '#3b82f6', 3.4, [0, 1.5, -8.5]);

  // Gentle side rim kicks
  addSoftbox(1.2, 8.0, '#ffffff', 3.0, [-7.5, 0.5, -4.5]);
  addSoftbox(1.2, 8.0, mood === 'amber' ? '#f5c26b' : '#93c5fd', 2.8, [7.5, 0.5, -4.5]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const rt = pmrem.fromScene(studioScene, 0.03);
  pmrem.dispose();
  disposables.forEach((item) => item.dispose());

  return rt;
}
