import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-invitational.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-radial-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-display text-sm md:text-base tracking-[0.4em] text-gold-dim mb-4 uppercase">
            Siege Masterclass: Elo Champion
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6"
        >
          <span className="text-foreground">PARE DE PERDER POR</span>
          <br />
          <span className="text-foreground">FALTA DE TÁTICA</span>
          <br />
          <span className="text-gradient-gold">DOMINE O SERVIDOR</span>
          <br />
          <span className="text-gradient-gold">COM MENTALIDADE DE PRO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Cansado de ficar preso no mesmo elo? O curso Siege Masterclass foi criado
          para jogadores de Prata a Platina prontos para alcançar o rank
          Champion
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("pricing")}
            className="font-display text-lg tracking-wider px-8 py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300 animate-pulse-gold"
          >
            DESBLOQUEIE SEU POTENCIAL CHAMPION
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("benefits")}
            className="font-display text-lg tracking-wider px-8 py-6 border-gold-glow text-foreground hover:bg-secondary transition-all duration-300"
          >
            EXPLORAR BENEFÍCIOS
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
