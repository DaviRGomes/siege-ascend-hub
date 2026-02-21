import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutLoading = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="font-display text-3xl md:text-4xl text-gradient-gold tracking-wider mb-2">
        SIEGE MASTERCLASS
      </h1>
      <p className="font-body text-muted-foreground tracking-wider mb-8">
        Carregando sua oferta exclusiva...
      </p>
    </motion.div>

    <div className="w-64 md:w-80 h-1 rounded-full bg-secondary overflow-hidden mb-10">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, hsl(var(--gold-dim)), hsl(var(--gold)), hsl(var(--gold-glow)))",
        }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />
    </div>

    <div className="w-full max-w-2xl space-y-4">
      <Skeleton className="h-10 w-full bg-muted" />
      <Skeleton className="h-10 w-3/4 bg-muted" />
      <Skeleton className="h-40 w-full bg-muted" />
      <Skeleton className="h-10 w-1/2 bg-muted" />
    </div>
  </div>
);

export default CheckoutLoading;
