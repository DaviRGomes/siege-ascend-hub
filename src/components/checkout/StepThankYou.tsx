import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, Gamepad2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepThankYouProps {
  nome: string;
  email: string;
}

// Simple confetti particles
const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          background: `hsl(${45 + Math.random() * 20}, 100%, ${50 + Math.random() * 20}%)`,
        }}
        initial={{ y: -20, opacity: 1, rotate: 0 }}
        animate={{
          y: window.innerHeight + 20,
          opacity: 0,
          rotate: Math.random() * 720 - 360,
          x: (Math.random() - 0.5) * 200,
        }}
        transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeIn" }}
      />
    ))}
  </div>
);

const StepThankYou = ({ nome, email }: StepThankYouProps) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Confetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <Trophy className="w-10 h-10 text-primary" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-gradient-gold">
          PAGAMENTO CONFIRMADO!
        </h2>

        <p className="font-body text-lg text-foreground/80">
          Bem-vindo à Masterclass, <span className="text-primary">{nome}</span>!
        </p>

        <div className="tactical-card rounded-xl p-6 text-left space-y-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="font-body text-sm text-foreground/80">Acesso liberado na plataforma</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="font-body text-sm text-foreground/80">E-mail enviado para {email}</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="font-body text-sm text-foreground/80">Conta criada automaticamente</span>
          </div>
        </div>

        <div className="tactical-card rounded-xl p-6 text-left max-w-md mx-auto">
          <h4 className="font-display text-lg text-foreground mb-3">PRÓXIMOS PASSOS:</h4>
          <ol className="font-body text-sm text-foreground/70 space-y-2 list-decimal list-inside">
            <li>Verifique seu e-mail (inclusive spam)</li>
            <li>Acesse com seu e-mail + senha temporária</li>
            <li>Troque a senha no primeiro acesso</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider h-12"
            onClick={() => window.open("https://plataforma.example.com", "_blank")}
          >
            <Gamepad2 className="mr-2 w-5 h-5" /> ACESSAR A PLATAFORMA
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10 font-display tracking-wider h-12"
            onClick={() => window.open("https://discord.gg/example", "_blank")}
          >
            <MessageCircle className="mr-2 w-5 h-5" /> ENTRAR NO DISCORD
          </Button>
        </div>

        <p className="font-body text-sm text-muted-foreground">
          Redirecionando em {countdown}s...
        </p>
      </motion.div>
    </>
  );
};

export default StepThankYou;
