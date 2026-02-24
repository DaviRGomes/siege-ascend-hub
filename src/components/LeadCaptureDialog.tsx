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
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { maskPhone } from "@/lib/checkout-utils";

const VALID_EMAIL_DOMAINS = [
  "gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.com.br",
  "live.com", "icloud.com", "protonmail.com", "zoho.com",
  "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br",
  "globo.com", "msn.com", "aol.com", "mail.com",
];

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  // Must end with a common TLD (2-3 chars)
  const tld = domain.split(".").pop() || "";
  if (tld.length > 4 || tld.length < 2) return false;
  // Block obvious typos like .com.ui, .con, .cmo
  const blockedTlds = ["ui", "con", "cmo", "cm", "co", "gmai", "gmial"];
  if (blockedTlds.includes(tld)) return false;
  return true;
}

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quizQuestions = [
  {
    question: "Qual é o seu estilo de jogo preferido?",
    options: [
      "Agressivo — Entry Frag, sempre na frente",
      "Suporte — Utility e cobertura para o time",
      "Flex — Adapto conforme a necessidade do round",
      "Âncora — Seguro o site e controlo os ângulos",
    ],
  },
  {
    question: "Como você lida com situações de Clutch (1vX)?",
    options: [
      "Parto para cima, confio no aim",
      "Jogo pelo tempo e informação",
      "Tento emboscar e pegar de surpresa",
      "Geralmente entro em pânico e erro",
    ],
  },
  {
    question: "Qual aspecto do seu jogo precisa mais de melhoria?",
    options: [
      "Controle de mapa e rotações",
      "Mira e mecânica de tiro",
      "Comunicação e trabalho em equipe",
      "Mentalidade e consistência competitiva",
    ],
  },
  {
    question: "Quanto tempo por semana você dedica ao treino tático?",
    options: [
      "Menos de 2 horas — jogo mais casual",
      "2 a 5 horas — treino moderado",
      "5 a 10 horas — focado em melhorar",
      "Mais de 10 horas — dedicação total",
    ],
  },
];

const LeadCaptureDialog = ({ open, onOpenChange }: LeadCaptureDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"form" | "quiz" | "success">("form");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!validateEmail(email)) newErrors.email = "E-mail inválido. Verifique o endereço.";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) newErrors.phone = "Número inválido. Use (DD) 9XXXX-XXXX";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setStep("quiz");
    setCurrentQuestion(0);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleQuizNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const payload = {
        name,
        email,
        phone,
        instagram,
        resposta1: quizQuestions[0].options[answers[0] ?? 0],
        resposta2: quizQuestions[1].options[answers[1] ?? 0],
        resposta3: quizQuestions[2].options[answers[2] ?? 0],
        resposta4: quizQuestions[3].options[answers[3] ?? 0],
      };

      fetch("https://vmi2987058.contaboserver.net/webhook/67fef45e-741b-4e78-909a-ee90f3bfe6d2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(console.error);

      setStep("success");
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => {
          setStep("form");
          setSubmitted(false);
          setName("");
          setEmail("");
          setPhone("");
          setInstagram("");
          setCurrentQuestion(0);
          setAnswers([null, null, null, null]);
        }, 300);
      }, 2000);
    }
  };

  const handleQuizBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setStep("form");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setStep("form");
        setSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
        setInstagram("");
        setCurrentQuestion(0);
        setAnswers([null, null, null, null]);
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
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-gold">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">ACESSO CONCEDIDO</h3>
              <p className="font-body text-sm text-muted-foreground">
                Bem-vindo à Siege Masterclass, Champion.
              </p>
            </motion.div>
          ) : step === "quiz" ? (
            <motion.div
              key={`quiz-${currentQuestion}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-foreground text-center tracking-wider">
                  <span className="text-gradient-gold">PERFIL TÁTICO</span>
                </DialogTitle>
                <p className="font-body text-xs text-muted-foreground text-center mt-1">
                  Pergunta {currentQuestion + 1} de {quizQuestions.length}
                </p>
              </DialogHeader>

              <div className="mt-5">
                <p className="font-display text-base text-foreground mb-4">
                  {quizQuestions[currentQuestion].question}
                </p>
                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectAnswer(i)}
                      className={`w-full text-left px-4 py-3 rounded-md border font-body text-sm transition-all duration-200 ${
                        answers[currentQuestion] === i
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="flex gap-1 mt-5">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= currentQuestion ? "bg-primary" : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleQuizBack}
                    className="flex-1 font-display tracking-wider border-border"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    VOLTAR
                  </Button>
                  <Button
                    type="button"
                    onClick={handleQuizNext}
                    disabled={answers[currentQuestion] === null}
                    className="flex-1 font-display tracking-wider bg-primary text-primary-foreground hover:bg-gold-glow"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "PRÓXIMA" : "FINALIZAR"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
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
                  Preencha seus dados abaixo para se inscrever na Siege Masterclass.
                </p>
              </DialogHeader>

              <form onSubmit={handleFormNext} className="space-y-4 mt-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Endereço de E-mail"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                    required
                    className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="(DD) 9XXXX-XXXX"
                    value={phone}
                    onChange={(e) => { setPhone(maskPhone(e.target.value)); setErrors((prev) => ({ ...prev, phone: "" })); }}
                    required
                    className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body ${errors.phone ? "border-destructive" : ""}`}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1 font-body">{errors.phone}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-display text-lg tracking-wider py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300"
                >
                  CONTINUAR
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
