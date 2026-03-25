# NAFA CASH - MVP Design

## 1. Problem

Send money to Burkina Faso simply

## 2. Constraints

- Only Burkina Faso
- Manual payout
- Stripe payments

## 3. Actors

- Sender
- Recipient
- Admin
- Stripe
- Orange Money

## 4. User Flow

1. User submits transaction
2. Pays via Stripe
3. Webhook updates status
4. Admin sends money
   User → App → Stripe → Webhook → Admin → Orange Money

## 5. Entities

- User
- Recipient
- Transaction
  User → Transaction → Recipient

## 6. API

POST /transactions
GET /transactions
POST /webhooks/stripe

## 7. Failure Cases

- double submit
- webhook failure
- payout delay
