import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2025 Jatin Raghuwanshi • Constructed with <span className="text-primary">ℏ</span> and caffeine
          </p>
          
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-secondary">∂</span>S/<span className="text-secondary">∂</span>t = 0 • All states conserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
