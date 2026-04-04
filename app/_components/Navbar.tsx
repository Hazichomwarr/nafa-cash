import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <nav className="w-full sticky top-0 z-50">
          <div className="flex items-center justify-between md:flex">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/nafa-logo.png"
                width={80}
                height={80}
                alt="logo"
                className="rounded-full shadow-sm"
              />
            </Link>

            {/* LINKS */}
            <div className="hidden md:flex gap-6 text-sm text-neutral-600">
              <Link
                href="#how"
                className="text-neutral-900 cursor-pointer hover:underline hover:scale-105 transition"
              >
                Comment ça marche
              </Link>
              <Link
                href="/history"
                className="text-neutral-900 cursor-pointer hover:underline hover:scale-105 transition"
              >
                Mes transferts
              </Link>
            </div>

            {/* CTA */}
            <Link
              href="/send"
              className="bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 hover:scale-110 transition cursor-pointer"
            >
              Envoyer
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
