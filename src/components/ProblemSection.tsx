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
            THE PROBLEM
          </h2>
          <p className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            WHY YOU'RE STUCK
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="tactical-card rounded-lg p-8 md:p-12 mb-8"
        >
          <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
            Are you tired of losing matches due to a <span className="text-primary font-semibold">lack of tactical coordination</span>,
            poor decision-making, and predictable plays?
          </p>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            We understand. The path to Champion is riddled with challenges. But what if you could
            bypass the grind and directly adopt the strategies of the pros?
          </p>
          <div className="glow-line w-full my-6" />
          <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
            The <span className="text-primary font-bold">Siege Masterclass: Elo Champion</span> offers
            a proven blueprint to revolutionize your gameplay.
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
            { value: "87%", label: "of players never escape Platinum" },
            { value: "3x", label: "faster rank-up with pro strats" },
            { value: "500+", label: "Champions trained" },
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
