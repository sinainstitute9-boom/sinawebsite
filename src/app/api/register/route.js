import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const formData = await req.formData()

    const programTitle = JSON.parse(formData.get("programTitle") || '""')
    const coordinator = JSON.parse(formData.get("coordinator") || '""')
    const email = JSON.parse(formData.get("email") || '""')
    const fullName = JSON.parse(formData.get("fullName") || '""')
    const fatherName = JSON.parse(formData.get("fatherName") || '""')
    const cnic = JSON.parse(formData.get("cnic") || '""')
    const dob = JSON.parse(formData.get("dob") || '""')
    const address = JSON.parse(formData.get("address") || '""')
    const city = JSON.parse(formData.get("city") || '""')
    const contact = JSON.parse(formData.get("contact") || '""')
    const whatsapp = JSON.parse(formData.get("whatsapp") || '""')
    const comments = JSON.parse(formData.get("comments") || '""')

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    })

    await transporter.sendMail({
      from: `"SINA Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📋 New Registration — ${fullName} (${programTitle})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          
          <div style="background: #074166; padding: 28px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800;">New Registration Form</h1>
            <p style="color: #fdad1b; margin: 6px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">SINA Institute</p>
          </div>

          <div style="background: #f8fafc; padding: 28px 32px;">

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #fdad1b;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Course / Program</p>
              <p style="margin: 4px 0 0; color: #074166; font-size: 16px; font-weight: 700;">${programTitle}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #074166;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Full Name</p>
              <p style="margin: 4px 0 0; color: #074166; font-size: 15px; font-weight: 600;">${fullName}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #074166;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Father Name</p>
              <p style="margin: 4px 0 0; color: #074166; font-size: 15px; font-weight: 600;">${fatherName}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #0e7fc1;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Email</p>
              <p style="margin: 4px 0 0; color: #0e7fc1; font-size: 15px; font-weight: 600;">${email}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #1a9e6e;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Contact</p>
              <p style="margin: 4px 0 0; color: #1a9e6e; font-size: 15px; font-weight: 600;">${contact}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #1a9e6e;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">WhatsApp</p>
              <p style="margin: 4px 0 0; color: #1a9e6e; font-size: 15px; font-weight: 600;">${whatsapp}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #9333ea;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">CNIC</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 15px; font-weight: 600;">${cnic}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #9333ea;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Date of Birth</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 15px; font-weight: 600;">${dob}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #e05c1a;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Address</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 15px; font-weight: 600;">${address}, ${city}</p>
            </div>

            ${coordinator ? `
            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #074166;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Coordinator</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 15px; font-weight: 600;">${coordinator}</p>
            </div>
            ` : ""}

            ${comments ? `
            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #6b7280;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Comments</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 14px; line-height: 1.7;">${comments}</p>
            </div>
            ` : ""}

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: Your Registration at SINA Institute"
                style="display: inline-block; background: #074166; color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 14px;">
                ✉️ Reply to ${fullName}
              </a>
            </div>

            <p style="color: #d1d5db; font-size: 11px; text-align: center; margin-top: 20px;">
              Sent from SINA Institute registration form
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true, message: "Registration submitted successfully! We will contact you soon." })

  } catch (error) {
    console.error("Register error:", error.message)
    return Response.json({ success: false, message: "Server error. Please try again." }, { status: 500 })
  }
}