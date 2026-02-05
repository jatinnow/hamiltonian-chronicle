import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import ProjectNode from './ProjectNode';

const projects = [
  {
    title: "CNN for Emotion Recognition",
    description: "Built a lightweight CNN optimized for low-resource, real-time inference on the FER-2013 dataset. Implemented preprocessing, benchmarking and confidence-scoring modules.",
    tags: ["Deep Learning", "Computer Vision", "Python"],
    link: "https://github.com"
  },
  {
    title: "Group Actions on Topological Spaces",
    description: "Self-study project exploring orbits, stabilizers, invariants, and symmetry classification in topological spaces.",
    tags: ["Topology", "Abstract Algebra", "Mathematics"]
  },
  {
    title: "Neural Network Option Pricing",
    description: "Implementation of neural-network-based models for derivative pricing and hedging using stochastic calculus foundations.",
    tags: ["Mathematical Finance", "Neural Networks", "Stochastic Calculus"]
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="perturbation-theory"
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
              <span className="text-secondary">§3</span> Perturbation Theory
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.1}>
            <h2 className="section-title mb-4">
              Experimental <span className="text-primary">Nodes</span>
            </h2>
          </WaveCollapseText>

          <WaveCollapseText delay={0.2}>
            <p className="font-mono text-sm text-muted-foreground mb-16">
              ℋ' = ℋ₀ + λV • Disturbances in the field of knowledge
            </p>
          </WaveCollapseText>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <ProjectNode key={i} {...project} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
