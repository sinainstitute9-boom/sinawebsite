"use client"

import { useState } from "react"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"




const courses = [
  "Web Development",
  "Cyber Security (CEH)",
  "Artificial Intelligence",
  "E-Commerce",
  "CCTV Technician",
  "CompTIA A+ (Course 1 & 2)",
  "Juniper (JNCIA-JNCIS)",
  "Fortinet (FCF-FCA-FCP)",
  "MikroTik (MTCNA-MTCRE)",
  "Cloud Computing (AWS)",
  "ITIL Foundation",
  "Wireshark (WCNA)",
  "CISCO (CCNA/CCNP/CCIE)",
  "Graphic Design",
  "Digital Marketing",
  "Database Management",
  "Microsoft Azure",
  "Fiber Optics",
  "Wireless Communication",
  "PLC & Scada/HMI",
  "Industrial Electrician",
  "Home Appliances Electrician",
  "Microcontrollers / Arduino",
  "Robotics",
  "Basic Electricals / Electronics",
  "SAP S/4Hana (ERP)",
  "QuickBooks / Tally",
  "Forex Trading",
  "Advance MS Excel, Power BI",
  "Spoken English",
  "IELTS / PTE / TOEFL",
  "Quantity Surveyor",
  "AutoCAD (Electrical / Civil)",
  "Revit / SketchUp",
  "First Aid / Fire Safety"
]

export default function RegistrationForm() {
  const [form, setForm] = useState({
    programTitle: "",
    coordinator: "",
    batchNo: "",
    email: "",
    fullName: "",
    fatherName: "",
    cnic: "",
    dob: "",
    address: "",
    city: "",
    contact: "",
    whatsapp: "",
    academics: [{ degree: "", year: "", institution: "" }],
    experience: [{ organization: "", designation: "", period: "" }],
    comments: "",
    agreed: false,
    photo: null,
  })
  const [status, setStatus] = useState(null)
const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setStatus(null)

  const formData = new FormData()

  Object.keys(form).forEach((key) => {
    if (key === "photo") {
      formData.append("photo", form.photo)
    } else {
      formData.append(key, JSON.stringify(form[key]))
    }
  })

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.success) {
      setStatus({ success: true, message: data.message })
    } else {
      setStatus({ success: false, message: data.message })
    }
  } catch (err) {
    setStatus({ success: false, message: "Server error" })
  }

  setLoading(false)
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

//   const handleSubmit = async (e) => {
//   e.preventDefault()

//   const formData = new FormData()

//   Object.keys(form).forEach((key) => {
//     if (key === "photo") {
//       formData.append("photo", form.photo)
//     } else {
//       formData.append(key, JSON.stringify(form[key]))
//     }
//   })

//   const res = await fetch("/api/register", {
//     method: "POST",
//     body: formData,
//   })

//   const data = await res.json()
//   alert(data.success ? "Submitted!" : "Error")
// }

  return (
   

      
    <div className="min-h-screen bg-white">
        <Navbar />
    

      <main className="max-w-3xl mx-auto p-8 mt-30 
        text-gray-700">
      
        <h1 className="text-3xl font-bold text-[#074166] mb-6 flex items-center gap-2 justify-center
        ">Registration Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm
        ">
       <select
  name="programTitle"
  value={form.programTitle}
  onChange={handleChange}
  required
  className="w-full  border p-3 rounded
   focus:outline-none focus:ring-2 focus:ring-[#fdad1b]"
>
  <option value="">Select Course</option>

  {courses.map((course, index) => (
    <option key={index} value={course}>
      {course}
    </option>
  ))}
</select>

          <input
            name="coordinator"
            value={form.coordinator}
            placeholder="Coordinator"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
<input
  type="email"
  name="email"
  placeholder="Email Address"
  value={form.email}
  onChange={handleChange}
  required
  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdad1b]"
/>
          {/* <input
            name="batchNo"
            value={form.batchNo}
            placeholder="Batch No"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          /> */}

          <input
            name="fullName"
            value={form.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="fatherName"
            value={form.fatherName}
            placeholder="Father Name"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="cnic"
            value={form.cnic}
            placeholder="CNIC"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="relative">
  <input
    type="date"
    name="dob"
    value={form.dob}
    onChange={handleChange}
    className="w-full border p-3 pt-5 rounded peer"
  />
  <label className="absolute left-3 top-1 text-sm
   text-gray-500">
    Date of Birth
  </label>
</div>

          <input
            name="address"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="contact"
            value={form.contact}
            placeholder="Contact No"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="whatsapp"
            value={form.whatsapp}
            placeholder="WhatsApp"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
           

                <div className="relative">
          <input
  type="file"
  name="photo"
  accept="image/*"

  onChange={(e) => {
    setForm({ ...form, photo: e.target.files[0] })
  }}
  
  className="w-full  border  p-3 pt-5 rounded peer"
/>
          <label className="absolute left-3 top-1 text-sm
   text-gray-400">
    Upload Photo
  </label>
        </div>

          <textarea
            name="comments"
            value={form.comments}
            placeholder="Comments"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="mr-2"
            />
            I agree to Terms & Conditions
          </label>

          <button
            type="submit"
            className="w-full bg-[#fdad1b] text-[#074166] font-semibold py-3 rounded"
          >
            Submit
          </button>
          {status && (
  <div
    className={`p-3 rounded text-center font-semibold ${
      status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {status.message}
  </div>
)}
        </form>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}