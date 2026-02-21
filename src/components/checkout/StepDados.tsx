import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { maskPhone, maskCPF, validateCPF } from "@/lib/checkout-utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StepDadosProps {
  nome: string;
  email: string;
  celular: string;
  onSubmit: (data: { nome: string; celular: string; cpf: string }) => void;
}

const StepDados = ({ nome: initialNome, email, celular: initialCelular, onSubmit }: StepDadosProps) => {
  const [nome, setNome] = useState(initialNome);
  const [celular, setCelular] = useState(initialCelular);
  const [cpf, setCpf] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeField, setShakeField] = useState<string | null>(null);

  const shake = (field: string) => {
    setShakeField(field);
    setTimeout(() => setShakeField(null), 500);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) { newErrors.nome = "Nome obrigatório"; shake("nome"); }
    const phoneDigits = celular.replace(/\D/g, "");
    if (phoneDigits.length < 10) { newErrors.celular = "Celular inválido"; shake("celular"); }
    if (!validateCPF(cpf)) { newErrors.cpf = "CPF inválido"; shake("cpf"); }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ nome, celular, cpf });
    }
  };

  const shakeAnim = { x: [0, -8, 8, -6, 6, -3, 3, 0] };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-5"
    >
      <h3 className="font-display text-xl text-foreground tracking-wider mb-4">DADOS PESSOAIS</h3>

      <div>
        <label className="font-body text-sm text-muted-foreground mb-1 block">Nome completo</label>
        <motion.div animate={shakeField === "nome" ? shakeAnim : {}}>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-secondary/50 border-border font-body"
            placeholder="Seu nome completo"
          />
        </motion.div>
        {errors.nome && <p className="text-destructive text-xs mt-1 font-body">{errors.nome}</p>}
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground mb-1 flex items-center gap-2">
          E-mail
          <Tooltip>
            <TooltipTrigger>
              <Lock className="w-3.5 h-3.5 text-primary" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-body text-xs">E-mail vinculado à sua inscrição</p>
            </TooltipContent>
          </Tooltip>
        </label>
        <Input
          value={email}
          readOnly
          className="bg-secondary/30 border-border font-body opacity-70 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground mb-1 block">Celular</label>
        <motion.div animate={shakeField === "celular" ? shakeAnim : {}}>
          <Input
            value={celular}
            onChange={(e) => setCelular(maskPhone(e.target.value))}
            className="bg-secondary/50 border-border font-body"
            placeholder="(00) 00000-0000"
          />
        </motion.div>
        {errors.celular && <p className="text-destructive text-xs mt-1 font-body">{errors.celular}</p>}
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground mb-1 block">CPF</label>
        <motion.div animate={shakeField === "cpf" ? shakeAnim : {}}>
          <Input
            value={cpf}
            onChange={(e) => setCpf(maskCPF(e.target.value))}
            className="bg-secondary/50 border-border font-body"
            placeholder="000.000.000-00"
          />
        </motion.div>
        {errors.cpf && <p className="text-destructive text-xs mt-1 font-body">{errors.cpf}</p>}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider text-lg h-12 mt-4"
      >
        CONTINUAR →
      </Button>
    </motion.div>
  );
};

export default StepDados;
