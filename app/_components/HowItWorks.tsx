import { Container } from "@/components/ui";

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 bg-neutral-800">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* STEP 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">💸</div>
            <p className="text-lg font-bold">1. Entrez le montant</p>
            <p className="text-sm text-neutral-500 mt-2">
              Indiquez combien vous souhaitez envoyer et à qui.
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              ✔ Taux affiché en temps réel
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">💳</div>
            <p className="text-lg font-bold">2. Payez en ligne</p>
            <p className="text-sm text-neutral-500 mt-2">
              Paiement sécurisé par carte bancaire.
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              ✔ Sécurisé par Stripe
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">📲</div>
            <p className="text-lg font-bold">3. Réception rapide</p>
            <p className="text-sm text-neutral-500 mt-2">
              Le bénéficiaire reçoit l’argent immédiatement.
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              ✔ Mobile Money ou retrait en cash
            </p>
          </div>
        </div>

        {/* 🔥 TRUST LINE */}
        <div className="text-center mt-10">
          <p className="text-sm text-neutral-300">
            🔄 Suivi en temps réel • 🤝 Traitement humain • ⚡ Livraison rapide
          </p>
        </div>
      </Container>
    </section>
  );
}
