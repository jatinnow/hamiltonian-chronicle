import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity, y, scale }}
      >
        {/* Hamiltonian equation decoration */}
        <WaveCollapseText>
          <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.4em] mb-8">
            <span className="text-primary">ℋ</span> = <span className="text-secondary">∑</span> ε<sub>i</sub> + <span className="text-primary">V</span>(r)
          </p>
        </WaveCollapseText>

        <WaveCollapseText delay={0.1}>
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl tracking-tight">
            <span className="block text-muted-foreground font-light text-2xl md:text-3xl lg:text-4xl mb-4">
              Hamiltonian Dynamics of
            </span>
            <span className="glow-cherenkov">Jatin Raghuwanshi</span>
          </h1>
        </WaveCollapseText>

        <WaveCollapseText delay={0.2}>
          <p className="mt-8 font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Physics & Data Science • Quantum Information • Complex Systems
          </p>
        </WaveCollapseText>

        <WaveCollapseText delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:jatin.raghuwanhsi@students.iiserpune.ac.in"
              className="px-8 py-3 border border-primary/50 text-primary font-mono text-sm
                         hover:bg-primary/10 transition-all duration-300 renormalize"
            >
              Initialize Contact
            </a>
            <a 
              href="#initial-conditions"
              className="px-8 py-3 text-muted-foreground font-mono text-sm
                         hover:text-foreground transition-colors renormalize"
            >
              Observe System →
            </a>
          </div>
        </WaveCollapseText>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 opacity-20">
        <motion.div
          className="w-full h-full border border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 opacity-20">
        <motion.div
          className="w-full h-full border border-secondary/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
