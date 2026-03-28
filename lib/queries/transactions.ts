// lib/queries/transactions.ts

import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getUserTransactions = (userId: string) => {
  return db.transaction.findMany({
    where: { senderId: userId },
    select: {
      id: true,
      amount: true,
      status: true,
      recipient: true,
      country: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export type TransactionArray = Prisma.PromiseReturnType<
  typeof getUserTransactions
>;
export type TransactionType = TransactionArray[number];
