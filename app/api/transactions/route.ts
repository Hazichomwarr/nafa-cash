// api/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { convertToCfa } from "@/lib/moneyConverter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      senderName,
      email,
      phone,
      senderCountry,

      recipientName,
      recipientPhone,
      recipientCountry,

      amount, // USD | EUR | CAD | QUID
    } = body;

    // 🧱 1. VALIDATION (backend safety)
    if (
      !senderName ||
      !email ||
      !phone ||
      !recipientName ||
      !recipientPhone ||
      !amount
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🧠 2. FIND OR CREATE USER
    // const user = await db.user.upsert({
    //   where: { email },
    //   update: {
    //     name: senderName,
    //     phone: String(phone),
    //     location: senderCountry,
    //   },
    //   create: {
    //     name: senderName,
    //     email,
    //     phone: String(phone),
    //     location: senderCountry,
    //   },
    // });
    // 1. Try find by email
    let user = await db.user.findUnique({
      where: { email },
    });

    // 2. If not found, try find by phone
    if (!user) {
      user = await db.user.findUnique({
        where: { phone },
      });
    }

    // 3. If still not found → create
    if (!user) {
      user = await db.user.create({
        data: {
          name: senderName,
          email,
          phone,
          location: senderCountry,
        },
      });
    } else {
      // 4. Update existing user
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: senderName,
          email,
          phone,
          location: senderCountry,
        },
      });
    }

    // 🧠 3. FIND OR CREATE RECIPIENT
    let recipient = await db.recipient.findFirst({
      where: {
        phone: recipientPhone,
        senderId: user.id,
      },
    });

    if (!recipient) {
      recipient = await db.recipient.create({
        data: {
          name: recipientName,
          phone: String(recipientPhone),
          location: recipientCountry,
          senderId: user.id,
        },
      });
    }

    // 🧠 4. CONVERT USD → CFA
    const { cfa } = convertToCfa(amount, senderCountry);

    // 🧱 5. CREATE TRANSACTION
    const transaction = await db.transaction.create({
      data: {
        amount: cfa,
        currency: "XOF",
        senderId: user.id,
        recipientId: recipient.id,
      },
    });

    // 💳 6. STRIPE CHECKOUT (charge USD)
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        transactionId: transaction.id,
        email: email,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
