export function convertUsdToCfa(usd: number) {
  const REAL_RATE = 560; // later from API
  const MARGIN = 0.05; // 5%

  const effectiveRate = REAL_RATE * (1 - MARGIN);

  const cfa = usd * effectiveRate;

  return {
    cfa: Math.round(cfa),
    rate: Math.round(effectiveRate),
  };
}
