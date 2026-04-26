// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsAppButton"
// import AnnouncementBar from "../components/AnnouncementBar";
// import { createClient } from "next-sanity"
// import { getActiveAnnouncementsQuery } from "../../sanity/lib/queries"
// import { useState, useEffect } from "react";

// const client = createClient({
//   projectId: 'u4tign1y', 
//   dataset: 'production',
//   apiVersion: '2026-03-25',
//   useCdn: true,
// })


// export default function Home() {
//   const [announcement, setAnnouncement] = useState(null)

//   useEffect(() => {
//     client.fetch(getActiveAnnouncementsQuery).then((data) => {
//       setAnnouncement(data?.[0] || null)
//     })
//   }, [])

//   return (
//     <div className="bg-white">
//             {/* ================= ANNOUNCEMENT BAR ================= */}
//          <AnnouncementBar announcement={announcement} />
//         <Navbar />

//       {/* ================= HERO SECTION ================= */}
//         <section className="text-center text-[#074166] mt-20">
//             <img
//           src="/images/aboutus.png"
//           alt="About Us Hero"
//           className="w-screen h-full object-contain opacity-90"></img>
//         {/* <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center h-full relative z-10">
//           <h1 className="text-8xl md:text-8xl font-bold mb-6 text-[#fdad1b]">
//             About SINA Academy
//           </h1>
//           <p className="text-lg md:text-xl font-light max-w-3xl mx-auto">
//             Empowering students with industry-ready skills through expert mentorship,
//             practical learning, and career-focused training programs.
//           </p>
//         </div> */}
//       </section>
         


    
//       {/* ================= TEAM SECTION ================= */}
//       <section className="relative py-28 px-6 bg-[#074166] text-white overflow-hidden mt-32">

//   <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

//     {/* LEFT SIDE - IMAGE + STRONG RIPPLE */}
//     <div className="relative flex justify-center items-center min-h-[450px]">

//       {/* Ripple Layers */}
//       <div className="absolute w-[320px] h-[320px] bg-[#fdad1b] opacity-30 blur-3xl 
//       rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"></div>

//       <div className="absolute w-[420px] h-[420px] bg-[#fdad1b] opacity-20 blur-3xl 
//       rounded-[50%_60%_70%_40%/50%_40%_60%_70%]"></div>

//       <div className="absolute w-[520px] h-[520px] bg-[#fdad1b] opacity-10 blur-3xl 
//       rounded-full"></div>

//       {/* CEO IMAGE */}
//       <img
//         src="/CEO.jpg"
//         alt="CEO"
//         className="relative z-10 w-[320px] md:w-[880px] object-contain rounded-2xl"
//       />
//     </div>

//     {/* RIGHT SIDE - TEXT */}
//     <div>
//       <h2 className="text-4xl md:text-5xl font-bold text-[#fdad1b] mb-6">
//         CEO Message
//       </h2>

//       <div className="w-20 h-1 bg-[#fdad1b] mb-6 rounded-full"></div>

//       <p className="text-gray-200 leading-relaxed mb-4">
//         At SINA Institute, our vision is not just to educate, but to transform lives
//         through knowledge, innovation, and practical skills. We believe that education
//         should empower individuals to think critically, act confidently, and lead with purpose.
//       </p>

//       <p className="text-gray-200 leading-relaxed mb-4">
//         Our mission is to bridge the gap between academic learning and real-world
//         industry demands. We are committed to providing high-quality training in
//         modern technologies, professional development, and career-oriented skills
//         that prepare our students for the challenges of tomorrow.
//       </p>

//       <p className="text-gray-200 leading-relaxed">
//         Together, we are building a community of learners, innovators, and leaders
//         who will shape the future. At SINA, every step you take is a step toward
//         excellence, growth, and success.
//       </p>
//     </div>

//   </div>
// </section>
//       {/* ================= WHO WE ARE ================= */}
//       <section className="py-20 px-6 bg-gray-50">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
//           <div>
//             <h2 className="text-6xl font-bold text-[#fdad1b] mb-6">
//               Who <span className="text-[#fdad1b]">We Are</span>
//             </h2>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               SINA Academy is a professional training institute dedicated to
//               providing high-quality education in technology, business, and
//               professional development.
//             </p>
//             <p className="text-gray-600 leading-relaxed">
//               Our goal is to bridge the gap between academic knowledge and
//               real-world industry requirements by offering hands-on learning
//               experiences.
//             </p>
//           </div>

//           <div>
//             <Image
//               src="/about.png"
//               alt="About Image"
//               width={500}
//               height={400}
//               className="rounded-2xl shadow-lg"
//             />
//           </div>

//         </div>
//       </section>

//       {/* ================= MISSION & VISION ================= */}
//       <section className="py-20 px-6 bg-[#074166] text-white">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-[#074166] text-white rounded-2xl p-10">

//           <div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#fdad1b]">
//             <h3 className="text-2xl font-bold text-[#fdad1b] mb-4">
//               Our Mission
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               To provide practical, industry-oriented training that empowers
//               students to build successful careers in competitive markets.
//             </p>
//           </div>

//           <div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#fdad1b]">
//             <h3 className="text-2xl font-bold text-[#fdad1b] mb-4">
//               Our Vision
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               To become a leading training institute recognized for excellence,
//               innovation, and student success across the region.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section className="py-20 px-6 bg-gray-50">
//         <div className="max-w-6xl mx-auto text-center mb-12">
//           <h2 className="text-6xl font-bold text-[#fdad1b] mb-6">
//             Why Choose Us
//           </h2>
//         </div>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          
//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold text-[#074166] mb-3">
//               Expert Mentors
//             </h4>
//             <p className="text-gray-600">
//               Learn from industry professionals with real-world experience.
//             </p>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold text-[#074166] mb-3">
//               Practical Training
//             </h4>
//             <p className="text-gray-600">
//               Hands-on projects and real case studies for deeper understanding.
//             </p>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold text-[#074166] mb-3">
//               Career Support
//             </h4>
//             <p className="text-gray-600">
//               Internship opportunities, career guidance, and placement support.
//             </p>
//           </div>

//         </div>
//       </section>


//       {/* ================= CTA SECTION ================= */}
//       <section className="bg-white py-16 px-6 text-center">
//         <h2 className="text-3xl font-bold text-[#074166] mb-6">
//           Ready to Start Your Journey?
//         </h2>
//         <Link href="/contact">
//           <button className="bg-[#fdad1b] text-white px-8 py-3 rounded-lg hover:opacity-90 transition">
//             Contact Us Today
//           </button>
//         </Link>
//       </section>
//       <Footer />
//       <WhatsAppButton />

//     </div>
//   );
// }



"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton"
import { getActiveAnnouncementsQuery } from "../../sanity/lib/queries"
import { client } from "../../sanity/lib/client"
import { useState, useEffect } from "react";

export default function AboutUs() {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    client.fetch(getActiveAnnouncementsQuery).then((data) => {
      setAnnouncements(data || [])
    })
  }, [])

  return (
    <div className="bg-white">

      <Navbar announcements={announcements} />

      {/* ================= HERO SECTION ================= */}
      <section className="text-center text-[#074166] mt-20">
        <img
          src="/images/aboutus.png"
          alt="About Us Hero"
          className="w-screen h-full object-contain opacity-90"
        />
      </section>

      {/* ================= CEO MESSAGE ================= */}
      <section className="relative py-28 px-6 bg-[#074166] text-white overflow-hidden mt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - PLACEHOLDER (no image) */}
          <div className="relative flex justify-center items-center min-h-[350px]">
            <div className="absolute w-[320px] h-[320px] bg-[#fdad1b] opacity-30 blur-3xl rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"></div>
            <div className="absolute w-[420px] h-[420px] bg-[#fdad1b] opacity-20 blur-3xl rounded-[50%_60%_70%_40%/50%_40%_60%_70%]"></div>
            <div className="absolute w-[520px] h-[520px] bg-[#fdad1b] opacity-10 blur-3xl rounded-full"></div>

            {/* Name Card (no image) */}
            <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-[#fdad1b]/40 rounded-2xl px-12 py-10 text-center">
              <div className="w-24 h-24 rounded-full bg-[#fdad1b]/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-[#fdad1b]">SI</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Shahid Iqbal</h3>
              <p className="text-[#fdad1b] mt-1 font-medium">CEO & Founder</p>
              <p className="text-gray-300 mt-1 text-sm">SINA Institute</p>
            </div>
          </div>

          {/* RIGHT SIDE - CEO MESSAGE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#fdad1b] mb-6">
              CEO Message
            </h2>
            <div className="w-20 h-1 bg-[#fdad1b] mb-6 rounded-full"></div>

            <p className="text-gray-200 leading-relaxed mb-4">
              At SINA Institute, our vision is not just to educate, but to transform lives
              through knowledge, innovation, and practical skills. We believe that education
              should empower individuals to think critically, act confidently, and lead with purpose.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              Our mission is to bridge the gap between academic learning and real-world
              industry demands. We are committed to providing high-quality training in
              modern technologies, professional development, and career-oriented skills
              that prepare our students for the challenges of tomorrow.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Together, we are building a community of learners, innovators, and leaders
              who will shape the future. At SINA, every step you take is a step toward
              excellence, growth, and success.
            </p>

            <div className="border-t border-[#fdad1b]/40 pt-4">
              <p className="text-[#fdad1b] font-bold text-lg">Shahid Iqbal</p>
              <p className="text-gray-300 text-sm">CEO & Founder, SINA Institute</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-6xl font-bold text-[#074166] mb-6">
              Who <span className="text-[#fdad1b]">We Are</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SINA Institute is a professional training institute dedicated to
              providing high-quality education in technology, business, and
              professional development.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to bridge the gap between academic knowledge and
              real-world industry requirements by offering hands-on learning
              experiences with expert mentors and industry-relevant curriculum.
            </p>
          </div>

          <div>
            <Image
              src="/about.PNG"
              alt="About SINA"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 px-6 bg-[#074166] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 rounded-2xl p-10">

          <div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#fdad1b]">
            <h3 className="text-2xl font-bold text-[#fdad1b] mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide practical, industry-oriented training that empowers
              students to build successful careers in competitive markets.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#fdad1b]">
            <h3 className="text-2xl font-bold text-[#fdad1b] mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become a leading training institute recognized for excellence,
              innovation, and student success across the region.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-6xl font-bold text-[#074166] mb-6">
            Why Choose <span className="text-[#fdad1b]">Us</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border-b-4 border-[#fdad1b]">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h4 className="text-xl font-semibold text-[#074166] mb-3">Expert Mentors</h4>
            <p className="text-gray-600">
              Learn from industry professionals with real-world experience and proven track records.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border-b-4 border-[#fdad1b]">
            <div className="text-4xl mb-4">💻</div>
            <h4 className="text-xl font-semibold text-[#074166] mb-3">Practical Training</h4>
            <p className="text-gray-600">
              Hands-on projects and real case studies for deeper understanding and job-ready skills.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border-b-4 border-[#fdad1b]">
            <div className="text-4xl mb-4">💼</div>
            <h4 className="text-xl font-semibold text-[#074166] mb-3">Career Support</h4>
            <p className="text-gray-600">
              Internship opportunities, career guidance, and placement support to launch your career.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-[#074166] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-300 mb-8">
          Join thousands of students who have transformed their careers with SINA Institute.
        </p>
        <Link href="/enrollnow">
          <button className="bg-[#fdad1b] text-[#074166] font-bold px-10 py-4 rounded-full hover:scale-105 transition">
            Enroll Now →
          </button>
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  );
}
