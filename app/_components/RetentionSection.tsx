import { Container } from "@/components/ui";

export default function RetentionSection() {
  return (
    <section className="py-12 bg-white">
      <Container className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Plus vous envoyez, plus vous gagnez
        </h2>

        <p className=" max-w-xl mx-auto mb-6">
          NAFA CASH récompense les utilisateurs réguliers avec de meilleurs taux
          et des avantages exclusifs{" "}
          <span className="font-semibold text text-green-600">
            dès leurs 5ème transfert
          </span>
          .
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">1er envoi</p>
            <p className="text-neutral-500">Simple et rapide</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">5ème envoi</p>
            <p className="text-neutral-500">Taux amélioré / bonus fidélité</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Clients réguliers</p>
            <p className="text-neutral-500">Traitement prioritaire</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
