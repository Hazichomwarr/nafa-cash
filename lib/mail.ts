import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendAdminNotification({
  amount,
  recipientName,
  phone,
}: {
  amount: number;
  recipientName: string;
  phone: string;
}) {
  await sgMail.send({
    to: "marehamza8@gmail.com",
    from: "marehamza8@gmail.com",
    subject: "💸 New NAFA CASH Transfer",
    html: `
      <h2>New Transfer Received</h2>
      <p><strong>Amount:</strong> ${amount.toLocaleString()} CFA</p>
      <p><strong>Recipient:</strong> ${recipientName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <br/>
      <a href='https://nafa-cash.vercel.app'>👉 Go to admin dashboard to process</a>
      <p style="color:red;"><strong>Action required now</strong></p>
    `,
  });
}
