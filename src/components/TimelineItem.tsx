import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';

interface TimelineItemProps {
  date: string;
  title: string;
  organization: string;
  description: string[];
  index: number;
  links?: { label: string; url: string }[];
}

const TimelineItem = ({ 
  date, 
  title, 
  organization, 
  description, 
  index,
  links 
}: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/0" />
      
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
      </motion.div>

      <WaveCollapseText delay={index * 0.1}>
        <span className="font-mono text-xs text-secondary tracking-wider">{date}</span>
      </WaveCollapseText>

      <WaveCollapseText delay={index * 0.1 + 0.1}>
        <h3 className="font-editorial text-xl md:text-2xl text-foreground mt-2">{title}</h3>
      </WaveCollapseText>

      <WaveCollapseText delay={index * 0.1 + 0.15}>
        <p className="text-primary font-medium mt-1">{organization}</p>
      </WaveCollapseText>

      <WaveCollapseText delay={index * 0.1 + 0.2}>
        <ul className="mt-4 space-y-2">
          {description.map((item, i) => (
            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-primary mt-1.5 opacity-50">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </WaveCollapseText>

      {links && links.length > 0 && (
        <WaveCollapseText delay={index * 0.1 + 0.25}>
          <div className="mt-4 flex gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary/70 hover:text-primary transition-colors renormalize"
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </WaveCollapseText>
      )}
    </motion.div>
  );
};

export default TimelineItem;
