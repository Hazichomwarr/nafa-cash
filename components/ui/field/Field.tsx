import { ReactNode } from "react";
import { Stack } from "@/components/ui";

type Props = {
  label: string;
  children: ReactNode;
};

export function Field({ label, children }: Props) {
  return (
    <Stack gap={1}>
      <span className="text-sm font-medium">{label}</span>
      {children}
    </Stack>
  );
}
