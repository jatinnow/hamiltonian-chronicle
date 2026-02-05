import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.5]);

  return (
    <section 
      id="boundary-conditions"
      ref={sectionRef}
      className="relative min-h-[70vh] py-32 md:py-48 flex items-center"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <WaveCollapseText>
            <p className="section-subtitle mb-4">
              <span className="text-secondary">§∞</span> Boundary Conditions
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.1}>
            <h2 className="section-title mb-8">
              Initialize <span className="text-primary">Contact</span>
            </h2>
          </WaveCollapseText>

          <WaveCollapseText delay={0.2}>
            <p className="paper-text text-lg mb-12 max-w-xl mx-auto">
              Open to collaborations in quantum computing, mathematical finance, 
              and computational physics research.
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.3}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <a 
                href="mailto:jatin.raghuwanhsi@students.iiserpune.ac.in"
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors renormalize"
              >
                <Mail className="w-5 h-5" />
                <span className="font-mono text-sm">jatin.raghuwanhsi@students.iiserpune.ac.in</span>
              </a>
              
              <a 
                href="tel:+919753600331"
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors renormalize"
              >
                <Phone className="w-5 h-5" />
                <span className="font-mono text-sm">+91 9753600331</span>
              </a>
            </div>
          </WaveCollapseText>

          <WaveCollapseText delay={0.4}>
            <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-sm">IISER Pune, India</span>
            </div>
          </WaveCollapseText>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
