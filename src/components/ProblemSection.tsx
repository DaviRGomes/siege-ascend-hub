import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import vslBg from "@/assets/r6s-battlepass.jpg";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${vslBg})` }}
      />
      <div className="absolute inset-0 bg-tactical-gradient opacity-90" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="glow-line w-32 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-2">
            O PROBLEMA
          </h2>
          <p className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            POR QUE VOCÊ ESTÁ PRESO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="tactical-card rounded-lg p-8 md:p-12 mb-8"
        >
          <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
            Você está cansado de perder partidas por <span className="text-primary font-semibold">falta de coordenação tática</span>,
            decisões ruins e jogadas previsíveis?
          </p>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Nós entendemos. O caminho até o Champion é cheio de desafios. Mas e se você pudesse
            pular a curva de aprendizado e adotar diretamente as estratégias dos pros?
          </p>
          <div className="glow-line w-full my-6" />
          <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
            A <span className="text-primary font-bold">Siege Masterclass: Elo Champion</span> oferece
            um método comprovado para revolucionar seu gameplay.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 md:gap-8"
        >
          {[
            { value: "87%", label: "dos jogadores nunca saem do Platina" },
            { value: "3x", label: "mais rápido para subir de elo com strats pro" },
            { value: "500+", label: "Champions treinados" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-5xl text-gradient-gold">{stat.value}</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
