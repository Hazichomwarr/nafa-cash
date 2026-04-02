"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminFormAction({
  transactionId,
  action,
}: {
  transactionId: string;
  action: "PROCESSING" | "COMPLETED";
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const payload = { transactionId, status: action };
    const res = await fetch("/api/admin/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("res:", res);

    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    //stop Loader before redirecting
    setLoading(false);
    if (data.message === "success") router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <input type="hidden" name="transactionId" value={transactionId} /> */}

      <Button
        variant={action === "PROCESSING" ? "secondary" : "primary"}
        className="mt-2"
        type="submit"
      >
        {loading ? (
          <span className="animate-spin">
            <LoaderCircle />
          </span>
        ) : (
          <span>
            {" "}
            {action === "PROCESSING" ? "▶ Start sending" : "Mark Completed"}
          </span>
        )}
      </Button>
    </form>
  );
}
