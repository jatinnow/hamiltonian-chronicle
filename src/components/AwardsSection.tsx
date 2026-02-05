import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import WaveCollapseText from './WaveCollapseText';
import { Award, BookOpen, Users } from 'lucide-react';

const awards = [
  { title: "Madhya Pradesh MMVY Scholarship", source: "Government of MP" },
  { title: "Central Sector Scholarship", source: "Government of India" },
  { title: "IIT-JEE Advanced Qualified", source: "2022" },
];

const conferences = [
  "2025 Mathematical Finance Workshop, IISER Pune",
  "2025 Summer School on Discrete Stochastic Models, IISER Pune",
  "2023 Data Dynamics Summit, IISER Pune",
];

const activities = [
  { role: "General Coordinator", org: "Yoga Club, IISER Pune", period: "Jan 2023–Aug 2024" },
  { role: "Science Outreach Volunteer", org: "SAC IISER Pune", period: "Ongoing" },
  { role: "Organizing Member", org: "Indian Knowledge Systems Conference", period: "Upcoming" },
];

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="symmetries"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="max-w-5xl mx-auto" ref={contentRef}>
          <WaveCollapseText>
            <p className="section-subtitle mb-4">
              <span className="text-secondary">§5</span> Conserved Quantities
            </p>
          </WaveCollapseText>

          <WaveCollapseText delay={0.1}>
            <h2 className="section-title mb-16">
              Awards & <span className="text-primary">Activities</span>
            </h2>
          </WaveCollapseText>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="font-mono text-sm text-secondary tracking-wider">SCHOLARSHIPS</h3>
              </div>
              <ul className="space-y-4">
                {awards.map((award, i) => (
                  <li key={i} className="border-l border-border/50 pl-4">
                    <p className="text-foreground text-sm">{award.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{award.source}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Conferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-sm text-primary tracking-wider">CONFERENCES</h3>
              </div>
              <ul className="space-y-4">
                {conferences.map((conf, i) => (
                  <li key={i} className="border-l border-border/50 pl-4">
                    <p className="text-foreground/80 text-sm">{conf}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-sm text-primary tracking-wider">ACTIVITIES</h3>
              </div>
              <ul className="space-y-4">
                {activities.map((act, i) => (
                  <li key={i} className="border-l border-border/50 pl-4">
                    <p className="text-foreground text-sm">{act.role}</p>
                    <p className="text-muted-foreground text-xs mt-1">{act.org}</p>
                    <p className="text-primary/60 text-xs">{act.period}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AwardsSection;
