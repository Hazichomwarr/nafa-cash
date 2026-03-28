import { ReactNode } from "react";

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="text-sm font-medium text-gray-700">{children}</label>
  );
}
