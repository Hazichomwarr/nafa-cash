// lib/moneyConverter.ts
export function convertToCfa(
  amount: number,
  currency: string,
  usdRate: number,
) {
  const rates: Record<string, number> = {
    USD: usdRate,
    EUR: 655.957,
    CAD: usdRate * 0.75,
    GBP: usdRate * 1.27,
  };

  const MARGIN = 0.09; // 9%
  const baseRate = rates[currency] || usdRate;
  const effectiveRate = baseRate * (1 - MARGIN);

  const cfa = amount * effectiveRate;

  return {
    cfa: Math.round(cfa),
    rate: Math.round(effectiveRate),
  };
}

export async function getUsdToCfaRate() {
  try {
    const EUR_TO_XOF = 655.957;

    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    if (!res.ok) throw new Error("FX API failed");
    const data = await res.json();

    const usdToEur = data.rates?.EUR;
    if (!usdToEur) throw new Error("Invalid FX data");

    return usdToEur * EUR_TO_XOF;
  } catch (err) {
    console.error("FX fallback used", err);
    return 550; // fallback
  }
}

// Cahed rate
let cachedRate: number | null;
let lastFetch = 0;

export async function getCachedRate() {
  const now = Date.now();

  if (!cachedRate || now - lastFetch > 60 * 60 * 1000) {
    console.log("fetching fresh rate...");
    cachedRate = await getUsdToCfaRate();
    lastFetch = now;
  }
  console.log("rate_from_api:", cachedRate);
  return cachedRate;
}
