import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import nodemailer from "nodemailer"

const sanity = createClient({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

export async function POST(req) {
  try {
    const formData = await req.formData()

    const photoFile = formData.get("photo")

    // Upload image to Sanity
    let imageAsset = null
    if (photoFile) {
      const buffer = Buffer.from(await photoFile.arrayBuffer())

      imageAsset = await sanity.assets.upload("image", buffer, {
        filename: photoFile.name,
      })
    }

    // Create document
    await sanity.create({
      _type: "registration",
      programTitle: JSON.parse(formData.get("programTitle")),
      fullName: JSON.parse(formData.get("fullName")),
      fatherName: JSON.parse(formData.get("fatherName")),
      cnic: JSON.parse(formData.get("cnic")),
      dob: JSON.parse(formData.get("dob")),
      address: JSON.parse(formData.get("address")),
      city: JSON.parse(formData.get("city")),
      contact: JSON.parse(formData.get("contact")),
      whatsapp: JSON.parse(formData.get("whatsapp")),
      academics: JSON.parse(formData.get("academics")),
      experience: JSON.parse(formData.get("experience")),
      comments: JSON.parse(formData.get("comments")),
      agreed: JSON.parse(formData.get("agreed")),
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false })
  }
  export async function POST(req) {
  try {
    const formData = await req.formData()
    const email = JSON.parse(formData.get("email"))

    // 1️⃣ Upload + Save
    await sanity.create({
      _type: "registration",
      email,
      createdAt: new Date().toISOString(),
    })

    // 2️⃣ Email Send
    const emailRes = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Registration",
      text: "New form submitted",
    })

    if (!emailRes.messageId) {
      throw new Error("Email not sent")
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted & email sent successfully",
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    })
  }
}
}