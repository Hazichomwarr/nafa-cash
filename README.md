# NAFA CASH

NAFA CASH is a remittance platform that allows users to send money to Burkina Faso quickly, securely, and directly to Orange Money wallets.

---

## 🚀 Overview

NAFA CASH enables:

- 💸 Fast money transfers from the US to Burkina Faso
- 📱 Direct delivery to Orange Money wallets
- 🔒 Secure payments powered by Stripe
- 📊 Real-time transaction tracking

---

## 🧱 Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Prisma)
- **Payments:** Stripe Checkout + Webhooks
- **Styling:** Tailwind CSS

---

## ⚙️ Core Features

- Create transactions
- Stripe payment integration
- Webhook-based payment confirmation
- Admin dashboard for payout processing
- Transaction history tracking
- Status lifecycle: `PENDING → PAID → COMPLETED`

---

## 🧠 Architecture

User → Next.js App → API → Database (Prisma)
↓
Stripe
↓
Webhook
↓
Update DB
↓
Admin payout

---

## Getting Started

1. Install dependencies:
   `pnpm install `

2. Setup environment variables:
   Create a .env file:

DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

3. Run database migrations
   `npx prisma migrate dev`

4. Start development server
   pnpm dev

5. Visit:

http://localhost:3000
🔌 Stripe Webhook (Local Development)

6. Run:

stripe listen --forward-to localhost:3000/api/webhooks/stripe

### 📊 Transaction Flow

- User creates transaction
- Redirect to Stripe Checkout
- User completes payment
- Stripe sends webhook
- Transaction marked as PAID
- Admin processes payout
- Transaction marked as COMPLETED

## ⚠️ Notes

This is an MVP system with manual payout handling
FX rates are currently static (will be dynamic later)
Admin authentication is not yet implemented

## 📌 Roadmap

- Authentication system
- Automated payout integration
- Real-time status updates
- Multi-country support
- Mobile optimization

## 🤝 Contributing

This project is currently in active development.

## 📄 License

Private — NAFA CASH
