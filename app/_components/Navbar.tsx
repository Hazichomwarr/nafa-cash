import Link from "next/link";
import { Container } from "@/components/ui";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* LOGO */}
          <Link href="/" className="font-bold text-lg">
            NAFA CASH
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex gap-6 text-sm text-neutral-600">
            <Link href="#how">Comment ça marche</Link>
            <Link href="/history">Mes transferts</Link>
          </div>

          {/* CTA */}
          <Link
            href="/send"
            className="bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold"
          >
            Envoyer
          </Link>
        </div>
      </Container>
    </nav>
  );
}
