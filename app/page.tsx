// app/page.tsx
import Hero from "./_components/Hero";
import TrustSection from "./_components/TrustSection";
import CTASection from "./_components/CTASection";
import { Stack } from "@/components/ui";
import { getCachedRate } from "@/lib/moneyConverter";

export default async function HomePage() {
  const rate = await getCachedRate();

  return (
    <main className="py-12 bg-neutral-50 min-h-screen">
      <Stack gap={8}>
        <Hero rate={rate} />
        <TrustSection />
        <CTASection />
      </Stack>
    </main>
  );
}
