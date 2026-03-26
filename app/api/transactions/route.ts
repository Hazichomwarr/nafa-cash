// api/transactions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, recipientName, recipientPhone, senderId } = body;

    // basic validation
    if (!amount || !recipientName || !recipientPhone || !senderId) {
      return NextResponse.json({ error: "Missings Fields" }, { status: 400 });
    }

    // 1.Create recipient
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

    // 2.Create transaction
    const transaction = await db.transaction.create({
      data: {
        amount,
        senderId,
        recipientId: recipient.id,
      },
    });

    // 3.Create a Stripe checkout Session
    const amountInUsd = Math.round(amount / 545); // rough conversion
    const amountInCents = amountInUsd * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "NAFA CASH TRANSFER",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        transactionId: transaction.id,
      },
    });

    // return NextResponse.json({ transaction });
    return NextResponse.json({
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
