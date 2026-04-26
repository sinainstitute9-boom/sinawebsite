"use client"

import { useState } from "react"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"
import Navbar from "../components/NavBar"

export default function EnrollPage() {

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  course: "",
  message: ""
})

const handleChange = (e) => {
  setForm({...form, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const res = await fetch("/api/enroll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })

  if (res.ok) {
    alert("Enrollment request sent successfully!")
  } else {
    alert("Something went wrong. Please try again.")
  }
}

return (

  <div className="bg-gray-100 min-h-screen pt-24">

    <Navbar />

    <section className="py-20 px-6 bg-gray-100 min-h-screen">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 border-[#fdad1b]">

        <h1 className="text-4xl font-bold text-center text-[#074166]">
          Enroll Now
        </h1>

        <p className="text-center text-gray-800 mt-3">
          Fill the form and our team will contact you soon.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="p-3 border rounded-lg w-full text-gray-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="p-3 border rounded-lg w-full text-gray-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="p-3 border rounded-lg w-full text-gray-500"
            />

            <select
              name="course"
              required
              onChange={handleChange}
              className="p-3 border rounded-lg w-full text-blue-950"
            >
              <option value="">Select Course</option>

              <optgroup label="── IT & Software ──">
                <option>Web Development</option>
                <option>Artificial Intelligence</option>
                <option>E-Commerce</option>
                <option>Cloud Computing (AWS)</option>
                <option>Database Management</option>
                <option>Microsoft Azure</option>
                <option>Graphic Design</option>
                <option>Digital Marketing</option>
              </optgroup>

              <optgroup label="── Networking & Cyber Security ──">
                <option>Cyber Security (CEH)</option>
                <option>CompTIA A+ (Course 1 & 2)</option>
                <option>Juniper (JNCIA-JNCIS)</option>
                <option>Fortinet (FCF-FCA-FCP)</option>
                <option>MikroTik (MTCNA-MTCRE)</option>
                <option>Wireshark (WCNA)</option>
                <option>CISCO (CCNA/CCNP/CCIE)</option>
                <option>ITIL Foundation</option>
                <option>CCTV Technician</option>
                <option>Fiber Optics</option>
                <option>Wireless Communication</option>
              </optgroup>

              <optgroup label="── Engineering & Technical ──">
                <option>PLC & Scada/HMI</option>
                <option>Industrial Electrician</option>
                <option>Home Appliances Electrician</option>
                <option>Microcontrollers / Arduino</option>
                <option>Robotics</option>
                <option>Basic Electricals / Electronics</option>
              </optgroup>

              <optgroup label="── Business & Finance ──">
                <option>SAP S/4Hana (ERP)</option>
                <option>QuickBooks / Tally</option>
                <option>Forex Trading</option>
                <option>Advance Excel</option>
                <option>PMP - Project Management Professional</option>
              </optgroup>

              <optgroup label="── Language & Professional Skills ──">
                <option>Spoken English</option>
                <option>IELTS / PTE / TOEFL</option>
                <option>Quantity Surveyor</option>
                <option>AutoCAD (Electrical / Civil)</option>
                <option>Revit / SketchUp</option>
                <option>First Aid / Fire Safety</option>
              </optgroup>

            </select>

          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            onChange={handleChange}
            className="p-3 border rounded-lg w-full text-gray-500"
          />

          <button
            type="submit"
            className="w-full bg-[#fdad1b] text-[#074166] font-semibold py-3 rounded-full hover:scale-105 transition"
          >
            Submit Enrollment
          </button>

        </form>

      </div>

    </section>

    <Footer />
    <WhatsAppButton />

  </div>

)

}
