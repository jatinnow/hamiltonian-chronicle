import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
  name: string;
  category: string;
  level: number; // 0-1 probability amplitude
}

interface SkillTensorProps {
  skills: Skill[];
}

const SkillTensor = ({ skills }: SkillTensorProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div ref={ref} className="space-y-8">
      {categories.map((category, catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: catIndex * 0.1 }}
          className="space-y-4"
        >
          <h4 className="font-mono text-xs text-secondary tracking-widest uppercase">
            {category}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills
              .filter(s => s.category === category)
              .map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: catIndex * 0.1 + i * 0.05 }}
                  className="group relative"
                >
                  <div 
                    className="relative p-4 rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm
                               hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Probability amplitude visualization */}
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 transition-all duration-500"
                      style={{ width: isInView ? `${skill.level * 100}%` : '0%' }}
                    />
                    
                    <span className="font-mono text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                    
                    {/* Quantum state indicator */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors">
                      <div 
                        className="absolute inset-0 rounded-full bg-primary animate-ping opacity-0 group-hover:opacity-30"
                        style={{ animationDuration: '2s' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillTensor;
