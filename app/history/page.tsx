// app/history/page.tsx
import { Card, CardContent, Container, Stack } from "@/components/ui";
import {
  getUserTransactions,
  TransactionArray,
  TransactionType,
} from "@/lib/queries/transactions";
import { notFound } from "next/navigation";

// const USER_ID = "8cfe3267-88f1-4bec-b9ad-73dbdecfabd5";

type Props = {
  searchParams: Promise<{ email?: string }>;
};

export default async function HistoryPage({ searchParams }: Props) {
  const params = await searchParams;
  const email = params.email;

  if (!email) return notFound();
  const transactions: TransactionArray = await getUserTransactions(email);
  return (
    <section className="py-12 bg-neutral-50">
      <Container>
        <Stack gap={6}>
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight md:text-6xl">
            Your Transfers
          </h1>
          <p className="text-sm text-neutral-500">
            Dernière mise à jour il y a quelques secondes
          </p>
          <Stack>
            {transactions.map((tx: TransactionType) => (
              <Card key={tx.id}>
                <CardContent>
                  <TransactionItem tx={tx} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </section>
  );
}

function TransactionItem({ tx }: { tx: TransactionType }) {
  const map = {
    PENDING: { label: "En attente", color: "text-yellow-600" },
    PAID: { label: "Paiement reçu", color: "text-yellow-600" },
    PROCESSING: { label: "En cours", color: "text-yellow-600" },
    COMPLETED: { label: "Terminé", color: "text-green-600" },
    CANCELLED: { label: "Échec", color: "text-red-600" },
  };

  const status = map[tx.status];

  return (
    <div className="flex justify-between">
      <div>
        <p className="font-semibold">{tx.recipient.name}</p>
        <p className="text-sm text-neutral-500">
          {new Date(tx.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="text-right">
        <p>{tx.amount.toLocaleString()} CFA</p>
        <p className={`${status.color} text-sm font-medium`}>{status.label}</p>
      </div>
    </div>
  );
}
