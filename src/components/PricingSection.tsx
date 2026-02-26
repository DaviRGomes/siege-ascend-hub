import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Brain, Crosshair, Gamepad2, Target } from "lucide-react";
import pricingBg from "@/assets/r6s-livestream.jpg";

const courseFeatures = [
  { icon: Brain, text: "Mentalidade Clutch — domine situações 1vX com controle emocional" },
  { icon: Crosshair, text: "Micro-Sinergia — coordenação tática avançada com seu time" },
  { icon: Gamepad2, text: "Economia de Drone — uso eficiente de intel em cada round" },
  { icon: Target, text: "Execuções de Plant — setups perfeitos para garantir o round" },
];

interface PricingSectionProps {
  onCtaClick: () => void;
}

const PricingSection = ({ onCtaClick }: PricingSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${pricingBg})` }}
      />
      <div className="absolute inset-0 bg-tactical-gradient opacity-95" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="glow-line w-32 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-2">
            GARANTA SEU CURSO
          </h2>
          <p className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            SIEGE MASTERCLASS
          </p>
        </motion.div>

        {/* E-book Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="tactical-card rounded-lg p-8 md:p-10 border-gold-glow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left: icon + info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display text-sm tracking-[0.3em] text-primary">CURSO</p>
                  <h3 className="font-display text-xl text-foreground">SIEGE MASTERCLASS</h3>
                </div>
              </div>

              <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                Curso completo com os segredos táticos e psicológicos que separam os jogadores medianos dos Champions.
              </p>

              <ul className="space-y-3 mb-6">
                {courseFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <f.icon className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="font-body text-sm text-foreground/80">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {["Mentalidade Clutch", "Micro-Sinergia", "Economia de Drone", "Execuções de Plant"].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs px-3 py-1.5 rounded-full bg-secondary text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: price + CTA */}
            <div className="flex flex-col items-center text-center md:min-w-[200px]">
              <span className="font-body text-sm text-muted-foreground line-through mb-1">R$ 97,00</span>
              <span className="font-display text-5xl text-foreground mb-1">R$ 47</span>
              <span className="font-body text-xs text-muted-foreground mb-6">Pagamento único • Acesso imediato</span>

              <Button
                onClick={onCtaClick}
                className="w-full font-display text-base tracking-wider py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300"
              >
                QUERO O CURSO
              </Button>
              <p className="font-body text-xs text-muted-foreground mt-3">
                🔒 Pagamento seguro • Entrega digital instantânea
              </p>

              <a
                href="https://chat.whatsapp.com/CcNVzvmfKBL9lcY3Imi4Od"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-display text-sm tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                🎯 ACESSO VIP — Grupo WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
