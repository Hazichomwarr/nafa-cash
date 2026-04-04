import { Container } from "@/components/ui";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-12 bg-neutral-100 text-center">
      <Container>
        <p className="text-lg mb-4">
          Join 500+ Burkinabè sending with NAFA-CASH
        </p>

        <Link
          className="bg-yellow-400 px-6 py-3 rounded-md font-semibold transition cursor-pointer hover:scale-105"
          href="/send"
        >
          Envoyez maintenant
        </Link>
      </Container>
    </section>
  );
}
