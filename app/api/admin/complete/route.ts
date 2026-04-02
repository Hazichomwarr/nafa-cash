import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const authHeader = req.headers.get("authorization");
  // console.log("auth-header:", authHeader);
  // if (!authHeader) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // const token = authHeader.split(" ")[1];
  // console.log("token:", token);
  // if (token !== process.env.ADMIN_SECRET) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { transactionId, status } = await req.json();
  if (!transactionId || !status) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });
  if (!transaction) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (status === "COMPLETED" && transaction.status !== "PROCESSING") {
    return NextResponse.json(
      { error: "Must be PROCESSING first" },
      { status: 400 },
    );
  }

  await db.transaction.update({
    where: { id: transactionId },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ message: "success" });
}
