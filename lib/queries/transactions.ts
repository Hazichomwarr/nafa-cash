// lib/queries/transactions.ts

import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getUserTransactions = async (email: string) => {
  const user = await db.user.findFirst({ where: { email } });

  if (!user) return [];

  return db.transaction.findMany({
    where: { senderId: user.id },
    include: { recipient: true },
    orderBy: { createdAt: "desc" },
  });
};

export type TransactionArray = Prisma.PromiseReturnType<
  typeof getUserTransactions
>;
export type TransactionType = TransactionArray[number];
