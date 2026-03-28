// components/ui//card/Card.tsx
import React from "react";

type CardProps = { children: React.ReactNode; className?: string };
type CardHeaderProps = { children: React.ReactNode };
type CardContentProps = { children: React.ReactNode };
type CardFooterProps = { children: React.ReactNode };

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white shadow-sm ${className || ""}`}
    >
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="p-6 pb-2">
      <div className="text-lg font-semibold text-neutral-900">{children}</div>
    </div>
  );
}

// Card Content
export function CardContent({ children }: CardContentProps) {
  return <div className="px-6 py-4 text-sm text-neutral-600">{children}</div>;
}

// Card Footer
export function CardFooter({ children }: CardFooterProps) {
  return <div className="px-6 pyb-6 flex items-center gap-4">{children}</div>;
}
