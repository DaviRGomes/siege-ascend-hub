import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle, Loader2, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { maskCardNumber, maskExpiry, maskCVV, detectCardBrand, validateExpiry, calculateInstallments, formatCurrency } from "@/lib/checkout-utils";
import CreditCardVisual from "./CreditCardVisual";

interface StepPaymentProps {
  total: number;
  onSubmit: (paymentData: PaymentData) => void;
  isSubmitting: boolean;
}

export interface PaymentData {
  metodo: "pix" | "cartao";
  parcelas?: number;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

const PIX_DURATION = 15 * 60; // 15 min

const StepPayment = ({ total, onSubmit, isSubmitting }: StepPaymentProps) => {
  const [tab, setTab] = useState("pix");

  // PIX state
  const [pixGenerated, setPixGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixTimer, setPixTimer] = useState(() => {
    const saved = localStorage.getItem("pix_timer_end");
    if (saved) {
      const remaining = Math.floor((parseInt(saved) - Date.now()) / 1000);
      return remaining > 0 ? remaining : PIX_DURATION;
    }
    return PIX_DURATION;
  });

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [parcelas, setParcelas] = useState("1");
  const [cvvFocused, setCvvFocused] = useState(false);
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const brand = detectCardBrand(cardNumber);
  const isAmex = brand === "amex";
  const installments = calculateInstallments(total);

  // PIX countdown
  useEffect(() => {
    if (!pixGenerated) return;
    const interval = setInterval(() => {
      setPixTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pixGenerated]);

  const generatePix = useCallback(() => {
    const endTime = Date.now() + PIX_DURATION * 1000;
    localStorage.setItem("pix_timer_end", endTime.toString());
    setPixTimer(PIX_DURATION);
    setPixGenerated(true);
  }, []);

  const copyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136PIX_PLACEHOLDER_CODE52040000530398654041.005802BR");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimer = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleCardSubmit = () => {
    const errs: Record<string, string> = {};
    if (cardNumber.replace(/\D/g, "").length < 13) errs.number = "Número inválido";
    if (!cardName.trim()) errs.name = "Nome obrigatório";
    if (!validateExpiry(cardExpiry)) errs.expiry = "Validade inválida";
    const cvvLen = isAmex ? 4 : 3;
    if (cardCVV.length < cvvLen) errs.cvv = "CVV inválido";
    setCardErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({ metodo: "cartao", parcelas: parseInt(parcelas), cardNumber, cardName, cardExpiry, cardCVV });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <h3 className="font-display text-xl text-foreground tracking-wider mb-4">PAGAMENTO</h3>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full bg-secondary/50 mb-6">
          <TabsTrigger value="pix" className="flex-1 font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🏦 PIX
          </TabsTrigger>
          <TabsTrigger value="cartao" className="flex-1 font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            💳 CARTÃO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pix" className="space-y-4">
          <p className="font-body text-sm text-muted-foreground text-center">
            Pague com PIX e tenha acesso imediato
          </p>

          {!pixGenerated ? (
            <Button onClick={generatePix} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider h-12 text-lg">
              <QrCode className="mr-2" /> GERAR QR CODE PIX
            </Button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
              <div className="bg-white rounded-lg p-2 w-fit mx-auto">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX_PLACEHOLDER`}
                  alt="QR Code PIX"
                  className="w-[200px] h-[200px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value="00020126580014br.gov.bcb.pix..."
                  className="bg-secondary/50 border-border font-body text-xs flex-1"
                />
                <Button variant="outline" size="sm" onClick={copyPix} className="border-primary text-primary hover:bg-primary/10">
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
              </div>

              <p className="font-body text-sm text-muted-foreground">
                ⏳ Expira em: <span className="text-primary font-display">{formatTimer(pixTimer)}</span>
              </p>

              <Button
                onClick={() => onSubmit({ metodo: "pix" })}
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider h-12"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                ✅ JÁ REALIZEI O PAGAMENTO
              </Button>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="cartao" className="space-y-4">
          <CreditCardVisual number={cardNumber} name={cardName} expiry={cardExpiry} cvv={cardCVV} flipped={cvvFocused} />

          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">Número do cartão</label>
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
              className="bg-secondary/50 border-border font-body"
              placeholder="0000 0000 0000 0000"
            />
            {cardErrors.number && <p className="text-destructive text-xs mt-1 font-body">{cardErrors.number}</p>}
          </div>

          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">Nome no cartão</label>
            <Input
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="bg-secondary/50 border-border font-body"
              placeholder="NOME COMO NO CARTÃO"
            />
            {cardErrors.name && <p className="text-destructive text-xs mt-1 font-body">{cardErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Validade</label>
              <Input
                value={cardExpiry}
                onChange={(e) => setCardExpiry(maskExpiry(e.target.value))}
                className="bg-secondary/50 border-border font-body"
                placeholder="MM/AA"
              />
              {cardErrors.expiry && <p className="text-destructive text-xs mt-1 font-body">{cardErrors.expiry}</p>}
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">CVV</label>
              <Input
                value={cardCVV}
                onChange={(e) => setCardCVV(maskCVV(e.target.value, isAmex))}
                onFocus={() => setCvvFocused(true)}
                onBlur={() => setCvvFocused(false)}
                className="bg-secondary/50 border-border font-body"
                placeholder={isAmex ? "0000" : "000"}
              />
              {cardErrors.cvv && <p className="text-destructive text-xs mt-1 font-body">{cardErrors.cvv}</p>}
            </div>
          </div>

          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">Parcelas</label>
            <Select value={parcelas} onValueChange={setParcelas}>
              <SelectTrigger className="bg-secondary/50 border-border font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {installments.map((inst) => (
                  <SelectItem key={inst.parcelas} value={String(inst.parcelas)}>
                    {inst.parcelas}x de {formatCurrency(inst.valor)}
                    {inst.juros ? " (com juros)" : " (sem juros)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCardSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wider h-12 text-lg mt-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
            🔒 FINALIZAR COMPRA
          </Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StepPayment;
