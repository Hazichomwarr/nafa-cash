"use client";

import { useState, useRef } from "react";
import { Stack } from "@/components/ui";
import SendMoneyForm from "./SendMoneyForm";
import MoneyCalculator from "./MoneyCalculator";

export default function SendFlow() {
  const [data, setData] = useState<{
    amountToSend: number;
    recipientName: string;
    currency: string;
  } | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  const handleContinue = (payload: {
    amountToSend: number;
    recipientName: string;
    currency: string;
  }) => {
    setData(payload);

    // smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <Stack gap={6}>
      {/* STEP 1 */}
      <MoneyCalculator onContinue={handleContinue} />

      {/* STEP 2 */}
      {data && (
        <div ref={formRef} className="animate-fade-in">
          <SendMoneyForm initialData={data} />
        </div>
      )}
    </Stack>
  );
}
