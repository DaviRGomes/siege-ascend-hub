import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Map, Shield, Eye, Crosshair, Brain, Radio } from "lucide-react";
import benefitsBg from "@/assets/r6s-operators-action.jpg";

const benefits = [
  {
    icon: Map,
    title: "Domine Controle de Mapa e Rotações",
    description: "Aprenda estratégias avançadas de domínio de mapa e rotações perfeitas, assim como times profissionais.",
  },
  {
    icon: Shield,
    title: "Setups de Defesa Avançados",
    description: "Descubra ângulos pixel-perfect, posicionamentos de utilidade impenetráveis e spots de câmera cruciais em cada mapa.",
  },
  {
    icon: Eye,
    title: "Visão de Jogo Macro Incomparável",
    description: "Desenvolva um entendimento de elite sobre o fluxo do jogo, antecipando jogadas inimigas e ditando o ritmo.",
  },
  {
    icon: Crosshair,
    title: "Execuções de Ataque Perfeitas",
    description: "Execute estratégias precisas de plant e entry frags com pushes sincronizados do time.",
  },
  {
    icon: Brain,
    title: "Domine Situações de Clutch",
    description: "Cultive a fortaleza mental e consciência tática para vencer consistentemente cenários críticos de 1vX.",
  },
  {
    icon: Radio,
    title: "Economia de Drone Eficiente",
    description: "Domine o uso inteligente de drones para coleta de informação, preparação de entrada e cenários pós-plant.",
  },
];


const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="benefits" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${benefitsBg})` }}
      />
      <div className="absolute inset-0 bg-background/95" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="glow-line w-32 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-2">
            O QUE VOCÊ VAI DOMINAR
          </h2>
          <p className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            6 PILARES DO GAMEPLAY CHAMPION
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="tactical-card rounded-lg p-6 md:p-8 group hover:border-gold-glow transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center mb-5 group-hover:shadow-gold transition-all duration-500">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
