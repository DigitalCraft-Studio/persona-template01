import React, { useEffect, useRef } from 'react';
import '../styles/GeometricBackground.css';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface GeometricBackgroundProps {
  className?: string;
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas context not available');
      return;
    }

    console.log('Geometric background initializing...');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize points
    const initPoints = () => {
      const points: Point[] = [];
      const numPoints = Math.floor((canvas.width * canvas.height) / 40000); // Balanced number of points
      
      console.log(`Creating ${numPoints} points`);
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Moderate movement
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5 // Smaller dots for subtlety
        });
      }
      pointsRef.current = points;
    };

    initPoints();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      console.log('Mouse moved to:', mouseRef.current.x, mouseRef.current.y);
    };

    // Add mouse event listeners to both canvas and window
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 60 === 0) {
        console.log('Animation running, frame:', frameCount);
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Update and draw points
      points.forEach((point, index) => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;

        // Keep points within bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));

        // Mouse interaction
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          point.vx -= (dx / distance) * force * 0.02;
          point.vy -= (dy / distance) * force * 0.02;
        }

        // Draw point with pulsing effect
        const time = Date.now() * 0.001;
        const pulse = prefersReducedMotion ? 1 : Math.sin(time * 2 + index * 0.5) * 0.3 + 1;
        const currentRadius = point.radius * pulse;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#d4af37';
        ctx.fill();

        // Add enhanced glow effect
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, currentRadius * 4);
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
        gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.1)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw connecting lines with animated opacity
      const time = Date.now() * 0.001;
      points.forEach((point1, i) => {
        points.slice(i + 1).forEach((point2, j) => {
          const dx = point1.x - point2.x;
          const dy = point1.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const baseOpacity = (150 - distance) / 150;
            const animatedOpacity = prefersReducedMotion ? baseOpacity : baseOpacity * (0.5 + 0.5 * Math.sin(time + i + j));
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${animatedOpacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw mouse interaction lines with enhanced effects
      points.forEach((point) => {
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const opacity = (120 - distance) / 120;
          const animatedOpacity = prefersReducedMotion ? opacity : opacity * (0.7 + 0.3 * Math.sin(time * 3));
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(255, 215, 0, ${animatedOpacity * 0.8})`;
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // Add a subtle glow around mouse interaction
          const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 1);
          gradient.addColorStop(0, 'rgba(255, 215, 0, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`geometric-background ${className || ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'auto',
        background: 'transparent'
      }}
    />
  );
};

export default GeometricBackground; 