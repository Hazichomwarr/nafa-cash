"use client";

import { useState } from "react";
import { Stack, Input, Button, Field } from "@/components/ui";
import { AREAS_COVERED } from "./MoneyCalculator";

export default function SendMoneyForm({
  initialData,
}: {
  initialData: {
    amountToSend: number;
    recipientName: string;
    currency: string;
  };
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("USA");

  const handleSubmit = async () => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        usdAmount: initialData.amountToSend,
        recipientName: initialData.recipientName,
        recipientPhone: phone,
        email,
        country,
      }),
    });

    const data = await res.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <Stack gap={4}>
      <h2 className="text-xl font-semibold">Complete Ton Transfert</h2>

      {/* SENDER */}
      <Field label="Ton Email">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>

      <Field label="Ton Telephone">
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Field>

      <Field label="Où êtes-vous ?">
        <select
          className="w-full border px-3 py-2 rounded-md"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {AREAS_COVERED.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.label}
            </option>
          ))}
        </select>
      </Field>

      {/* RECIPIENT CONFIRM */}
      <div className="bg-neutral-100 p-3 rounded-md">
        <p className="text-sm">
          Sending to <strong>{initialData.recipientName}</strong>
        </p>
      </div>

      <Button onClick={handleSubmit}>Continue to Payment</Button>
    </Stack>
  );
}
