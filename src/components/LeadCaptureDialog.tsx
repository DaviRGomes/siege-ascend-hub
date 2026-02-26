import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { maskPhone } from "@/lib/checkout-utils";

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  const tld = domain.split(".").pop() || "";
  if (tld.length > 4 || tld.length < 2) return false;
  const blockedTlds = ["ui", "con", "cmo", "cm", "co", "gmai", "gmial"];
  if (blockedTlds.includes(tld)) return false;
  return true;
}

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCaptureDialog = ({ open, onOpenChange }: LeadCaptureDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!validateEmail(email))
      newErrors.email = "E-mail inválido. Verifique o endereço";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11)
      newErrors.phone = "Número inválido. Use (DD) 9XXXX-XXXX";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    const payload = { name, email, phone };

    try {
      await fetch(
        "https://vmi2987058.contaboserver.net/webhook-test/67fef45e-741b-4e78-909a-ee90f3bfe6d2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
    } catch (err) {
      console.error(err);
    }

    setStep("success");
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setStep("form");
        setName("");
        setEmail("");
        setPhone("");
        setErrors({});
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-gold">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                QUASE LÁ!
              </h3>
              <p className="font-body text-sm text-muted-foreground text-center mb-6">
                Entre no nosso grupo VIP do WhatsApp para receber conteúdos exclusivos e suporte direto.
              </p>
              <a
                href="https://chat.whatsapp.com/CcNVzvmfKBL9lcY3Imi4Od"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  const checkoutUrl = `https://pay.kiwify.com.br/2CBorQ6?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
                  setTimeout(() => {
                    window.open(checkoutUrl, "_blank");
                  }, 1500);
                }}
                className="w-full inline-flex items-center justify-center gap-2 font-display text-base tracking-wider py-4 px-6 rounded-md bg-[hsl(142,70%,45%)] text-white hover:bg-[hsl(142,70%,40%)] transition-all duration-300"
              >
                📲 ENTRAR NO GRUPO VIP
              </a>
              <p className="font-body text-xs text-muted-foreground mt-4 text-center">
                Após entrar no grupo, você será redirecionado ao checkout seguro.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-foreground text-center tracking-wider">
                  <span className="text-gradient-gold">ACESSO IMEDIATO</span>
                </DialogTitle>
                <p className="font-body text-sm text-muted-foreground text-center mt-2">
                  Preencha seus dados abaixo para garantir seu acesso ao curso.
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <Input
                  type="text"
                  placeholder="Seu Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                />
                <div>
                  <Input
                    type="email"
                    placeholder="Endereço de E-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    required
                    className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 font-body">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="(DD) 9XXXX-XXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(maskPhone(e.target.value));
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    required
                    className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body ${errors.phone ? "border-destructive" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1 font-body">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-display text-lg tracking-wider py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300"
                >
                  {isSubmitting ? "PROCESSANDO..." : "CONTINUAR"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
