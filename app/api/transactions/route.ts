// api/transactions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, recipientName, recipientPhone, senderId } = body;

    // // FAKE SENDER
    // const sender = await db.user.create({
    //   data: {
    //     name: "Hamza Mare",
    //     email: "hamza@email.com",
    //     phone: "+1234555555",
    //   },
    // });
    // const senderId = sender.id;

    // basic validation
    if (!amount || !recipientName || !recipientPhone || !senderId) {
      return NextResponse.json({ error: "Missings Fields" }, { status: 400 });
    }

    // 1.create recipient
    let recipient = await db.recipient.findFirst({
      where: {
        phone: recipientPhone,
        senderId,
      },
    });

    if (!recipient) {
      recipient = await db.recipient.create({
        data: {
          name: recipientName,
          phone: recipientPhone,
          senderId,
        },
      });
    }

    // 2. create transaction
    const transaction = await db.transaction.create({
      data: {
        amount,
        senderId,
        recipientId: recipient.id,
      },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
