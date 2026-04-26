// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsAppButton";



// export default function ContactPage() {
//   const [loading, setLoading] = useState(false)
// const [submitted, setSubmitted] = useState(false)

// const handleSubmit = async (e) => {
//   e.preventDefault()
//   setLoading(true)

//   try {
//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     })

//     const data = await res.json()

//     if (data.success) {
//       setSubmitted(true)
//       setForm({ name: "", email: "", phone: "", course: "", message: "" })
//     } else {
//       alert("Something went wrong. Please contact us on WhatsApp.")
//     }
//   } catch {
//     alert("Network error. Please try again.")
//   } finally {
//     setLoading(false)
//   }
// }

//   // ✅ FIX: hooks top pe
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     course: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/enroll", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(form)
//     });

//     if (res.ok) {
//       alert("Enrollment request sent successfully");
//     }
//   };

//   return (
//     <div className="bg-white">
//       <Navbar />

//       {/* HERO */}
//       <section className="text-center text-[#074166] mt-20 relative">
//         <Image
//           src="/images/contact.png"
//           alt="contact hero"
//           width={1920}
//           height={600}
//           className="w-screen h-full object-contain opacity-90"
//         />
//       </section>

//       {/* CONTACT INFO */}
//       <section className="py-16 px-6 bg-gray-50">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h3 className="text-xl font-semibold text-[#074166] mb-3">📍 Address</h3>
//             <p className="text-gray-600">Your Academy Address Here</p>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h3 className="text-xl font-semibold text-[#074166] mb-3">📞 Phone</h3>
//             <p className="text-gray-600">+92 300 0000000</p>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h3 className="text-xl font-semibold text-[#074166] mb-3">📧 Email</h3>
//             <p className="text-gray-600">info@sinaacademy.com</p>
//           </div>

//         </div>
//       </section>

//       {/* CONTACT FORM */}
//       <section className="py-16 px-6 bg-gray-100">
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 border-[#fdad1b]">

//           <h1 className="text-4xl font-bold text-center text-[#074166]">
//             Enroll Now
//           </h1>

//           <p className="text-center text-gray-800 mt-3">
//             Fill the form and our team will contact you soon.
//           </p>

//           <form onSubmit={handleSubmit} className="mt-10 space-y-5">

//             <div className="grid md:grid-cols-2 gap-4 text-gray-500">

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 required
//                 onChange={handleChange}
//                 className="p-3 border rounded-lg w-full"
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 required
//                 onChange={handleChange}
//                 className="p-3 border rounded-lg w-full"
//               />

//             </div>

//             <div className="grid md:grid-cols-2 gap-4 text-gray-500">

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 required
//                 onChange={handleChange}
//                 className="p-3 border rounded-lg w-full"
//               />

//               <select
//                 name="course"
//                 required
//                 onChange={handleChange}
//                 className="p-3 border rounded-lg w-full text-blue-950"
//               >
//                 <option value="">Select Course</option>
//                 <option>Web Development</option>
//                 <option>Artificial Intelligence</option>
//                 <option>Data Science</option>
//                 <option>Cyber Security</option>
//                 <option>Cloud Computing</option>
//                 <option>Digital Marketing</option>
//               </select>

//             </div>

//             <textarea
//               name="message"
//               placeholder="Your Message"
//               rows="4"
//               onChange={handleChange}
//               className="p-3 border rounded-lg w-full"
//             />

//           <button
//   type="submit"
//   disabled={loading}
//   className={`w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-lg
//     ${loading
//       ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//       : "bg-[#074166] text-white hover:bg-[#fdad1b] hover:text-[#074166] active:scale-95"
//     }`}
// >
//   {loading ? (
//     <>
//       <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
//       </svg>
//       Sending...
//     </>
//   ) : "✉️ Send Message"}
// </button>

//           </form>

//         </div>
//       </section>

//       {/* MAP */}
//       <section className="px-6 pb-20">
//         <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
//           <iframe
//             src="https://maps.google.com/maps?q=693+Rehman+Baba+Rd,+I-8%2F4+I+8%2F4+I-8,+Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
//             className="w-full h-40 rounded-lg border-2 border-[#fbae1a]"
//             loading="lazy"
//           ></iframe>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", course: "", message: "" });
      } else {
        alert("Something went wrong. Please contact us on WhatsApp.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
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
            <p className="text-gray-600">693 Rehman Baba Rd, opposite to PSO Pump, I-8/4 I 8/4 I-8, Islamabad, 44000, Pakistan</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#074166] mb-3">📞 Phone</h3>
            <p className="text-gray-600">03203400111</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#074166] mb-3">📧 Email</h3>
            <p className="text-gray-600">info@sinainstitute.com.pk</p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 border-[#fdad1b]">

          <h1 className="text-4xl font-bold text-center text-[#074166]">
            Contact Us
          </h1>

          <p className="text-center text-gray-800 mt-3">
            Fill the form and our team will contact you soon.
          </p>

          {submitted ? (
            <div className="mt-10 text-center text-green-600 font-semibold text-lg">
              ✅ Message sent successfully! We will contact you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">

              <div className="grid md:grid-cols-2 gap-4 text-gray-500">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  required
                  onChange={handleChange}
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
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
                  value={form.phone}
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
                value={form.message}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-lg
                  ${loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#074166] text-white hover:bg-[#fdad1b] hover:text-[#074166] active:scale-95"
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </>
                ) : "✉️ Send Message"}
              </button>

            </form>
          )}

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
