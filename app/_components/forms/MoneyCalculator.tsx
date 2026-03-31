"use client";

import { Button, Field, Input, Stack } from "@/components/ui";
import { convertToCfa } from "@/lib/moneyConverter";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AREAS_COVERED = [
  { slug: "USD", label: "United States (USD)" },
  { slug: "EUR", label: "Europe (EUR)" },
  { slug: "QUID", label: "UNITED KINGDOM (UK)" },
  { slug: "CAD", label: "CANADA (CAD)" },
];
export default function MoneyCalculator() {
  const router = useRouter();

  const [currency, setCurrency] = useState<string>("USD");
  const [recipientName, setRecipientName] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<number>(100);

  const { cfa } = convertToCfa(amountToSend, currency);

  return (
    <Stack gap={4} className="max-w-2xl">
      <h3 className="text-lg font-semibold text-center">
        Envoyer de l{"'"}argent
      </h3>
      <Field label="Où êtes-vous ?">
        <select
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {AREAS_COVERED.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label={`Montant a envoyer (${currency})`}>
        <Input
          type="number"
          value={amountToSend}
          onChange={(e) => setAmountToSend(Number(e.target.value))}
        />
      </Field>
      <Field label="Nom du Receveur">
        <Input
          placeholder="Ex: Adama"
          type="number"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </Field>

      {/* 💥 DOPAMINE BLOCK */}
      <div className="bg-neutral-100 rounded-md p-3 text-center">
        <p className="text-sm text-neutral-600">
          {recipientName || "La personne"} va recevoir
        </p>
        <p className="mt-1 text-2xl font-bold text-green-600">
          {cfa.toLocaleString()} CFA
        </p>
      </div>
      <Button onClick={() => router.push("/send")} type="button">
        Continue pour envoyer
      </Button>
    </Stack>
  );
}
