// app/history/page.tsx
import { Card, CardContent, Container, Stack } from "@/components/ui";
import {
  getUserTransactions,
  TransactionArray,
  TransactionType,
} from "@/lib/queries/transactions";

const USER_ID = "8cfe3267-88f1-4bec-b9ad-73dbdecfabd5";

export default async function HistoryPage() {
  const transactions: TransactionArray = await getUserTransactions(USER_ID);

  return (
    <section className="py-12 bg-neutral-50">
      <Container>
        <Stack gap={6}>
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight md:text-6xl">
            Your Transfers
          </h1>

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
  const statusMap = {
    PENDING: "text-yellow-600",
    PAID: "text-yellow-600",
    PROCESSING: "text-yellow-600",
    COMPLETED: "text-green-600",
    CANCELLED: "text-red-600",
  };
  const labelMap = {
    PENDING: "Processing",
    PAID: "Processing",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    CANCELLED: "Failed",
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* LEFT */}
        <Stack gap={2}>
          <p className="font-semibold text-neutral-700">{tx.recipient.name}</p>
          <p className="font-semibold text-neutral-700">{tx.country}</p>
          <p className="text-sm text-neutral-500">
            {new Date(tx.createdAt).toLocaleString()}
          </p>
        </Stack>

        {/* RIGHT */}
        <Stack gap={2}>
          <p className="font-semibold text-neutral-700">
            #{tx.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="font-semibold text-neutral-700">
            {tx.amount.toLocaleString()} CFA
          </p>
          <p className={`text-sm ${statusMap[tx.status]}`}>
            {labelMap[tx.status]}
          </p>
        </Stack>
      </div>
    </div>
  );
}
