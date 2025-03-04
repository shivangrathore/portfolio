import { useEffect, useRef, useState } from "react";

// TODO: Work on particles

type Particle = {
  x: number;
  y: number;
  r: number;
  c: string;
};

function createParticles(amount: number) {
  const particles: Particle[] = [];
  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1 + 1,
      c: `rgba(255, 255, 255, 0.1)`,
    });
  }
  return particles;
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(
      p.x * ctx.canvas.width,
      p.y * ctx.canvas.height,
      p.r,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = p.c;
    ctx.fill();
  });
  requestAnimationFrame(() => drawParticles(ctx, particles));
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState(createParticles(100));
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawParticles(ctx, particles);
  }, []);

  useEffect(() => {
    function updateParticles() {
      setParticles(createParticles(100));
    }
    window.addEventListener("resize", updateParticles);
    return () => {
      window.removeEventListener("resize", updateParticles);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 overflow-hidden -z-10"
      style={{ zIndex: -1 }}
    />
  );
}
