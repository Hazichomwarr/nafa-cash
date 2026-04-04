import { Card, Container } from "@/components/ui";

export default function TrustSection() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card className="p-4 text-black">
            <div className="text-4xl">⚡</div>
            <p className="mt-4 font-bold">Envoi rapide</p>
            <p className="text-sm text-neutral-600">
              L’argent arrive en quelques minutes
            </p>
          </Card>

          <Card className="p-4 text-black">
            <div className="text-4xl">💸</div>
            <p className="mt-4 font-semibold">Tarifs avantageux</p>
            <p className="text-sm text-neutral-600">
              Taux compétitif sans frais cachés
            </p>
          </Card>

          <Card className="p-4 text-black">
            <div className="text-4xl">🤝</div>
            <p className="mt-4 font-semibold">Fiable & humain</p>
            <p className="text-sm text-neutral-600">
              Suivi réel jusqu’à réception
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
