export function convertToCfa(amount: number, currency: string) {
  const rates: Record<string, number> = {
    USD: 565,
    EUR: 650,
    CAD: 440,
    UK: 700,
  }; // later from API

  const MARGIN = 0.1; // 10%
  const baseRate = rates[currency] || 565;
  const effectiveRate = baseRate * (1 - MARGIN);

  const cfa = amount * effectiveRate;

  return {
    cfa: Math.round(cfa),
    rate: Math.round(effectiveRate),
  };
}
