import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    />
  );
}
