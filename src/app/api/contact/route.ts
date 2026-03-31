// src/app/api/contact/route.ts
// ─── POST /api/contact — validates form data, sends email via Nodemailer ─────
//
// SETUP (choose one provider):
//
//   Option A — Gmail / Google Workspace (simplest to start)
//     SMTP_HOST=smtp.gmail.com
//     SMTP_PORT=465
//     SMTP_SECURE=true
//     SMTP_USER=your-address@gmail.com
//     SMTP_PASS=xxxx-xxxx-xxxx-xxxx   ← 16-char App Password (not your real password)
//                                         Generate at: myaccount.google.com/apppasswords
//
//   Option B — SendGrid
//     SMTP_HOST=smtp.sendgrid.net
//     SMTP_PORT=465
//     SMTP_SECURE=true
//     SMTP_USER=apikey
//     SMTP_PASS=SG.xxxxxxxxxxxxxxxx   ← SendGrid API key
//
//   Option C — Resend (recommended for custom domains, no SMTP needed)
//     RESEND_API_KEY=re_xxxxxxxxxxxx
//     (uncomment the Resend block below and comment out the Nodemailer block)
//
// Add these to .env.local (never commit that file).

import { NextResponse } from "next/server";
import nodemailer        from "nodemailer";
import type { ContactFormData } from "@/lib/types";

// ── Destination ──────────────────────────────────────────────────────────────
const TO_ADDRESS   = "dogubolut@gmail.com";
const FROM_ADDRESS = process.env.SMTP_USER ?? "dogubolut@gmail.com";
const FROM_NAME    = "Carparachne Contact Form";

// ── Input validation (mirrors client-side) ───────────────────────────────────
function serverValidate(data: Partial<ContactFormData>): string | null {
  if (!data.firstName?.trim())  return "First name is required.";
  if (!data.lastName?.trim())   return "Last name is required.";
  if (!data.email?.trim())      return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                                return "Invalid email address.";
  if (!data.subject?.trim())    return "Subject is required.";
  if (!data.message?.trim())    return "Message is required.";
  if (data.message.trim().length < 20)
                                return "Message must be at least 20 characters.";
  return null;
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildHtml(data: ContactFormData): string {
  const orderRow = data.orderNumber?.trim()
    ? `<tr>
        <td style="${tdLabel}">Order #</td>
        <td style="${tdValue}">${escHtml(data.orderNumber!.trim())}</td>
       </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New contact message — Carparachne</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F6F4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;
                      border:1px solid #D4D4D4;overflow:hidden;">

          <!-- Header bar -->
          <tr>
            <td style="background-color:#1A1A1A;padding:28px 36px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.12em;
                         text-transform:uppercase;color:#9A9A9A;">
                New Message
              </p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:400;
                          letter-spacing:-0.02em;color:#ffffff;">
                Carparachne Contact Form
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 0;">

              <!-- Sender summary -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background:#F7F6F4;border:1px solid #D4D4D4;border-radius:6px;
                            margin-bottom:28px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 2px;font-size:11px;font-weight:600;letter-spacing:0.10em;
                               text-transform:uppercase;color:#9A9A9A;">
                      From
                    </p>
                    <p style="margin:0;font-size:18px;font-weight:500;color:#1A1A1A;">
                      ${escHtml(data.firstName)} ${escHtml(data.lastName)}
                    </p>
                    <a href="mailto:${escHtml(data.email)}"
                       style="display:inline-block;margin-top:4px;font-size:14px;
                              color:#C8976A;text-decoration:none;">
                      ${escHtml(data.email)}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Meta table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td style="${tdLabel}">Subject</td>
                  <td style="${tdValue}">${escHtml(data.subject)}</td>
                </tr>
                ${orderRow}
                <tr>
                  <td style="${tdLabel}">Sent at</td>
                  <td style="${tdValue}">${new Date().toLocaleString("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone:  "Europe/Copenhagen",
                  })} CET</td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #D4D4D4;margin:0 0 28px;" />

              <!-- Message body -->
              <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.10em;
                         text-transform:uppercase;color:#9A9A9A;">
                Message
              </p>
              <div style="font-size:15px;line-height:1.7;color:#2C2C2C;
                           white-space:pre-wrap;word-break:break-word;">
${escHtml(data.message.trim())}
              </div>

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:32px 36px;">
              <a href="mailto:${escHtml(data.email)}?subject=Re: ${encodeURIComponent(data.subject)}"
                 style="display:inline-block;padding:12px 24px;background-color:#C8976A;
                        color:#ffffff;font-size:13px;font-weight:500;letter-spacing:0.04em;
                        text-transform:uppercase;text-decoration:none;border-radius:4px;">
                Reply to ${escHtml(data.firstName)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #D4D4D4;
                        background:#F7F6F4;">
              <p style="margin:0;font-size:11px;color:#9A9A9A;line-height:1.6;">
                This message was submitted via the contact form at
                <a href="https://carparachne.com/contact"
                   style="color:#9A9A9A;text-decoration:underline;">
                  carparachne.com/contact
                </a>.
                Do not reply to this automated email — use the button above.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ── Plain-text fallback (required by email clients) ───────────────────────────
function buildText(data: ContactFormData): string {
  const lines = [
    "NEW MESSAGE — CARPARACHNE CONTACT FORM",
    "═".repeat(42),
    "",
    `From:        ${data.firstName} ${data.lastName}`,
    `Email:       ${data.email}`,
    `Subject:     ${data.subject}`,
    data.orderNumber?.trim() ? `Order #:     ${data.orderNumber.trim()}` : null,
    `Sent at:     ${new Date().toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone:  "Europe/Copenhagen",
    })} CET`,
    "",
    "─".repeat(42),
    "Message:",
    "─".repeat(42),
    "",
    data.message.trim(),
    "",
    "─".repeat(42),
    "",
    `Reply directly to: ${data.email}`,
    "This message was submitted via carparachne.com/contact",
  ].filter((l) => l !== null);

  return lines.join("\n");
}

// ── Shared cell styles ────────────────────────────────────────────────────────
const tdLabel = [
  "padding:10px 16px 10px 0",
  "font-size:12px",
  "font-weight:600",
  "letter-spacing:0.08em",
  "text-transform:uppercase",
  "color:#9A9A9A",
  "vertical-align:top",
  "white-space:nowrap",
  "width:120px",
  "border-bottom:1px solid #EFEDE9",
].join(";");

const tdValue = [
  "padding:10px 0",
  "font-size:14px",
  "color:#2C2C2C",
  "vertical-align:top",
  "border-bottom:1px solid #EFEDE9",
].join(";");

// ── Escape HTML special chars ─────────────────────────────────────────────────
function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Nodemailer transport (lazy-created once) ──────────────────────────────────
let _transport: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransport() {
  if (_transport) return _transport;
  _transport = nodemailer.createTransport({
    host:   process.env.SMTP_HOST   ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false", // true by default
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transport;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // 1. Parse body
    let body: Partial<ContactFormData>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    const validationError = serverValidate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 422 });
    }

    const data = body as ContactFormData;

    // 3. Check SMTP env vars are present
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error(
        "[contact] SMTP_USER or SMTP_PASS not set in .env.local — " +
        "email sending is disabled. Form data received:",
        { firstName: data.firstName, email: data.email, subject: data.subject }
      );
      // Return 200 in dev so the form UX works without SMTP configured
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ ok: true, dev: true });
      }
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 503 }
      );
    }

    // 4. Send email
    const transport = getTransport();
    await transport.sendMail({
      from:    `"${FROM_NAME}" <${FROM_ADDRESS}>`,
      to:      TO_ADDRESS,
      replyTo: `"${data.firstName} ${data.lastName}" <${data.email}>`,
      subject: `[Carparachne] ${data.subject} — from ${data.firstName} ${data.lastName}`,
      text:    buildText(data),
      html:    buildHtml(data),
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
