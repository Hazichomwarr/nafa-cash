// /app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { sendAdminNotification } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const body = await req.text(); // ⚠️ must be raw body
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  // first, Verify Stripe signature
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("❌ Invalid webhook signature", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ✅ Payment success
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const transactionId = session.metadata?.transactionId;

        if (!transactionId) {
          console.error("Missing transactionId in metadata");
          break;
        }

        // 🔒 Idempotency check (avoid double processing)
        const existing = await db.transaction.findUnique({
          where: { id: transactionId },
        });

        if (!existing) {
          console.error("Transaction not found:", transactionId);
          break;
        }

        if (existing.status === "PAID") {
          console.log("⚠️ Already processed:", transactionId);
          break;
        }

        await db.transaction.update({
          where: { id: transactionId },
          data: {
            status: "PAID",
            stripePaymentId: session.id,
            stripePaymentStatus: "SUCCEEDED",
          },
        });

        // fetch full transaction
        const tx = await db.transaction.findFirst({
          where: { id: transactionId },
          include: { recipient: true },
        });

        if (tx) {
          try {
            await sendAdminNotification({
              amount: tx!.amount,
              recipientName: tx!.recipient.name,
              phone: tx!.recipient.phone,
            });
          } catch (error) {
            console.error("❌ SendGrid error:", error);
          }
        }

        console.log("✅ Payment completed:", transactionId);
        break;
      }

      // ❌ User didn’t complete payment
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        const transactionId = session.metadata?.transactionId;
        if (!transactionId) break;

        await db.transaction.update({
          where: { id: transactionId },
          data: {
            status: "CANCELLED",
          },
        });

        console.log("⚠️ Payment expired:", transactionId);
        break;
      }

      // ❌ Card failure / payment failure
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log("❌ Payment failed:", paymentIntent.id);
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        const transactionId = session.metadata?.transactionId;
        if (!transactionId) break;

        await db.transaction.update({
          where: { id: transactionId },
          data: {
            status: "PAID",
            stripePaymentStatus: "SUCCEEDED",
          },
        });

        break;
      }
      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
