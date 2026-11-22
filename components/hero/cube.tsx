"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

/* The hero's Rubik's cube.
   - Server HTML shows /cube-poster.png: a capture of the WebGL scene's exact first frame (same
     pose, framing, lighting and stickers). It paints instantly and is the no-JavaScript and
     no-WebGL fallback. Regenerate it with `npm run cube:poster` whenever the scene's look changes.
   - As soon as the page is idle, the scene starts in a worker (./cube.worker.ts), renders that
     same first frame, and replaces the poster with no visible change; then the motion begins.
   Purely decorative: hidden from assistive tech. */

/** The poster through Next's image optimiser (AVIF/WebP at 640px wide covers 2x screens). */
const POSTER = getImageProps({ src: "/cube-poster.png", alt: "", width: 640, height: 640, quality: 80 }).props.src;

export function HeroCube({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let started = false;
    let teardown: (() => void) | null = null;

    const load = async () => {
      if (started || disposed) return;
      started = true;
      removeTriggers();
      // No WebGL (old device, blocked GPU): keep the static cube.
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const size = () => ({ width: canvas.clientWidth, height: canvas.clientHeight });
      const onReady = () => !disposed && setReady(true);

      // Preferred: the whole scene runs in a worker, so it never blocks page input.
      // Fallback: the same scene on the main thread, built in small steps.
      let send: (msg: Record<string, unknown>) => void;
      let stopScene: () => void;
      if ("transferControlToOffscreen" in canvas && typeof Worker !== "undefined") {
        let offscreen: OffscreenCanvas;
        try {
          offscreen = canvas.transferControlToOffscreen();
        } catch {
          return; // already transferred (remount): keep the static cube
        }
        const worker = new Worker(new URL("./cube.worker.ts", import.meta.url), { type: "module" });
        worker.onmessage = (e) => e.data === "ready" && onReady();
        worker.postMessage(
          { type: "init", canvas: offscreen, ...size(), dpr: window.devicePixelRatio, reducedMotion },
          [offscreen],
        );
        send = (msg) => worker.postMessage(msg);
        stopScene = () => {
          worker.postMessage({ type: "dispose" });
          window.setTimeout(() => worker.terminate(), 500);
        };
      } else {
        const { createCubeScene } = await import("./cube-scene");
        if (disposed) return;
        const cube = await createCubeScene(canvas, { ...size(), dpr: window.devicePixelRatio, reducedMotion }, onReady);
        if (disposed) return cube.dispose();
        send = (msg) => {
          if (msg.type === "resize") cube.resize(msg.width as number, msg.height as number);
          else if (msg.type === "running") cube.setRunning(msg.running as boolean);
          else if (msg.type === "pointer") cube.pointer(msg.kind as "down", msg.x as number, msg.y as number);
        };
        stopScene = () => cube.dispose();
      }

      // Animate only while on screen and the tab is visible.
      let onScreen = true;
      const sync = () => send({ type: "running", running: onScreen && !document.hidden });
      const io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      });
      io.observe(canvas);
      const ro = new ResizeObserver(() => send({ type: "resize", ...size() }));
      ro.observe(canvas);
      document.addEventListener("visibilitychange", sync);

      const pointer = (kind: "down" | "move" | "up") => (e: PointerEvent) => {
        if (kind === "down") canvas.setPointerCapture(e.pointerId);
        send({ type: "pointer", kind, x: e.clientX, y: e.clientY });
      };
      const handlers = { pointerdown: pointer("down"), pointermove: pointer("move"), pointerup: pointer("up"), pointercancel: pointer("up") };
      if (!reducedMotion) for (const [type, fn] of Object.entries(handlers)) canvas.addEventListener(type, fn as EventListener);
      sync();

      teardown = () => {
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", sync);
        for (const [type, fn] of Object.entries(handlers)) canvas.removeEventListener(type, fn as EventListener);
        stopScene();
      };
      if (disposed) teardown();
    };

    // The 3D scene is decoration: start it after the page has loaded and settled, or as soon as
    // the visitor first interacts, whichever comes first, so it never competes with first paint.
    const interactions = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const onInteract = () => void load();
    const removeTriggers = () => interactions.forEach((type) => window.removeEventListener(type, onInteract));
    interactions.forEach((type) => window.addEventListener(type, onInteract, { once: true, passive: true }));

    // The poster already shows the scene's exact first frame, so starting later is invisible:
    // start once the page has loaded and the browser is idle (worker), or after a short settle on
    // the main-thread fallback, so start-up never competes with loading. A first interaction
    // starts it at once.
    const offThread = "transferControlToOffscreen" in canvas && typeof Worker !== "undefined";
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    let timer = 0;
    const afterLoad = () => {
      if (offThread) idle(() => void load(), { timeout: 1500 });
      else timer = window.setTimeout(() => void load(), 1500);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.removeEventListener("load", afterLoad);
      removeTriggers();
      teardown?.();
    };
  }, []);

  return (
    <div data-hero-cube aria-hidden className={cn("relative", className)}>
      {/* A CSS background, not an <img> or a preload: in lab tests (Lighthouse/PageSpeed) an image
          element or preload here triggers a ~350ms probe task that is billed to the page as
          blocking time. Visually identical, and still discovered in the first HTML. */}
      <div
        data-cube-poster
        className={cn("absolute inset-0 bg-contain bg-center bg-no-repeat", ready && "invisible")}
        style={{ backgroundImage: `url(${POSTER})` }}
      />
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 size-full touch-pan-y opacity-0", ready && "cursor-grab opacity-100 active:cursor-grabbing")}
      />
    </div>
  );
}
