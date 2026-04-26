// import { NextResponse } from "next/server"
// import { createClient } from "@sanity/client"
// import nodemailer from "nodemailer"

// const sanity = createClient({
//   projectId: "YOUR_PROJECT_ID",
//   dataset: "production",
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: "2024-01-01",
//   useCdn: false,
// })

// export async function POST(req) {
//   try {
//     const formData = await req.formData()

//     const photoFile = formData.get("photo")

//     // Upload image to Sanity
//     let imageAsset = null
//     if (photoFile) {
//       const buffer = Buffer.from(await photoFile.arrayBuffer())

//       imageAsset = await sanity.assets.upload("image", buffer, {
//         filename: photoFile.name,
//       })
//     }

//     // Create document
//     await sanity.create({
//       _type: "registration",
//       programTitle: JSON.parse(formData.get("programTitle")),
//       fullName: JSON.parse(formData.get("fullName")),
//       fatherName: JSON.parse(formData.get("fatherName")),
//       cnic: JSON.parse(formData.get("cnic")),
//       dob: JSON.parse(formData.get("dob")),
//       address: JSON.parse(formData.get("address")),
//       city: JSON.parse(formData.get("city")),
//       contact: JSON.parse(formData.get("contact")),
//       whatsapp: JSON.parse(formData.get("whatsapp")),
//       academics: JSON.parse(formData.get("academics")),
//       experience: JSON.parse(formData.get("experience")),
//       comments: JSON.parse(formData.get("comments")),
//       agreed: JSON.parse(formData.get("agreed")),
//       photo: imageAsset
//         ? {
//             _type: "image",
//             asset: {
//               _type: "reference",
//               _ref: imageAsset._id,
//             },
//           }
//         : null,
//       createdAt: new Date().toISOString(),
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ success: false })
//   }
  
//   export async function POST(req) {
//   try {
//     const formData = await req.formData()
//     const email = JSON.parse(formData.get("email"))

//     // 1️⃣ Upload + Save
//     await sanity.create({
//       _type: "registration",
//       email,
//       createdAt: new Date().toISOString(),
//     })

//     // 2️⃣ Email Send
//     const emailRes = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: "New Registration",
//       text: "New form submitted",
//     })

//     if (!emailRes.messageId) {
//       throw new Error("Email not sent")
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Form submitted & email sent successfully",
//     })
//   } catch (error) {
//     console.error(error)

//     return NextResponse.json({
//       success: false,
//       message: error.message || "Something went wrong",
//     })
//   }
// }
// }



import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import nodemailer from "nodemailer"

// Sanity Client
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// Email Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req) {
  try {
    const formData = await req.formData()

    // Form fields
    const fullName    = JSON.parse(formData.get("fullName"))
    const fatherName  = JSON.parse(formData.get("fatherName"))
    const email       = JSON.parse(formData.get("email"))
    const cnic        = JSON.parse(formData.get("cnic"))
    const dob         = JSON.parse(formData.get("dob"))
    const address     = JSON.parse(formData.get("address"))
    const city        = JSON.parse(formData.get("city"))
    const contact     = JSON.parse(formData.get("contact"))
    const whatsapp    = JSON.parse(formData.get("whatsapp"))
    const academics   = JSON.parse(formData.get("academics"))
    const experience  = JSON.parse(formData.get("experience"))
    const comments    = JSON.parse(formData.get("comments"))
    const agreed      = JSON.parse(formData.get("agreed"))
    const programTitle = JSON.parse(formData.get("programTitle"))
    const photoFile   = formData.get("photo")

    // Photo upload to Sanity
    let imageAsset = null
    if (photoFile) {
      const buffer = Buffer.from(await photoFile.arrayBuffer())
      imageAsset = await sanity.assets.upload("image", buffer, {
        filename: photoFile.name,
      })
    }

    // Save to Sanity
    await sanity.create({
      _type: "registration",
      programTitle,
      fullName,
      fatherName,
      email,
      cnic,
      dob,
      address,
      city,
      contact,
      whatsapp,
      academics,
      experience,
      comments,
      agreed,
      photo: imageAsset
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          }
        : null,
      createdAt: new Date().toISOString(),
    })

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Registration: ${fullName}`,
      html: `
        <h2>New Registration Received</h2>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr><td><b>Program</b></td><td>${programTitle}</td></tr>
          <tr><td><b>Full Name</b></td><td>${fullName}</td></tr>
          <tr><td><b>Father Name</b></td><td>${fatherName}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>CNIC</b></td><td>${cnic}</td></tr>
          <tr><td><b>Date of Birth</b></td><td>${dob}</td></tr>
          <tr><td><b>Contact</b></td><td>${contact}</td></tr>
          <tr><td><b>WhatsApp</b></td><td>${whatsapp}</td></tr>
          <tr><td><b>City</b></td><td>${city}</td></tr>
          <tr><td><b>Address</b></td><td>${address}</td></tr>
          <tr><td><b>Academics</b></td><td>${academics}</td></tr>
          <tr><td><b>Experience</b></td><td>${experience}</td></tr>
          <tr><td><b>Comments</b></td><td>${comments}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })

  } catch (error) {
    console.error("send-query error:", error)
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    })
  }
}