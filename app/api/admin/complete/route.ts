// app/api/admin/complete/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const transactionId = formData.get("transactionId") as string;

  if (!transactionId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  await db.transaction.update({
    where: { id: transactionId },
    data: {
      status: "COMPLETED",
      updatedAt: new Date(),
    },
  });

  return NextResponse.redirect("http://localhost:3000/admin");
}
