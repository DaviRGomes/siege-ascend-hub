import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, Video, Users, MessageSquare } from "lucide-react";
import pricingBg from "@/assets/r6s-livestream.jpg";

const features = [
  { icon: Video, text: "40+ hours of Pro-level tactical video content" },
  { icon: BookOpen, text: "Complete map-by-map strategy breakdowns" },
  { icon: Users, text: "Access to private Champion community Discord" },
  { icon: MessageSquare, text: "Weekly live Q&A sessions with coaches" },
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

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="glow-line w-32 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-2">
            YOUR PATH TO CHAMPION
          </h2>
          <p className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            STARTS NOW
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* One-time */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="tactical-card rounded-lg p-8 relative overflow-hidden border-gold-glow"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="font-display text-sm tracking-[0.3em] text-primary mb-2">BEST VALUE</p>
            <h3 className="font-display text-4xl md:text-5xl text-foreground mb-1">$397</h3>
            <p className="font-body text-sm text-muted-foreground mb-6">One-time payment</p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <f.icon className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span className="font-body text-sm text-foreground/80">{f.text}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={onCtaClick}
              className="w-full font-display text-base tracking-wider py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300"
            >
              ENROLL NOW
            </Button>
          </motion.div>

          {/* Payment plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="tactical-card rounded-lg p-8 relative overflow-hidden"
          >
            <p className="font-display text-sm tracking-[0.3em] text-neon-cyan mb-2">FLEXIBLE</p>
            <h3 className="font-display text-4xl md:text-5xl text-foreground mb-1">
              4× $97
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">4 monthly payments</p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <f.icon className="w-4 h-4 text-neon-cyan mt-1 shrink-0" />
                  <span className="font-body text-sm text-foreground/80">{f.text}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={onCtaClick}
              variant="outline"
              className="w-full font-display text-base tracking-wider py-6 border-gold-glow text-foreground hover:bg-secondary transition-all duration-300"
            >
              START PAYMENT PLAN
            </Button>
          </motion.div>
        </div>

        {/* Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="tactical-card rounded-lg p-8 md:p-10 text-center border-gold-glow"
        >
          <p className="font-display text-sm tracking-[0.3em] text-primary mb-3">
            EXCLUSIVE BONUS
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            THE CHAMPION'S MINDSET EBOOK
          </h3>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            Unlock secrets to Clutch Mentality, Micro-Synergy, Efficient Drone Usage, and
            Flawless Plant Executions. Included free with your enrollment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Clutch Mentality", "Micro-Synergy", "Drone Economy", "Plant Executions"].map((tag) => (
              <span
                key={tag}
                className="font-body text-xs px-4 py-2 rounded-full bg-secondary text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
