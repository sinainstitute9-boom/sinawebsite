"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function ContactPage() {

  // ✅ FIX: hooks top pe
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert("Enrollment request sent successfully");
    }
  };

  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="text-center text-[#074166] mt-20 relative">
        <Image
          src="/images/contact.png"
          alt="contact hero"
          width={1920}
          height={600}
          className="w-screen h-full object-contain opacity-90"
        />
      </section>

      {/* CONTACT INFO */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#074166] mb-3">📍 Address</h3>
            <p className="text-gray-600">Your Academy Address Here</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#074166] mb-3">📞 Phone</h3>
            <p className="text-gray-600">+92 300 0000000</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#074166] mb-3">📧 Email</h3>
            <p className="text-gray-600">info@sinaacademy.com</p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 border-[#fdad1b]">

          <h1 className="text-4xl font-bold text-center text-[#074166]">
            Enroll Now
          </h1>

          <p className="text-center text-gray-800 mt-3">
            Fill the form and our team will contact you soon.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">

            <div className="grid md:grid-cols-2 gap-4 text-gray-500">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4 text-gray-500">

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />

              <select
                name="course"
                required
                onChange={handleChange}
                className="p-3 border rounded-lg w-full text-blue-950"
              >
                <option value="">Select Course</option>
                <option>Web Development</option>
                <option>Artificial Intelligence</option>
                <option>Data Science</option>
                <option>Cyber Security</option>
                <option>Cloud Computing</option>
                <option>Digital Marketing</option>
              </select>

            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
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

      {/* MAP */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=693+Rehman+Baba+Rd,+I-8%2F4+I+8%2F4+I-8,+Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-40 rounded-lg border-2 border-[#fbae1a]"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}