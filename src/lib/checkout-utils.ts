// CPF Validation (módulo 11)
export function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === parseInt(digits[10]);
}

// Input masks
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function maskExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function maskCVV(value: string, isAmex: boolean): string {
  return value.replace(/\D/g, "").slice(0, isAmex ? 4 : 3);
}

// Card brand detection
export type CardBrand = "visa" | "mastercard" | "amex" | "elo" | "unknown";

export function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, "");
  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^(636368|438935|504175|451416|636297|5067|4576|4011|506699)/.test(digits)) return "elo";
  return "unknown";
}

// Expiry validation
export function validateExpiry(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 4) return false;
  const month = parseInt(digits.slice(0, 2));
  const year = parseInt("20" + digits.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(year, month);
  return expiry > now;
}

// Currency formatting
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Installments calculation
export function calculateInstallments(total: number) {
  const noInterest = [1, 2, 3, 4, 6];
  const withInterest = [12];
  const interestRate = 0.0199; // 1.99% a.m.

  const installments = noInterest.map((n) => ({
    parcelas: n,
    valor: total / n,
    juros: false,
  }));

  withInterest.forEach((n) => {
    const coeff = (interestRate * Math.pow(1 + interestRate, n)) / (Math.pow(1 + interestRate, n) - 1);
    installments.push({ parcelas: n, valor: total * coeff, juros: true });
  });

  return installments;
}

// Checkout data types
export interface CheckoutData {
  valido: boolean;
  motivo?: string;
  nome?: string;
  email?: string;
  celular?: string;
  produto_nome?: string;
  preco_original?: number;
  preco_oferta?: number;
  token_usado?: boolean;
}
