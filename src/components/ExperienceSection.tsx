import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import TimelineItem from './TimelineItem';

const experiences = [
  {
    date: "Aug–Nov 2025",
    title: "Stochastic Calculus & Neural Networks for Option Pricing",
    organization: "IISER Pune • Prof. Anindya Goswami",
    description: [
      "Studied Brownian motion, Itô calculus, Black–Scholes SDE and Feynman–Kac formula",
      "Implemented neural-network-based pricing and hedging models",
      "Compared architectures and feature-engineering approaches"
    ],
    links: [{ label: "Report", url: "#" }]
  },
  {
    date: "Aug–Nov 2024",
    title: "Spatiotemporal Patterning via Gene Regulatory Networks",
    organization: "IISER Pune • Prof. Ushasi Roy",
    description: [
      "Modeled microRNA-driven epithelial–hybrid–mesenchymal transitions",
      "Analyzed ODE-based network dynamics and stability",
      "Studied mechanisms enabling hybrid phenotype maintenance"
    ]
  },
  {
    date: "Oct 2024",
    title: "Mechanical Power-Law Behavior of Cells",
    organization: "IISER Pune • Prof. Chaitanya Athale",
    description: [
      "Presented Tsai & Waugh (1993), Biophysical Journal",
      "Explained viscoelasticity and mechanical rheology"
    ],
    links: [{ label: "Video", url: "#" }]
  },
  {
    date: "Summer 2025",
    title: "Quantum Machine Learning Reading Project",
    organization: "Independent Study • Qiskit ML",
    description: [
      "Studied quantum feature maps, VQCs, and hybrid QNN workflows",
      "Implemented and trained QNN example circuits"
    ],
    links: [{ label: "Tutorial", url: "#" }]
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="time-evolution"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto">
          <WaveCollapseText>
            <p className="section-subtitle mb-4">
              <span className="text-secondary">§2</span> Time Evolution
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.1}>
            <h2 className="section-title mb-4">
              Research <span className="text-primary">Trajectory</span>
            </h2>
          </WaveCollapseText>

          <WaveCollapseText delay={0.2}>
            <p className="font-mono text-sm text-muted-foreground mb-16">
              U(t) = e<sup>−iℋt/ℏ</sup> • State transitions through academic exploration
            </p>
          </WaveCollapseText>

          <div className="relative mt-12">
            {experiences.map((exp, i) => (
              <TimelineItem
                key={i}
                {...exp}
                index={i}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
