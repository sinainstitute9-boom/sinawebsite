// import nodemailer from "nodemailer"
// import { NextResponse } from "next/server"

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// })
// export async function POST(req) {
//   console.log("GMAIL_USER:", process.env.GMAIL_USER)
//   console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "SET" : "NOT SET")
//   console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL)
  

//   try {
//     const { name, email, phone, course, message } = await req.json()

//     if (!name || !email || !phone) {
//       return NextResponse.json(
//         { error: "Name, email and phone are required" },
//         { status: 400 }
//       )
//     }

//     await transporter.sendMail({
//       from: `"SINA Institute Website" <${process.env.GMAIL_USER}>`,
//       to: process.env.CONTACT_EMAIL,
//       replyTo: email,
//       subject: `📩 New Enrollment — ${name} (${course || "Course not selected"})`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          
//           <!-- Header -->
//           <div style="background: #074166; padding: 28px 32px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800;">
//               New Enrollment Request
//             </h1>
//             <p style="color: #fdad1b; margin: 6px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">
//               SINA Institute
//             </p>
//           </div>

//           <!-- Content -->
//           <div style="background: #f8fafc; padding: 28px 32px;">

//             <!-- Name -->
//             <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #074166;">
//               <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Full Name</p>
//               <p style="margin: 4px 0 0; color: #074166; font-size: 16px; font-weight: 700;">${name}</p>
//             </div>

//             <!-- Email -->
//             <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #0e7fc1;">
//               <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Email</p>
//               <a href="mailto:${email}" style="display: block; margin: 4px 0 0; color: #0e7fc1; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
//             </div>

//             <!-- Phone -->
//             <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #1a9e6e;">
//               <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Phone</p>
//               <a href="tel:${phone}" style="display: block; margin: 4px 0 0; color: #1a9e6e; font-size: 15px; font-weight: 600; text-decoration: none;">${phone}</a>
//             </div>

//             <!-- Course -->
//             <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #fdad1b;">
//               <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Course</p>
//               <p style="margin: 4px 0 0; color: #074166; font-size: 15px; font-weight: 600;">${course || "Not specified"}</p>
//             </div>

//             <!-- Message -->
//             ${message ? `
//             <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #9333ea;">
//               <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Message</p>
//               <p style="margin: 4px 0 0; color: #374151; font-size: 14px; line-height: 1.7;">${message}</p>
//             </div>
//             ` : ""}

//             <!-- Reply Button -->
//             <div style="text-align: center; margin-top: 24px;">
//               <a href="mailto:${email}?subject=Re: Your Enrollment at SINA Institute"
//                 style="display: inline-block; background: #074166; color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 14px;">
//                 ✉️ Reply to ${name}
//               </a>
//             </div>

//             <p style="color: #d1d5db; font-size: 11px; text-align: center; margin-top: 20px;">
//               Sent from contact form at sinainstitute9.com
//             </p>
//           </div>
//         </div>
//       `,
//     })

//     return NextResponse.json({ success: true })

//   } catch (error) {
//     console.error("Email send error:", error.message, error.code, error.response)
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     )
//   }
// }




import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

export async function POST(req) {
  try {
    const { name, email, phone, course, message } = await req.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required" },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: `"SINA Institute Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 New Enrollment — ${name} (${course || "Course not selected"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          
          <div style="background: #074166; padding: 28px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800;">
              New Enrollment Request
            </h1>
            <p style="color: #fdad1b; margin: 6px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">
              SINA Institute
            </p>
          </div>

          <div style="background: #f8fafc; padding: 28px 32px;">

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #074166;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Full Name</p>
              <p style="margin: 4px 0 0; color: #074166; font-size: 16px; font-weight: 700;">${name}</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #0e7fc1;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Email</p>
              <a href="mailto:${email}" style="display: block; margin: 4px 0 0; color: #0e7fc1; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #1a9e6e;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Phone</p>
              <a href="tel:${phone}" style="display: block; margin: 4px 0 0; color: #1a9e6e; font-size: 15px; font-weight: 600; text-decoration: none;">${phone}</a>
            </div>

            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #fdad1b;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Course</p>
              <p style="margin: 4px 0 0; color: #074166; font-size: 15px; font-weight: 600;">${course || "Not specified"}</p>
            </div>

            ${message ? `
            <div style="background: white; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; border-left: 4px solid #9333ea;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Message</p>
              <p style="margin: 4px 0 0; color: #374151; font-size: 14px; line-height: 1.7;">${message}</p>
            </div>
            ` : ""}

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: Your Enrollment at SINA Institute"
                style="display: inline-block; background: #074166; color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 14px;">
                ✉️ Reply to ${name}
              </a>
            </div>

            <p style="color: #d1d5db; font-size: 11px; text-align: center; margin-top: 20px;">
              Sent from sinainstitute.com.pk
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Email error:", error.message)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
