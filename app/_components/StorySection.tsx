import { Container, Card } from "@/components/ui";

export default function StorySection() {
  return (
    <section className="relative py-24 text-white">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/family_bond_waga.png')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              Pensé pour la diaspora burkinabè
            </h2>

            <p className="mt-6 text-lg text-white/90">
              Nous savons à quel point il est important d’aider sa famille au
              pays. NAFA CASH rend cela plus simple, plus rapide et plus fiable.
            </p>

            {/* 🔥 RELAIS BLOCK (positioned properly) */}
            <Card className="mt-8 p-5 text-black">
              <p className="text-sm text-neutral-700">
                Besoin d’aide au-delà du transfert ?
              </p>

              <p className="mt-2 text-sm text-neutral-600">
                NAFA CASH s’appuie sur{" "}
                <a
                  href="https://relaisplatform.com"
                  target="_blank"
                  className="text-blue-700 hover:underline"
                >
                  RELAIS
                </a>{" "}
                pour vous accompagner à distance : assistance locale, tâches,
                urgences…
              </p>
            </Card>
          </div>
        </Container>
      </div>
    </section>
  );
}
