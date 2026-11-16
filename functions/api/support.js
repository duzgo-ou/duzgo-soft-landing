import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const clean = (s) => String(s || "").replace(/<[^>]*>?/gm, "").trim();
    const ticketId = clean(data.ticketId);
    const name = clean(data.name);
    const email = clean(data.email).toLowerCase();
    const product = clean(data.product);
    const message = clean(data.message);

    if (!ticketId || !name || !email.includes("@") || message.length < 2) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid input" }), { status: 400 });
    }

    const boundary = "----=_Part_" + Date.now();
    const subject = `[${ticketId}] ${product} — Support Request from ${name}`;
    const rawEmail = [
      `From: "Duzgo Soft Support" <support@duzgosoft.com>`,
      `To: duzgo.estonia@gmail.com`,
      `Reply-To: "${name.replace(/"/g, "")}" <${email}>`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      ``,
      `Ticket ID: ${ticketId}`,
      `From: ${name} (${email})`,
      `Product: ${product}`,
      ``,
      `Message:`,
      `${message}`,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset="UTF-8"`,
      ``,
      `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111827;line-height:1.6;">`,
      `<p style="margin:0 0 12px;"><strong>Ticket ID:</strong> ${ticketId}<br><strong>Customer:</strong> ${name} (&lt;${email}&gt;)<br><strong>Product:</strong> ${product}</p>`,
      `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">`,
      `<p style="white-space:pre-wrap;margin:0;">${message}</p>`,
      `</div>`,
      `--${boundary}--`
    ].join("\r\n");

    const msg = new EmailMessage("support@duzgosoft.com", "duzgo.estonia@gmail.com", rawEmail);
    await context.env.SEND_EMAIL.send(msg);

    return new Response(JSON.stringify({ ok: true, ticketId }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }
}
