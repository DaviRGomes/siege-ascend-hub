import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";
import type { CheckoutData } from "@/lib/checkout-utils";
import CheckoutLoading from "@/components/checkout/CheckoutLoading";
import CheckoutError from "@/components/checkout/CheckoutError";
import ProductSummary from "@/components/checkout/ProductSummary";
import StepProgress from "@/components/checkout/StepProgress";
import StepDados from "@/components/checkout/StepDados";
import BumpOrder from "@/components/checkout/BumpOrder";
import StepPayment, { type PaymentData } from "@/components/checkout/StepPayment";
import StepThankYou from "@/components/checkout/StepThankYou";

type Phase = "loading" | "error" | "dados" | "bump" | "pagamento" | "obrigado";

const STEPS = ["Dados", "Pagamento", "Confirmação"];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [phase, setPhase] = useState<Phase>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<CheckoutData | null>(null);
  const [clientData, setClientData] = useState({ nome: "", celular: "", cpf: "" });
  const [bumpAccepted, setBumpAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = phase === "dados" || phase === "bump" ? 0 : phase === "pagamento" ? 1 : 2;

  // Fetch token data
  useEffect(() => {
    if (!token) {
      setErrorMsg("Nenhum token fornecido.");
      setPhase("error");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://vmi2987058.contaboserver.net/webhook/checkout-token?token=${encodeURIComponent(token)}`
        );
        const json: CheckoutData = await res.json();

        if (!json.valido || json.token_usado) {
          setErrorMsg(json.motivo || "Link inválido ou já utilizado.");
          setPhase("error");
        } else {
          setData(json);
          setPhase("dados");
        }
      } catch {
        setErrorMsg("Erro ao validar o link. Tente novamente.");
        setPhase("error");
      }
    };

    fetchData();
  }, [token]);

  const handleDadosSubmit = useCallback((d: { nome: string; celular: string; cpf: string }) => {
    setClientData(d);
    setPhase("bump");
  }, []);

  const handleBump = useCallback((accepted: boolean) => {
    setBumpAccepted(accepted);
    setPhase("pagamento");
  }, []);

  const handlePayment = useCallback(async (paymentData: PaymentData) => {
    if (!data) return;
    setIsSubmitting(true);

    const bumpValue = 27;
    const totalValue = data.preco_oferta! + (bumpAccepted ? bumpValue : 0);

    const payload = {
      token,
      evento: "checkout_finalizado",
      produto: data.produto_nome,
      cliente: {
        nome: clientData.nome,
        email: data.email,
        cpf: clientData.cpf,
        celular: clientData.celular,
      },
      pagamento: {
        metodo: paymentData.metodo,
        parcelas: paymentData.parcelas || 1,
        valor_produto: data.preco_oferta,
        valor_bump: bumpAccepted ? bumpValue : 0,
        valor_total: totalValue,
        status: "pending",
      },
      bump: {
        aceito: bumpAccepted,
        valor: bumpAccepted ? bumpValue : 0,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://vmi2987058.contaboserver.net/webhook/checkout-pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      switch (result.status) {
        case "approved":
          setPhase("obrigado");
          break;
        case "pending":
          toast({
            title: "Pagamento em análise",
            description: result.mensagem || "Você receberá um e-mail de confirmação.",
          });
          break;
        case "rejected":
          toast({
            title: "Pagamento recusado",
            description: result.mensagem || "Verifique os dados do cartão.",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Erro",
            description: result.mensagem || "Erro interno. Tente novamente.",
            variant: "destructive",
          });
      }
    } catch {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível processar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [data, token, clientData, bumpAccepted]);

  if (phase === "loading") return <CheckoutLoading />;
  if (phase === "error") return <CheckoutError message={errorMsg} />;
  if (phase === "obrigado") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <StepThankYou nome={clientData.nome} email={data?.email || ""} />
        </div>
      </div>
    );
  }

  const priceOffer = data?.preco_oferta ?? 0;
  const priceOriginal = data?.preco_original ?? 0;
  const bumpValue = 27;
  const total = priceOffer + (bumpAccepted ? bumpValue : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl md:text-3xl text-gradient-gold tracking-wider">
            FINALIZAR COMPRA
          </h1>
        </div>

        <StepProgress currentStep={currentStep} steps={STEPS} />

        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-8">
          {/* Product summary */}
          <div className="order-2 lg:order-1">
            <ProductSummary
              productName={data?.produto_nome || ""}
              priceOriginal={priceOriginal}
              priceOffer={priceOffer}
              bumpAccepted={bumpAccepted}
              bumpValue={bumpValue}
            />
          </div>

          {/* Form area */}
          <div className="order-1 lg:order-2">
            <div className="tactical-card rounded-xl p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {phase === "dados" && (
                  <StepDados
                    key="dados"
                    nome={data?.nome || ""}
                    email={data?.email || ""}
                    celular={data?.celular || ""}
                    onSubmit={handleDadosSubmit}
                  />
                )}
                {phase === "bump" && (
                  <BumpOrder
                    key="bump"
                    onAccept={() => handleBump(true)}
                    onDecline={() => handleBump(false)}
                  />
                )}
                {phase === "pagamento" && (
                  <StepPayment
                    key="pagamento"
                    total={total}
                    onSubmit={handlePayment}
                    isSubmitting={isSubmitting}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-3 flex items-center justify-center gap-6 lg:hidden z-40">
        <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> SSL
        </span>
        <span className="text-xs text-muted-foreground font-body">Garantia 7 dias</span>
        <span className="text-xs text-muted-foreground font-body">Pagamento Seguro</span>
      </div>
    </div>
  );
};

export default Checkout;
