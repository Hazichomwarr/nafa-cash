import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendAdminNotification({
  amount,
  recipientName,
  recipientPhone,
  transactionId,
}: {
  amount: number;
  recipientName: string;
  recipientPhone: string;
  transactionId: string;
}) {
  const msg = {
    to: process.env.ADMIN_EMAIL!,
    from: "no-reply@nafacash.com", // must be verified in SendGrid
    subject: "🚨 New transfer to process",
    html: `
      <h2>New Transfer</h2>
      <p><strong>Amount:</strong> ${amount.toLocaleString()} CFA</p>
      <p><strong>Recipient:</strong> ${recipientName}</p>
      <p><strong>Phone:</strong> ${recipientPhone}</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
    `,
  };

  await sgMail.send(msg);
}
