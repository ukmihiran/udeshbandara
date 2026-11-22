/* WebGL Rubik's cube for the hero. Runs in a Web Worker on an OffscreenCanvas when the browser
   supports it (components/hero/cube.worker.ts), else on the main thread. It never touches the
   DOM: the host passes size, visibility and pointer input in.
   27 rounded, glossy black cubelets lit by a studio environment, a few green stickers, eased
   layer turns on all three axes, a slow tumble, and drag-to-spin with momentum. */
import {
  ACESFilmicToneMapping,
  Group,
  MathUtils,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type Axis = "x" | "y" | "z";
type Move = { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 };

export type CubeOptions = { width: number; height: number; dpr: number; reducedMotion: boolean };
export type CubeScene = {
  resize: (width: number, height: number) => void;
  setRunning: (running: boolean) => void;
  pointer: (kind: "down" | "move" | "up", x: number, y: number) => void;
  dispose: () => void;
};

const TURN_MS = 700;
const PAUSE_MS = 450;
const BASE_PITCH = 0.5;
const SIZE = 0.94; // cubelet edge; 1.0 spacing leaves the thin dark seams that make it read as a cube

/** Sticker faces as [cubelet position, outward normal]: the green accents the turns scramble. */
const STICKERS: [Vector3, Vector3][] = [
  [new Vector3(1, 1, 1), new Vector3(0, 0, 1)],
  [new Vector3(-1, 1, 0), new Vector3(0, 1, 0)],
  [new Vector3(1, 0, -1), new Vector3(1, 0, 0)],
  [new Vector3(0, -1, 1), new Vector3(0, 0, 1)],
  [new Vector3(-1, -1, -1), new Vector3(-1, 0, 0)],
  [new Vector3(0, 1, -1), new Vector3(0, 1, 0)],
];

function roundedSquare(size: number, radius: number): ShapeGeometry {
  const s = size / 2;
  const shape = new Shape();
  shape.moveTo(-s + radius, -s);
  shape.lineTo(s - radius, -s);
  shape.quadraticCurveTo(s, -s, s, -s + radius);
  shape.lineTo(s, s - radius);
  shape.quadraticCurveTo(s, s, s - radius, s);
  shape.lineTo(-s + radius, s);
  shape.quadraticCurveTo(-s, s, -s, s - radius);
  shape.lineTo(-s, -s + radius);
  shape.quadraticCurveTo(-s, -s, -s + radius, -s);
  return new ShapeGeometry(shape, 8);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function nextMove(prev: Move | null): Move {
  const axes: Axis[] = ["x", "y", "z"];
  for (;;) {
    const move: Move = {
      axis: axes[Math.floor(Math.random() * 3)],
      layer: ([-1, 0, 1] as const)[Math.floor(Math.random() * 3)],
      dir: Math.random() < 0.5 ? 1 : -1,
    };
    // Never undo the previous turn: that reads as a stutter.
    if (!prev || move.axis !== prev.axis || move.layer !== prev.layer || move.dir === prev.dir) return move;
  }
}

/** Yield between set-up steps so a main-thread fallback never blocks input for long. */
const yieldNow = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/**
 * Builds the scene in small steps (renderer, environment, meshes, async shader compile) and
 * renders the first frame. Resolves to the scene's controls; `onReady` fires after frame one.
 */
export async function createCubeScene(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  opts: CubeOptions,
  onReady: () => void,
): Promise<CubeScene> {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(opts.dpr, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  await yieldNow();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  await yieldNow();

  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 11.5);

  const body = new MeshPhysicalMaterial({
    color: 0x0f1012,
    metalness: 0.55,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.15,
  });
  const sticker = new MeshPhysicalMaterial({
    color: 0x16c060,
    emissive: 0x03210f,
    metalness: 0.05,
    roughness: 0.32,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const boxGeometry = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 3, 0.12);
  const stickerGeometry = roundedSquare(SIZE * 0.78, 0.1);

  const root = new Group();
  root.rotation.set(BASE_PITCH, -0.65, 0);
  scene.add(root);

  const cubies: Object3D[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1]) {
        const cubie = new Group();
        cubie.position.set(x, y, z);
        cubie.add(new Mesh(boxGeometry, body));
        for (const [at, normal] of STICKERS) {
          if (at.x !== x || at.y !== y || at.z !== z) continue;
          const plate = new Mesh(stickerGeometry, sticker);
          plate.position.copy(normal).multiplyScalar(SIZE / 2 + 0.002);
          plate.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), normal);
          cubie.add(plate);
        }
        root.add(cubie);
        cubies.push(cubie);
      }

  const pivot = new Object3D();
  root.add(pivot);

  const resize = (w: number, h: number) => {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the whole cube in frame on narrow, tall containers.
    camera.position.z = w / h < 1 ? 11.5 / Math.max(0.72, w / h) : 11.5;
    camera.updateProjectionMatrix();
  };
  resize(opts.width, opts.height);

  // Compile shaders without stalling where the driver supports it (KHR_parallel_shader_compile).
  await renderer.compileAsync(scene, camera);

  let move: Move | null = null;
  let prevMove: Move | null = null;
  let moveStart = 0;
  let nextAt = performance.now() + 500;

  const startMove = (now: number) => {
    move = nextMove(prevMove);
    moveStart = now;
    pivot.rotation.set(0, 0, 0);
    for (const c of cubies) if (Math.round(c.position[move.axis]) === move.layer) pivot.attach(c);
  };
  const endMove = () => {
    if (!move) return;
    pivot.rotation[move.axis] = (move.dir * Math.PI) / 2;
    pivot.updateMatrixWorld(true);
    const snap = new Matrix4();
    const q = new Quaternion();
    for (const c of [...pivot.children]) {
      root.attach(c);
      c.position.set(Math.round(c.position.x), Math.round(c.position.y), Math.round(c.position.z));
      // Snap the orientation to exact quarter turns so float error never accumulates.
      snap.makeRotationFromQuaternion(c.quaternion);
      const e = snap.elements;
      for (let i = 0; i < 16; i++) e[i] = Math.round(e[i]);
      c.quaternion.copy(q.setFromRotationMatrix(snap));
    }
    pivot.rotation.set(0, 0, 0);
    prevMove = move;
    move = null;
  };

  // Drag to spin; momentum decays back into the idle tumble.
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velYaw = 0;
  let velPitch = 0;
  const pointer: CubeScene["pointer"] = (kind, x, y) => {
    if (opts.reducedMotion) return;
    if (kind === "down") {
      dragging = true;
      velYaw = velPitch = 0;
    } else if (kind === "move" && dragging) {
      velYaw = (x - lastX) * 0.01;
      velPitch = (y - lastY) * 0.008;
      root.rotation.y += velYaw;
      root.rotation.x = MathUtils.clamp(root.rotation.x + velPitch, -0.6, 1.3);
      if (!raf) draw();
    } else if (kind === "up") {
      dragging = false;
    }
    lastX = x;
    lastY = y;
  };

  const raf_ = globalThis.requestAnimationFrame?.bind(globalThis) ?? ((cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number);
  const caf_ = globalThis.cancelAnimationFrame?.bind(globalThis) ?? ((id: number) => clearTimeout(id));

  let raf = 0;
  let last = performance.now();
  let first = true;

  const draw = () => {
    renderer.render(scene, camera);
    if (first) {
      first = false;
      onReady();
    }
  };

  const frame = (now: number) => {
    const dt = Math.min(64, now - last) / 1000;
    last = now;
    if (!dragging) {
      velYaw *= 0.93;
      velPitch *= 0.88;
      root.rotation.y += velYaw + dt * 0.22;
      root.rotation.x += velPitch + (BASE_PITCH + Math.sin(now / 4200) * 0.08 - root.rotation.x) * 0.02;
    }
    if (!move && now >= nextAt) startMove(now);
    if (move) {
      const t = Math.min(1, (now - moveStart) / TURN_MS);
      pivot.rotation[move.axis] = move.dir * (Math.PI / 2) * easeInOut(t);
      if (t >= 1) {
        endMove();
        nextAt = now + PAUSE_MS;
      }
    }
    draw();
    raf = raf_(frame);
  };

  const setRunning = (running: boolean) => {
    if (running && !raf && !opts.reducedMotion) {
      last = performance.now();
      raf = raf_(frame);
    } else if (!running && raf) {
      caf_(raf);
      raf = 0;
    }
  };

  draw(); // first frame, also the still frame under reduced motion

  return {
    resize: (w, h) => {
      resize(w, h);
      if (!raf) draw();
    },
    setRunning,
    pointer,
    dispose: () => {
      setRunning(false);
      boxGeometry.dispose();
      stickerGeometry.dispose();
      body.dispose();
      sticker.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
