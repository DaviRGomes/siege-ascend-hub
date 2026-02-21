import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CheckoutError = ({ message }: { message?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="tactical-card rounded-xl p-8 md:p-12 text-center max-w-md w-full"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl text-foreground mb-3">
          LINK INVÁLIDO OU EXPIRADO
        </h1>
        <p className="font-body text-muted-foreground mb-8">
          {message || "Este link já foi utilizado ou não existe."}
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider text-lg px-8 py-3"
        >
          VOLTAR À PÁGINA PRINCIPAL
        </Button>
      </motion.div>
    </div>
  );
};

export default CheckoutError;
