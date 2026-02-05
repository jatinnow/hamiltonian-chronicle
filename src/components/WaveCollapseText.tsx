import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WaveCollapseTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const WaveCollapseText = ({ 
  children, 
  className = '', 
  delay = 0,
  as: Component = 'div' 
}: WaveCollapseTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        filter: 'blur(12px)', 
        opacity: 0, 
        y: 30 
      }}
      animate={isInView ? { 
        filter: 'blur(0px)', 
        opacity: 1, 
        y: 0 
      } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {Component === 'div' ? children : <Component>{children}</Component>}
    </motion.div>
  );
};

export default WaveCollapseText;
