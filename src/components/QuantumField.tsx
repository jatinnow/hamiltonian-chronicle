import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spin: number;
  energy: number;
}

interface QuantumFieldProps {
  className?: string;
}

const QuantumField = ({ className = '' }: QuantumFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, velocity: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollY } = useScroll();
  const scrollVelocity = useTransform(scrollY, [0, 1000], [0, 1]);

  // Initialize particles as an Ising-like lattice
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 5, // Cover full scroll height
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const gridSize = 60;
    const cols = Math.ceil(dimensions.width / gridSize);
    const rows = Math.ceil(dimensions.height / gridSize);
    const particles: Particle[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Add some randomness to lattice positions
        particles.push({
          x: i * gridSize + (Math.random() - 0.5) * 20,
          y: j * gridSize + (Math.random() - 0.5) * 20,
          vx: 0,
          vy: 0,
          spin: Math.random() > 0.5 ? 1 : -1, // Ising model spin
          energy: Math.random(),
        });
      }
    }

    particlesRef.current = particles;
  }, [dimensions]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        velocity: Math.min(velocity / 10, 1),
      };
      
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollOffset = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Draw lattice connections and particles
      particlesRef.current.forEach((particle, i) => {
        // Only render particles near viewport
        if (particle.y < scrollOffset - 100 || particle.y > scrollOffset + viewportHeight + 100) {
          return;
        }

        const screenY = particle.y - scrollOffset;

        // Mouse interaction - field excitation
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200 * mouseRef.current.velocity;
          particle.vx += (dx / dist) * force * 0.5;
          particle.vy += (dy / dist) * force * 0.5;
          particle.energy = Math.min(1, particle.energy + force * 0.1);
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.energy *= 0.99;

        // Draw connections to nearby particles (lattice bonds)
        particlesRef.current.slice(i + 1).forEach((other) => {
          if (other.y < scrollOffset - 100 || other.y > scrollOffset + viewportHeight + 100) {
            return;
          }

          const odx = other.x - particle.x;
          const ody = other.y - particle.y;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < 80) {
            const otherScreenY = other.y - scrollOffset;
            const alpha = (1 - odist / 80) * 0.15;
            
            // Color based on spin alignment (ferromagnetic coupling)
            const aligned = particle.spin === other.spin;
            const gradient = ctx.createLinearGradient(
              particle.x, screenY,
              other.x, otherScreenY
            );
            
            if (aligned) {
              gradient.addColorStop(0, `hsla(200, 100%, 55%, ${alpha})`);
              gradient.addColorStop(1, `hsla(200, 100%, 55%, ${alpha})`);
            } else {
              gradient.addColorStop(0, `hsla(42, 90%, 55%, ${alpha * 0.5})`);
              gradient.addColorStop(1, `hsla(42, 90%, 55%, ${alpha * 0.5})`);
            }

            ctx.beginPath();
            ctx.moveTo(particle.x, screenY);
            ctx.lineTo(other.x, otherScreenY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw particle (lattice site)
        const baseAlpha = 0.3 + particle.energy * 0.4;
        const baseSize = 1.5 + particle.energy * 2;
        
        // Glow effect for excited particles
        if (particle.energy > 0.1) {
          const glowGradient = ctx.createRadialGradient(
            particle.x, screenY, 0,
            particle.x, screenY, baseSize * 4
          );
          glowGradient.addColorStop(0, `hsla(200, 100%, 60%, ${particle.energy * 0.3})`);
          glowGradient.addColorStop(1, 'transparent');
          
          ctx.beginPath();
          ctx.arc(particle.x, screenY, baseSize * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, screenY, baseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.spin > 0 
          ? `hsla(200, 100%, 55%, ${baseAlpha})`
          : `hsla(42, 90%, 55%, ${baseAlpha * 0.6})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={window.innerHeight}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ 
        opacity: 0.8,
        zIndex: 0,
      }}
    />
  );
};

export default QuantumField;
