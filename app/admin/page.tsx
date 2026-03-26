// admin/page.tsx
import { db } from "@/lib/db";

export default async function AdminPage() {
  const transactions = await db.transaction.findMany({
    where: {
      status: "PAID",
    },
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
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {transactions.map((tx) => (
        <div key={tx.id} className="border p-4 mb-3 rounded">
          <p>
            <strong>Amount:</strong> {tx.amount} XOF
          </p>
          <p>
            <strong>Recipient:</strong> {tx.recipient.name}
          </p>
          <p>
            <strong>Phone:</strong> {tx.recipient.phone}
          </p>

          <form action={`/api/admin/complete`} method="POST">
            <input type="hidden" name="transactionId" value={tx.id} />
            <button
              type="submit"
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark as Completed
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
