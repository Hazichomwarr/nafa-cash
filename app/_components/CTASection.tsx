import { Container } from "@/components/ui";

export default function CTASection() {
  return (
    <section className="py-12 bg-neutral-100 text-center">
      <Container>
        <p className="text-lg mb-4">
          Join 500+ Burkinabè sending with NAFA-CASH
        </p>

        <button className="bg-yellow-400 px-6 py-3 rounded-md font-semibold">
          Get Started Now
        </button>
      </Container>
    </section>
  );
}
