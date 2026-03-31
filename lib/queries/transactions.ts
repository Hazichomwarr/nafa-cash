// lib/queries/transactions.ts

import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getUserTransactions = (user_id: string) => {
  return db.transaction.findMany({
    where: { id: user_id },
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
