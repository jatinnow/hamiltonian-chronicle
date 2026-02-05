import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import SkillTensor from './SkillTensor';

const skills = [
  { name: "Python", category: "Programming", level: 0.95 },
  { name: "Julia", category: "Programming", level: 0.8 },
  { name: "C", category: "Programming", level: 0.7 },
  { name: "Mathematica", category: "Programming", level: 0.85 },
  { name: "MATLAB", category: "Programming", level: 0.75 },
  { name: "Sage", category: "Programming", level: 0.65 },
  { name: "NetLogo", category: "Programming", level: 0.6 },
  { name: "Machine Learning", category: "Computation", level: 0.9 },
  { name: "Deep Learning", category: "Computation", level: 0.85 },
  { name: "Numerical Methods", category: "Computation", level: 0.88 },
  { name: "Stochastic Modelling", category: "Computation", level: 0.82 },
  { name: "Quantum Computing", category: "Theory", level: 0.75 },
  { name: "Statistical Physics", category: "Theory", level: 0.85 },
  { name: "Quantum Information", category: "Theory", level: 0.8 },
  { name: "Mathematical Finance", category: "Theory", level: 0.78 },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="degrees-of-freedom"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="max-w-5xl mx-auto">
          <WaveCollapseText>
            <p className="section-subtitle mb-4">
              <span className="text-secondary">§4</span> Degrees of Freedom
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.1}>
            <h2 className="section-title mb-4">
              Skill <span className="text-primary">Tensor</span>
            </h2>
          </WaveCollapseText>

          <WaveCollapseText delay={0.2}>
            <p className="font-mono text-sm text-muted-foreground mb-16">
              T<sup>μν</sup> • A multi-dimensional representation of capabilities
            </p>
          </WaveCollapseText>

          <SkillTensor skills={skills} />
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
