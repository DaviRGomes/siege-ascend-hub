import { motion } from "framer-motion";
import { Check, ShieldCheck, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/checkout-utils";
import r6sLogo from "@/assets/r6s-logo.png";

interface ProductSummaryProps {
  productName: string;
  priceOriginal: number;
  priceOffer: number;
  bumpAccepted: boolean;
  bumpValue: number;
}

const benefits = [
  "Acesso vitalício",
  "Suporte via Discord",
  "Atualizações gratuitas",
  "Garantia de 7 dias",
];

const ProductSummary = ({ productName, priceOriginal, priceOffer, bumpAccepted, bumpValue }: ProductSummaryProps) => {
  const total = priceOffer + (bumpAccepted ? bumpValue : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="tactical-card rounded-xl p-6 lg:p-8 h-fit lg:sticky lg:top-8"
    >
      <div className="flex justify-center mb-6">
        <img src={r6sLogo} alt={productName} className="h-16 object-contain" />
      </div>

      <h2 className="font-display text-2xl text-gradient-gold text-center mb-1">
        SIEGE MASTERCLASS
      </h2>
      <p className="font-display text-lg text-foreground/70 text-center mb-6">
        Elo Champion
      </p>

      <div className="space-y-3 mb-6">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-body text-sm text-foreground/80">{b}</span>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-lg p-4 mb-6 text-center">
        <p className="text-muted-foreground text-sm line-through font-body">
          De {formatCurrency(priceOriginal)}
        </p>
        <p className="text-gradient-gold font-display text-3xl mt-1">
          Por {formatCurrency(priceOffer)}
        </p>
        {bumpAccepted && (
          <p className="text-sm text-primary/80 font-body mt-1">
            + E-book: {formatCurrency(bumpValue)}
          </p>
        )}
        {bumpAccepted && (
          <p className="text-foreground font-display text-xl mt-2 border-t border-border pt-2">
            Total: {formatCurrency(total)}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs font-body">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> SSL</span>
        <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Visa/Master</span>
        <span>PIX</span>
      </div>
    </motion.div>
  );
};

export default ProductSummary;
