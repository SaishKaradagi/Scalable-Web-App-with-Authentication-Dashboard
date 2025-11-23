import { useEffect, useRef } from "react";

export default function AnimatedBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let beams: any[] = [];
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
      subtle: 0.7,
      medium: 0.85,
      strong: 1.0,
    };

    // Configuration
    const intensity = "strong"; // simplified for React

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function createBeam(w: number, h: number) {
      const angle = -35 + Math.random() * 10;
      return {
        x: Math.random() * w * 1.5 - w * 0.25,
        y: Math.random() * h * 1.5 - h * 0.25,
        width: 30 + Math.random() * 60,
        length: h * 2.5,
        angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 220 + Math.random() * 50, // Adjusted to Blue/Cyan range for "Tech" feel
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    function resetBeam(
      beam: any,
      index: number,
      totalBeams: number,
      w: number,
      h: number
    ) {
      const column = index % 3;
      const spacing = w / 3;
      beam.y = h + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 220 + (index * 50) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function updateCanvasSize() {
      if (!canvas || !container) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = container.getBoundingClientRect();

      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      const density = Math.min(1.5, Math.max(1, (w * h) / (1280 * 800)));
      const total = Math.floor(MINIMUM_BEAMS * density * 1.5);

      // Initialize beams if empty or resize needed
      if (beams.length !== total) {
        beams = Array.from({ length: total }, () => createBeam(w, h));
      }
    }

    function drawBeam(c: CanvasRenderingContext2D, beam: any) {
      c.save();
      c.translate(beam.x, beam.y);
      c.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        (opacityMap as any)[intensity];

      const gradient = c.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`
      );
      gradient.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`
      );
      gradient.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);

      c.fillStyle = gradient;
      c.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      c.restore();
    }

    function animate() {
      if (!canvas || !container || !ctx) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.clearRect(0, 0, w, h);
      // The blur effect is expensive, use CSS filter on canvas instead for performance if needed
      // ctx.filter = 'blur(35px)';

      const total = beams.length;
      for (let i = 0; i < total; i++) {
        const b = beams[i];
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;

        if (b.y + b.length < -100) {
          resetBeam(b, i, total, w, h);
        }
        drawBeam(ctx, b);
      }
      rafId = requestAnimationFrame(animate);
    }

    // Initial setup
    updateCanvasSize();
    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-neutral-950 overflow-hidden -z-10"
    >
      <div className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 mix-blend-screen blur-[20px]" // CSS Blur is faster
        />
        <div className="absolute inset-0 bg-neutral-950/5 backdrop-blur-3xl animate-pulse [animation-duration:8s]"></div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent"></div>
          <div className="absolute -inset-[25%] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(80,120,255,0.08),transparent)]"></div>
        </div>
      </div>
    </div>
  );
}
