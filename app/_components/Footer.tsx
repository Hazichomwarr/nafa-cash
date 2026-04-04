import { Container } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-10 mt-12">
      <Container>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {/* BRAND */}
          <div>
            <p className="font-bold text-lg">NAFA CASH</p>
            <p className="text-neutral-400 mt-2">
              Envoyez de l’argent facilement vers le Burkina Faso.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <p className="font-semibold mb-2">Liens</p>
            <ul className="space-y-1 text-neutral-400">
              <li>Comment ça marche</li>
              <li>Mes transferts</li>
            </ul>
          </div>

          {/* TRUST */}
          <div>
            <p className="font-semibold mb-2">Confiance</p>
            <p className="text-neutral-400">Paiements sécurisés via Stripe.</p>
            <p className="text-neutral-400">Support humain disponible.</p>
          </div>
        </div>

        <div className="text-center text-neutral-500 text-xs mt-8">
          © {new Date().getFullYear()} NAFA CASH — Tous droits réservés
        </div>
      </Container>
    </footer>
  );
}
