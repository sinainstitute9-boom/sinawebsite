"use client"
import { useState } from "react"

export default function ContactForm() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    phone: "", 
    address: "", 
    message: "" 
  })
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", company: "", phone: "", address: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name" required
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
        <input type="email" placeholder="Email" required
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Company"
          value={form.company} onChange={e => setForm({...form, company: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
        <input type="text" placeholder="Phone Number"
          value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
      </div>
      <input type="text" placeholder="Address"
        value={form.address} onChange={e => setForm({...form, address: e.target.value})}
        className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
      <textarea placeholder="Your Message" rows="4" required
        value={form.message} onChange={e => setForm({...form, message: e.target.value})}
        className="p-3 border border-gray-300 rounded-lg w-full text-gray-800" />
      <button type="submit" disabled={status === "sending"}
        className="w-full bg-[#fdad1b] text-black font-semibold py-3 rounded-full hover:scale-105 transition disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p className="text-green-600 text-center font-semibold">✅ Message sent successfully!</p>}
      {status === "error" && <p className="text-red-600 text-center font-semibold">❌ Error sending. Please try again.</p>}
    </form>
  )
}
