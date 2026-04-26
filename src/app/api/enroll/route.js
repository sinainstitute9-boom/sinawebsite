import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { name, email, phone, course, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@sinainstitute.com.pk",
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    await transporter.sendMail({
      from: '"SINA Website" <info@sinainstitute.com.pk>',
      to: "info@sinainstitute.com.pk",
      replyTo: email,
      subject: `New Enrollment Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fdad1b; border-radius: 10px;">
          <h2 style="color: #074166; border-bottom: 2px solid #fdad1b; padding-bottom: 10px;">
            New Enrollment Request
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #074166;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #074166;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #074166;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #074166;">Course:</td><td style="padding: 8px; color: #fdad1b; font-weight: bold;">${course}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #074166; vertical-align:top;">Message:</td><td style="padding: 8px;">${message || "-"}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">Sent from SINA Institute website enrollment form</p>
        </div>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })

  } catch (error) {
    console.error("Enroll email error:", error)
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 })
  }
}