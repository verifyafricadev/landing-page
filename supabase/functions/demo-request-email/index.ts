import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SALES_EMAIL = "sales@verifyafrica.io";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ success: false, error: "RESEND_API_KEY not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const { first_name, last_name, email, company, company_size, industry, phone, message } = body;

    const resend = new Resend(RESEND_API_KEY);

    const text = [
      "New Demo Request from VerifyAfrica Website",
      "",
      "Contact Information:",
      `- Name: ${first_name || ""} ${last_name || ""}`,
      `- Email: ${email || "Not provided"}`,
      `- Phone: ${phone || "Not provided"}`,
      "",
      "Company Details:",
      `- Company: ${company || "Not provided"}`,
      `- Company Size: ${company_size || "Not provided"}`,
      `- Industry: ${industry || "Not specified"}`,
      "",
      "Message:",
      message || "No additional message provided",
    ].join("\n");

    const result = await resend.emails.send({
      from: "VerifyAfrica <noreply@verifyafrica.io>",
      to: [SALES_EMAIL],
      subject: `Demo Request from ${first_name || "?"} ${last_name || ""} - ${company || "Unknown"}`,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return new Response(JSON.stringify({ success: false, error: result.error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true, id: result.data?.id }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});
