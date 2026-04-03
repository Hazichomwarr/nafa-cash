"use client";

import { useState } from "react";
import { Stack, Input, Button, Field } from "@/components/ui";
import { AREAS_COVERED } from "./MoneyCalculator";

export default function SendForm() {
  // SENDER
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [senderCountry, setSenderCountry] = useState("US");

  // RECIPIENT
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("BF");

  const [amount, setAmount] = useState(100);

  //ERROR
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!senderName) newErrors.senderName = "Nom requis";
    if (!regex.test(email)) newErrors.email = "Email invalide";
    if (!phone || phone.length < 6) newErrors.phone = "Téléphone invalide";
    if (!amount || amount <= 0) newErrors.amount = "Montant invalide";

    if (!recipientName) newErrors.recipientName = "Nom requis";
    if (!recipientPhone) newErrors.recipientPhone = "Téléphone requis";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName,
          email,
          phone,
          senderCountry,
          recipientName,
          recipientPhone,
          recipientCountry,
          amount,
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Une erreur est survenue.");
        console.log("API ERROR:", data);
      }
    } catch (err) {
      alert("Erreur réseau.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={8}>
        {/* 🟦 SECTION 1 */}
        <Stack gap={2}>
          <h3 className="text-lg font-semibold">1. Envoyeur (Qui envoie ?) </h3>

          <Field label="Nom Prenom">
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            {errors.senderName && (
              <p className="text-sm text-red-600">{errors.senderName}</p>
            )}
          </Field>

          <Field label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </Field>

          <Field label="Téléphone">
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </Field>

          <Field label="Pays">
            <select
              className="mb-2 w-full border px-3 py-2 rounded-md"
              value={senderCountry}
              onChange={(e) => setSenderCountry(e.target.value)}
            >
              {AREAS_COVERED.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Montant à envoyer">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            {errors.amount && (
              <p className="text-sm text-red-600">{errors.amount}</p>
            )}
          </Field>
        </Stack>
        <div className="text-center"></div>
        {/* 🟩 SECTION 2 */}
        <Stack gap={2}>
          <h3 className="text-lg font-semibold">
            2. Destinataire (Qui reçoit ?)
          </h3>

          <Field label="Nom Prenom">
            <Input
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            {errors.recipientName && (
              <p className="text-sm text-red-600">{errors.recipientName}</p>
            )}
          </Field>

          <Field label="Téléphone">
            <Input
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
            {errors.recipientPhone && (
              <p className="text-sm text-red-600">{errors.recipientPhone}</p>
            )}
          </Field>

          <Field label="Pays">
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={recipientCountry}
              onChange={(e) => setRecipientCountry(e.target.value)}
            >
              <option value="" disabled>
                Choisit le Pays
              </option>
              <option value="BF">Burkina Faso</option>
            </select>
          </Field>
        </Stack>

        {/* PREVIEW CONFIRMATION BLOCK */}
        {recipientPhone && (
          <div className="bg-neutral-100 p-3 rounded-md text-sm text-center">
            <p>
              Vous envoyez{" "}
              <strong>
                {amount} {senderCountry}
              </strong>
            </p>
            <p>
              À <strong>{recipientName || "..."}</strong>
            </p>
          </div>
        )}

        {/* CTA */}
        <Button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Payer"}
        </Button>
      </Stack>
    </form>
  );
}
