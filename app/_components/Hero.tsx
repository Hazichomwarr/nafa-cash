// _components/Hero.tsx
import { Container, Stack } from "@/components/ui";
import MoneyCalculator from "./forms/MoneyCalculator";
import TrustSection from "./TrustSection";

export default function Hero({ rate }: { rate: number }) {
  return (
    <section className="relative min-h-screen py-18 bg-linear-to-br from-blue-700 to-orange-400 text-white">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: "url('/images/nafa-hero.png')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <Container>
          <Stack gap={8}>
            {/* TEXT */}
            <Stack gap={4} className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold">
                Envoyez de l’argent au Burkina Faso
              </h1>

              <p className="text-lg text-neutral-200">
                Rapide • Simple • Fiable
              </p>

              <p className="text-lg text-white/90">
                Mobile Money ou retrait en cash
              </p>
            </Stack>

            {/* FORM (Calculator) */}
            <div className="bg-white text-black rounded-xl shadow-lg md:min-w-lg p-6 md:max-w-md md:mx-auto">
              <MoneyCalculator rate={rate} />
            </div>
            <TrustSection />
          </Stack>
        </Container>
      </div>
    </section>
  );
}
