// admin/page.tsx
import { db } from "@/lib/db";
import { TransactionType } from "@/lib/queries/transactions";
import AdminFormAction from "../_components/AdminFromActions";
import { Container } from "@/components/ui";

export default async function AdminPage() {
  const transactions: TransactionType[] = await db.transaction.findMany({
    include: {
      recipient: true,
      sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <Container>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 mb-4 border rounded grid gap-4 md:grid-cols-3"
          >
            <div>
              <p>
                <strong>Amount:</strong> {tx.amount} XOF
              </p>
              <p>
                <strong>Recipient:</strong> {tx.recipient.name}
              </p>
              <p>
                <strong>Phone:</strong> {tx.recipient.phone}
              </p>
            </div>
            <div>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${tx.status === "COMPLETED" ? "text-green-600" : tx.status === "CANCELLED" ? "text-red-700" : "text-yellow-600"} `}
                >
                  {tx.status}
                </span>
              </p>
              <p>
                <strong>Transaction Date:</strong>{" "}
                {tx.createdAt.toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              {tx.status !== "COMPLETED" && (
                <AdminFormAction transactionId={tx.id} action="COMPLETED" />
              )}
              {tx.status !== "PROCESSING" && tx.status !== "COMPLETED" && (
                <AdminFormAction transactionId={tx.id} action="PROCESSING" />
              )}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
