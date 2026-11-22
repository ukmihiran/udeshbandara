/// <reference lib="webworker" />
/* Runs the hero cube's WebGL scene off the main thread on an OffscreenCanvas, so its set-up and
   rendering never block page input. Messages in: init, resize, running, pointer, dispose.
   Message out: "ready" after the first frame. */
import { createCubeScene, type CubeOptions, type CubeScene } from "./cube-scene";

type Message =
  | ({ type: "init"; canvas: OffscreenCanvas } & CubeOptions)
  | { type: "resize"; width: number; height: number }
  | { type: "running"; running: boolean }
  | { type: "pointer"; kind: "down" | "move" | "up"; x: number; y: number }
  | { type: "dispose" };

let cube: CubeScene | null = null;
let pending: Message[] = [];

self.onmessage = async (event: MessageEvent<Message>) => {
  const msg = event.data;
  if (msg.type === "init") {
    const { canvas, type: _type, ...opts } = msg;
    cube = await createCubeScene(canvas, opts, () => self.postMessage("ready"));
    for (const queued of pending) apply(queued);
    pending = [];
    return;
  }
  if (!cube) pending.push(msg);
  else apply(msg);
};

function apply(msg: Message) {
  if (!cube) return;
  if (msg.type === "resize") cube.resize(msg.width, msg.height);
  else if (msg.type === "running") cube.setRunning(msg.running);
  else if (msg.type === "pointer") cube.pointer(msg.kind, msg.x, msg.y);
  else if (msg.type === "dispose") {
    cube.dispose();
    cube = null;
    self.close();
  }
}
