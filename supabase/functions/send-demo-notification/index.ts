import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SALES_EMAIL = "sales@verifyafrica.io";
const FROM_EMAIL = "VerifyAfrica <noreply@verifyafrica.io>";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const {
      first_name,
      last_name,
      email,
      company,
      company_size,
      industry,
      phone,
      message,
    } = body;

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ success: false, error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(RESEND_API_KEY);

    const emailContent = [
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

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [SALES_EMAIL],
      subject: `Demo Request from ${first_name || ""} ${last_name || ""} - ${company || "Unknown Company"}`,
      text: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
