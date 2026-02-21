import { motion } from "framer-motion";
import { Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/checkout-utils";

interface BumpOrderProps {
  onAccept: () => void;
  onDecline: () => void;
}

const BumpOrder = ({ onAccept, onDecline }: BumpOrderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    className="space-y-4"
  >
    <div className="tactical-card rounded-xl p-6 border border-primary/30">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-primary tracking-wider">
          OFERTA ESPECIAL — ADICIONE ANTES DE FINALIZAR
        </h3>
      </div>

      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <div>
          <p className="font-display text-foreground text-lg">EBOOK: "Mindset Champion"</p>
          <p className="font-body text-sm text-muted-foreground">
            Os segredos psicológicos dos Pros para vencer clutchs e manter a calma sob pressão.
          </p>
        </div>
      </div>

      <div className="mb-5">
        <span className="font-body text-muted-foreground line-through text-sm mr-2">
          {formatCurrency(97)}
        </span>
        <span className="font-display text-xl text-gradient-gold">
          apenas {formatCurrency(27)}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="ghost"
          onClick={onDecline}
          className="flex-1 font-body text-muted-foreground hover:text-foreground border border-border"
        >
          Não, obrigado
        </Button>
        <Button
          onClick={onAccept}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider"
        >
          SIM, ADICIONAR! →
        </Button>
      </div>
    </div>
  </motion.div>
);

export default BumpOrder;
