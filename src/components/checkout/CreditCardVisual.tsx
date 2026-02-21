import { motion } from "framer-motion";
import { detectCardBrand, type CardBrand } from "@/lib/checkout-utils";

interface CreditCardVisualProps {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  flipped: boolean;
}

const brandLabels: Record<CardBrand, string> = {
  visa: "VISA",
  mastercard: "MASTER",
  amex: "AMEX",
  elo: "ELO",
  unknown: "",
};

const CreditCardVisual = ({ number, name, expiry, cvv, flipped }: CreditCardVisualProps) => {
  const brand = detectCardBrand(number);
  const displayNumber = number || "•••• •••• •••• ••••";
  const displayName = name || "NOME NO CARTÃO";
  const displayExpiry = expiry || "MM/AA";

  return (
    <div className="perspective-[1000px] w-full max-w-[340px] mx-auto mb-6">
      <motion.div
        className="relative w-full h-[200px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 tactical-card rounded-xl p-6 flex flex-col justify-between border border-primary/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-7 rounded bg-gradient-to-br from-primary/60 to-primary/30" />
            <span className="font-display text-lg text-primary">{brandLabels[brand]}</span>
          </div>
          <p className="font-body text-lg tracking-[0.15em] text-foreground">{displayNumber}</p>
          <div className="flex justify-between items-end">
            <span className="font-body text-xs text-foreground/70 uppercase truncate max-w-[200px]">
              {displayName}
            </span>
            <span className="font-body text-xs text-foreground/70">{displayExpiry}</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 tactical-card rounded-xl flex flex-col justify-center border border-primary/20"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-10 bg-foreground/20 mb-6" />
          <div className="px-6 flex items-center gap-3">
            <div className="flex-1 h-8 bg-secondary/60 rounded" />
            <div className="bg-foreground/10 px-4 py-2 rounded font-body text-sm text-foreground tracking-wider">
              {cvv || "•••"}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditCardVisual;
