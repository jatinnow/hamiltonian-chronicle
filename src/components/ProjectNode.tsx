import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import WaveCollapseText from './WaveCollapseText';

interface ProjectNodeProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  index: number;
}

const ProjectNode = ({ title, description, tags, link, index }: ProjectNodeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Connection line to represent perturbation */}
      <div className="absolute -left-8 top-1/2 w-6 h-px bg-gradient-to-r from-transparent to-primary/30 hidden md:block" />
      
      <div className="relative p-6 md:p-8 rounded-sm border border-border/30 bg-card/20 backdrop-blur-sm
                      hover:border-primary/40 hover:bg-card/40 transition-all duration-500">
        
        {/* Perturbation indicator */}
        <motion.div
          className="absolute -top-3 -left-3 w-6 h-6 rounded-full border border-primary/30 bg-background"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
        >
          <div className="absolute inset-1 rounded-full bg-primary/20" />
          <div className="absolute inset-2 rounded-full bg-primary/40" />
        </motion.div>

        <WaveCollapseText delay={index * 0.15}>
          <h3 className="font-editorial text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </WaveCollapseText>

        <WaveCollapseText delay={index * 0.15 + 0.1}>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </WaveCollapseText>

        <WaveCollapseText delay={index * 0.15 + 0.2}>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span 
                key={i}
                className="px-2 py-1 text-xs font-mono text-primary/70 border border-primary/20 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </WaveCollapseText>

        {link && (
          <WaveCollapseText delay={index * 0.15 + 0.3}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-secondary hover:text-secondary/80 
                         transition-colors renormalize"
            >
              <ExternalLink size={12} />
              View Project
            </a>
          </WaveCollapseText>
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{
               background: 'radial-gradient(ellipse at center, hsl(200, 100%, 55%, 0.05) 0%, transparent 70%)',
             }} />
      </div>
    </motion.div>
  );
};

export default ProjectNode;
