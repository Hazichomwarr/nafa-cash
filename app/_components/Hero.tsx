import { Container, Stack } from "@/components/ui";
import Link from "next/link";
import SendFlow from "./forms/SendFlow";

export default function Hero() {
  return (
    <section className="relative h-150 md:h-[700] py-18 bg-linear-to-br from-blue-700 to-orange-400 text-white">
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
                Send Money to Burkina Faso
              </h1>
              <p className="text-lg text-neutral-200">Fast • Easy • Secure</p>
              <p className="text-lg text-white/90">
                Direct to Orange Money Wallet
              </p>
            </Stack>

            {/* FORM (Calculator) */}
            <div className="bg-white text-black rounded-xl shadow-lg max-w-md md:min-w-lg md:mx-auto p-6">
              <SendFlow />
            </div>

            <div className="text-xl border border-neutral-300 hover:bg-neutral-700 px-4 py-2 text-center rounded-2xl cursor-pointer active:scale-95 hover:border-none">
              <Link href="#missionStorySection">Our Mission</Link>
            </div>
          </Stack>
        </Container>
      </div>
    </section>
  );
}
