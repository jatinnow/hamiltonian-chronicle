import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import ObserverPhoto from './ObserverPhoto';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="initial-conditions"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <WaveCollapseText>
              <p className="section-subtitle mb-4">
                <span className="text-secondary">§1</span> Initial Conditions
              </p>
            </WaveCollapseText>

            <WaveCollapseText delay={0.1}>
              <h2 className="section-title mb-8">
                The <span className="text-primary">Ψ</span>-Profile
              </h2>
            </WaveCollapseText>

            <WaveCollapseText delay={0.2}>
              <p className="paper-text text-lg leading-relaxed mb-6">
                Physics and Data Science student at IISER Pune, exploring the intersection of 
                quantum information, complex systems, and mathematical finance.
              </p>
            </WaveCollapseText>

            <WaveCollapseText delay={0.3}>
              <p className="paper-text leading-relaxed mb-8">
                Experienced in machine learning, stochastic modelling, and computational physics. 
                Currently in my 4th year of the BS-MS program, with coursework spanning 
                Quantum Information, Statistical Physics, Numerical Analysis, Deep Learning, and Biophysics.
              </p>
            </WaveCollapseText>

            <WaveCollapseText delay={0.4}>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-1">
                  <p className="font-mono text-xs text-muted-foreground">Position</p>
                  <p className="text-foreground">4th-year BS-MS Student</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-muted-foreground">Institution</p>
                  <p className="text-foreground">IISER Pune</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-muted-foreground">Expected</p>
                  <p className="text-foreground">2027</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-muted-foreground">Languages</p>
                  <p className="text-foreground">English, Hindi</p>
                </div>
              </div>
            </WaveCollapseText>
          </div>

          {/* Photo - The Observer */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-64 md:w-80 lg:w-96">
              <ObserverPhoto 
                src="https://placehold.co/600x800/1a1a1a/FFF?text=Observer" 
                alt="Jatin Raghuwanshi"
              />
              <p className="mt-4 font-mono text-xs text-muted-foreground text-center">
                The Observer Operator <span className="text-primary">|ψ⟩</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
