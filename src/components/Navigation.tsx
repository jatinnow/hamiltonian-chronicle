import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: "Ψ", href: "#", title: "Home" },
  { label: "§1", href: "#initial-conditions", title: "About" },
  { label: "§2", href: "#time-evolution", title: "Experience" },
  { label: "§3", href: "#perturbation-theory", title: "Projects" },
  { label: "§4", href: "#degrees-of-freedom", title: "Skills" },
  { label: "§∞", href: "#boundary-conditions", title: "Contact" },
];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-end gap-4">
        {navItems.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="group flex items-center gap-3"
          >
            <span className="font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </span>
            <span className="w-8 h-8 flex items-center justify-center font-mono text-xs text-primary/60 
                           border border-border/50 rounded-full bg-background/50 backdrop-blur-sm
                           group-hover:border-primary/50 group-hover:text-primary transition-all">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
