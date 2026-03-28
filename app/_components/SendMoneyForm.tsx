"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Button,
  Input,
  Field,
} from "@/components/ui";

export default function SendMoneyForm() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("US");

  const handleSubmit = async () => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        recipientName: name,
        recipientPhone: phone,
        senderId: "HARDCODED_USER",
      }),
    });

    const data = await res.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack gap={4}>
          <Field label="Amount (CFA)">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5000"
            />
          </Field>

          <Field label="Recipient Name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adama"
            />
          </Field>

          <Field label="Phone Number">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+226..."
            />
          </Field>

          <Button>Continue to Payment</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
