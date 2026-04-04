// app/page.tsx
import Hero from "./_components/Hero";
import CTASection from "./_components/CTASection";
import { Stack } from "@/components/ui";
import { getCachedRate } from "@/lib/moneyConverter";
import HowItWorks from "./_components/HowItWorks";
import StorySection from "./_components/StorySection";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import RetentionSection from "./_components/RetentionSection";

export default async function HomePage() {
  const rate = await getCachedRate();

  return (
    <main className="py-12 bg-neutral-50 min-h-screen">
      <Stack gap={8}>
        <Navbar />
        <Hero rate={rate} />
        <RetentionSection />
        <HowItWorks />
        <StorySection />
        <CTASection />
        <Footer />
      </Stack>
    </main>
  );
}
