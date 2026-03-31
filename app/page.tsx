import Hero from "./_components/Hero";
import TrustSection from "./_components/TrustSection";
import CTASection from "./_components/CTASection";
import { Stack } from "@/components/ui";

export default function HomePage() {
  return (
    <main className="py-12 bg-neutral-50 min-h-screen">
      <Stack gap={8}>
        <Hero />
        <TrustSection />
        <CTASection />
      </Stack>
    </main>
  );
}
