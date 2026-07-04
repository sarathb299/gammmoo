import React, { useEffect, useRef } from 'react';

export default function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse position with smoothing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    interface Particle {
      x: number;
      y: number;
      z: number; // 3D depth coordinate
      ox: number; // original relative x
      oy: number; // original relative y
      size: number;
      color: string;
      speed: number;
      angle: number;
      distance: number;
    }

    const particleCount = Math.min(220, Math.floor((width * height) / 4500));
    const particles: Particle[] = [];

    // Green palette for luxury digital marketing vibe
    const colors = [
      'rgba(74, 222, 128, 0.15)', // light glowing green
      'rgba(45, 161, 81, 0.2)',   // mint emerald
      'rgba(21, 69, 34, 0.25)',   // deep forest green
      'rgba(252, 253, 253, 0.15)', // premium soft white star
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (Math.min(width, height) * 0.45) + 30;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400 + 100,
        ox: Math.cos(angle) * distance,
        oy: Math.sin(angle) * distance,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: (Math.random() * 0.001) + 0.0004,
        angle: angle,
        distance: distance,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const render = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      
      // Transparent clearing so background adapts dynamically
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle orbital rings to establish a high-end luxury watchmaking grid structure
      ctx.strokeStyle = isLight ? 'rgba(21, 69, 34, 0.035)' : 'rgba(74, 222, 128, 0.025)';
      ctx.lineWidth = 1;
      const ringCount = 3;
      const cx = width / 2;
      const cy = height / 2;

      for (let r = 1; r <= ringCount; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.min(width, height) * 0.15 * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw subtle grid lines representing search engine nodes (GEO/AEO structure)
      ctx.strokeStyle = isLight ? 'rgba(21, 69, 34, 0.012)' : 'rgba(74, 222, 128, 0.012)';
      ctx.beginPath();
      for (let x = 0; x < width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render star clusters
      particles.forEach((p) => {
        // Slow rotation around center
        p.angle += p.speed;
        p.ox = Math.cos(p.angle) * p.distance;
        p.oy = Math.sin(p.angle) * p.distance;

        // Base 3D projecting coordinate
        const center_x = width / 2;
        const center_y = height / 2;
        let px = center_x + p.ox;
        let py = center_y + p.oy;

        // Apply mouse gravity warp
        if (mouse.active) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const force = (250 - dist) / 250;
            // Pull or push slightly depending on distance
            px -= dx * force * 0.25;
            py -= dy * force * 0.25;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        
        let pColor = p.color;
        if (isLight) {
          if (p.color.includes('252, 253, 253') || p.color.includes('255, 255, 255')) {
            pColor = 'rgba(21, 69, 34, 0.2)';
          } else if (p.color.includes('74, 222, 128')) {
            pColor = 'rgba(45, 161, 81, 0.4)';
          } else if (p.color.includes('45, 161, 81')) {
            pColor = 'rgba(31, 100, 50, 0.35)';
          } else {
            pColor = 'rgba(13, 34, 18, 0.3)';
          }
        }
        ctx.fillStyle = pColor;
        ctx.fill();

        // Connect near neighbors with extremely faint glowing web links (like a neural search index)
        particles.forEach((other) => {
          if (p === other) return;
          const dx = p.ox - other.ox;
          const dy = p.oy - other.oy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 50 && p.distance < width * 0.3) {
            const connectionColor = isLight ? `rgba(21, 69, 34, ${0.025 * (1 - d / 50)})` : `rgba(74, 222, 128, ${0.015 * (1 - d / 50)})`;
            ctx.strokeStyle = connectionColor;
            ctx.beginPath();
            ctx.moveTo(px, py);
            // find projected coordinates of other
            const opx = center_x + other.ox;
            const opy = center_y + other.oy;
            ctx.lineTo(opx, opy);
            ctx.stroke();
          }
        });
      });

      // Ambient gradient spotlight representing LiquidEther
      const liquidGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        350
      );
      if (isLight) {
        liquidGlow.addColorStop(0, 'rgba(45, 161, 81, 0.08)');
        liquidGlow.addColorStop(0.5, 'rgba(21, 69, 34, 0.03)');
        liquidGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        liquidGlow.addColorStop(0, 'rgba(74, 222, 128, 0.05)');
        liquidGlow.addColorStop(0.5, 'rgba(21, 69, 34, 0.02)');
        liquidGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = liquidGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 350, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      id="galaxy-canvas"
    />
  );
}
