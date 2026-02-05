import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  stickyHeight?: string;
}

const StickySection = ({ 
  children, 
  className = '',
  stickyHeight = '200vh'
}: StickySectionProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ height: stickyHeight }}
    >
      <motion.div 
        className="sticky top-0 min-h-screen flex items-center justify-center"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default StickySection;
