import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface ObserverPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const ObserverPhoto = ({ src, alt, className = '' }: ObserverPhotoProps) => {
  const containerRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  // Trigger glitch on scroll into view
  useState(() => {
    const timeout = setTimeout(() => setIsGlitching(false), 1500);
    return () => clearTimeout(timeout);
  });

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ opacity, scale }}
    >
      {/* Interference pattern overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {isGlitching && (
          <>
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.3, repeat: 3 }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 166, 255, 0.1) 2px, rgba(0, 166, 255, 0.1) 4px)',
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </>
        )}
      </div>

      {/* Main image */}
      <motion.div
        className="relative overflow-hidden rounded-sm"
        initial={{ filter: 'blur(8px) saturate(0)' }}
        animate={{ filter: 'blur(0px) saturate(1)' }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          style={{ aspectRatio: '3/4' }}
        />
        
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.1) 1px, rgba(0, 0, 0, 0.1) 2px)',
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <div 
        className="absolute -inset-4 -z-10 opacity-30 blur-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(200, 100%, 55%) 0%, transparent 70%)',
        }}
      />

      {/* Frame accent */}
      <div className="absolute -bottom-2 -right-2 w-full h-full border border-primary/20 rounded-sm -z-10" />
    </motion.div>
  );
};

export default ObserverPhoto;
