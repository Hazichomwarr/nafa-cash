import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { Button } from "@/components/ui";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) return <div>Invalid session</div>;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const transactionId = session.metadata?.transactionId;

  const email = session.metadata?.email;

  if (!transactionId) return <div>Transaction not found</div>;

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
    include: { recipient: true },
  });

  if (!transaction) return <div>Transaction not found</div>;

  return (
    <section className="relative min-h-screen bg-[url('/images/nafa-logo.png')]  bg-cover bg-center md:bg-left">
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md bg-neutral-100 rounded-xl shadow-xl p-8 text-center ">
          {/* ICON */}
          <div className="text-green-600 text-4xl mb-2">✓</div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold">Transfert réussi</h1>

          {/* MESSAGE */}
          <p className="text-neutral-600 mt-2">
            {transaction.recipient.name} recevra{" "}
            <strong>{transaction.amount.toLocaleString()} CFA</strong> dans
            quelques minutes.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6 justify-center">
            <Link href="/">
              <Button variant="secondary">Accueil</Button>
            </Link>

            <Link href={`/history?email=${email}`}>
              <Button>Mes transferts</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
