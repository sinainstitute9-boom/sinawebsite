// "use client"
// import { useState, useEffect } from "react";
// import Link from "next/link"
// import { motion } from "framer-motion"
// import HeroSlider from "./components/HeroSlider"
// import Footer from "./components/Footer"
// import SinaIntroSection from "./components/SinaIntroSection"
// import Navbar from "./components/NavBar"
// import WhatsAppButton from "./components/WhatsAppButton"
// import { getActiveAnnouncementsQuery } from '../sanity/lib/queries';
// import { client } from "../sanity/lib/client";


// // Sanity client
// // const client = createClient({
// //   projectId: 'u4tign1y', 
// //   dataset: 'production',
// //   apiVersion: '2026-03-25',
// //   useCdn: true,
// // })

// export default function Home() {
//   const [announcements, setAnnouncements] = useState([])
//   useEffect(() => {
//   client.fetch(getActiveAnnouncementsQuery).then((data) => {
//     console.log("ANNOUNCEMENTS:", data)
//     setAnnouncements(data || [])
//   })
// }, [])

//   useEffect(() => {
//     client.fetch(getActiveAnnouncementsQuery).then((data) => {
//       setAnnouncements(data || [])
//     })
//   }, [])

//   return (
//     <div className="bg-white text-gray-800 mt-25">
//       {/* ================= ANNOUNCEMENT BAR ================= */}
//       <Navbar announcements={announcements} />
//       {/* ================= NAVBAR ================= */}
//       <Navbar/>
//       {/* ================= HERO SLIDER ================= */}
//       <HeroSlider />
//       {/* ================= INTRO SECTION ================= */}
//       <SinaIntroSection />
//       {/* ================= ABOUT SECTION ================= */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//           <div className="h-150  rounded-xl flex items-center justify-center">
//             <img src="/about.PNG" alt="About SINA" className="h-full w-auto rounded-lg"/>
//           </div>

//           <div>
//             <h2 className="text-4xl font-bold text-[#074166]">
//               About SINA
//             </h2>

//             <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//               SINA is a modern IT training institute committed to preparing students
//               for global careers in technology. We focus on innovation,
//               artificial intelligence, and skill-based education.
//             </p>

//       <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//         SINA is a <span className="font-semibold text-[#fdad1b]">modern IT training institute</span> 
//         dedicated to empowering students for global careers in technology. We offer comprehensive programs 
//         covering <span className="font-semibold">web development, artificial intelligence, data analytics, and emerging technologies</span>. 
//       </p>

//       <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//         Our mission is to foster <span className="font-semibold">innovation, creativity, and skill-based learning</span>, 
//         ensuring students gain practical experience through hands-on projects, mentorship from industry experts, 
//         and guidance for career advancement. At SINA, we transform passionate learners into tech professionals ready 
//         to tackle real-world challenges.
//       </p>

         

// <Link
//   href="/aboutus"
//   className="mt-6 inline-flex items-center gap-2 bg-[#fdad1b] px-6 py-3 rounded-full font-semibold text-[#074166] hover:bg-[#fcb21f] hover:shadow-md transition-all duration-300"
// >
//   Learn More
//   <span className="font-bold">About Us →</span>
// </Link>
//           </div>

//         </div>
//       </section>


//  {/* ================= COURSES SECTION ================= */}
// <section className="py-20 px-6 bg-gray-100">
//   <h2 className="text-6xl font-bold text-center text-[#074166]">
//     Our <span className="text-[#fdad1b]">Courses</span>
//   </h2>

//   <div className="max-w-7xl mx-auto border-2 border-[#fdad1b] rounded-2xl p-8 mt-12 space-y-16">

//     {/* ================= CATEGORY BLOCK ================= */}
//     {[
//       {
//         title: "IT & Software",
//         courses: [
//           {name:"Web Development", img:"/courses/1.png", link:"/courses"},
//           {name:"Artificial Intelligence", img:"/courses/5.png", link:"/courses"},
//           {name:"E-Commerce", img:"/courses/3.png", link:"/courses"},
//           {name:"Cloud Computing (AWS)", img:"/courses/10.png", link:"/courses/cloud-computing-aws"},
//           {name:"Database Management", img:"/courses/16.png", link:"/courses/database-management"},
//           {name:"Microsoft Azure", img:"/courses/17.png", link:"/courses/microsoft-azure"},
//           {name:"Graphic Design", img:"/courses/6.png", link:"/courses/graphic-design"},
//           {name:"Digital Marketing", img:"/courses/4.png", link:"/courses/digital-marketing"},
//         ]
//       },

//       {
//         title: "Networking & Cyber Security",
//         courses: [
//           {name:"Cyber Security (CEH)", img:"/courses/2.png", link:"/courses/cyber-security-CEH"},
//           {name:"CompTIA A+ (Course 1 & 2)", img:"/courses/7.png", link:"/courses/comptia-a-plus"},
//           {name:"Juniper (JNCIA-JNCIS)", img:"/courses/9.png", link:"/courses/juniper-jncia-jncis"},
//           {name:"Fortinet (FCF-FCA-FCP)", img:"/courses/12.png", link:"/courses/fortinet-fcf-fca-fcp"},
//           {name:"MikroTik (MTCNA-MTCRE)", img:"/courses/11.png", link:"/courses/mikrotik-mtcna-mtcre"},
//           {name:"Wireshark (WCNA)", img:"/courses/14.png", link:"/courses/wireshark-wcna"},
//           {name:"CISCO (CCNA/CCNP/CCIE)", img:"/courses/15.png", link:"/courses/cisco-ccna-ccnp-ccie"},
//           {name:"ITIL Foundation", img:"/courses/13.png", link:"/courses/itil-foundation"},
//           {name:"Fiber Optics", img:"/courses/18.png", link:"/courses/fiber-optics"},
//           {name:"Wireless Communication", img:"/courses/19.png", link:"/courses/wireless-communication"},
//         ]
//       },

//       {
//         title: "Engineering & Technical",
//         courses: [
//           {name:"PLC & Scada/HMI", img:"/courses/20.png", link:"/courses/plc-scada-hmi"},
//           {name:"Industrial Electrician", img:"/courses/21.png", link:"/courses/industrial-electrician"},
//           {name:"Home Appliances Electrician", img:"/courses/22.png", link:"/courses/home-appliances-electrician"},
//           {name:"Microcontrollers / Arduino", img:"/courses/23.png", link:"/courses/microcontrollers-arduino"},
//           {name:"Robotics", img:"/courses/24.png", link:"/courses/robotics"},
//           {name:"Basic Electricals / Electronics", img:"/courses/25.png", link:"/courses/basic-electricals-electronics"},
//         ]
//       },

//       {
//         title: "Business & Finance",
//         courses: [
//           {name:"SAP S/4Hana (ERP)", img:"/courses/26.png", link:"/courses/sap-s-4hana-erp"},
//           {name:"QuickBooks / Tally", img:"/courses/27.png", link:"/courses/quickbooks-tally"},
//           {name:"Forex Trading", img:"/courses/28.png", link:"/courses/forex-trading"},
//           {name:"Advance MS Excel, Power BI", img:"/courses/29.png", link:"/courses/advance-ms-excel-power-bi"},
//           {name:"PMP - Project Management Professional", img:"/courses/36.png", link:"/courses/pmp-project-management-professional"},
//         ]
//       },

//       {
//         title: "Language & Professional Skills",
//         courses: [
//           {name:"Spoken English", img:"/courses/30.png", link:"/courses/spoken-english"},
//           {name:"IELTS / PTE / TOEFL", img:"/courses/31.png", link:"/courses/ieltspte-toefl"},
//           {name:"Quantity Surveyor", img:"/courses/32.png", link:"/courses/quantity-surveyor"},
//           {name:"AutoCAD (Electrical / Civil)", img:"/courses/33.png", link:"/courses/autocad-electrical-civil"},
//           {name:"Revit / SketchUp", img:"/courses/34.png", link:"/courses/revit-sketchup"},
//           {name:"First Aid / Fire Safety", img:"/courses/35.png", link:"/courses/first-aid-fire-safety"},
//         ]
//       }
//     ].map((category, i) => (

//       <div key={i}>
//         {/* CATEGORY HEADING */}
//         <h3 className="text-3xl font-bold text-[#074166] mb-8 border-l-4 border-[#fdad1b] pl-4">
//           {category.title}
//         </h3>

//         {/* COURSES GRID */}
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//           {category.courses.map((course, index) => (

//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300"
//             >

//               <img
//                 src={course.img}
//                 alt={course.name}
//                 className="h-40 w-full object-contain rounded-lg mb-4"
//               />

//               <h3 className="text-lg font-semibold text-[#074166]">
//                 {course.name}
//               </h3>

//               <p className="mt-3 text-sm text-gray-600">
//                 Practical training with real-world industry projects.
//               </p>

//               <button className="bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition">
//                 Learn More
//                 <Link href={course.link} className="ml-2 font-bold">→</Link>
//               </button>

//             </motion.div>

//           ))}

//         </div>
//       </div>

//     ))}

//   </div>
// </section>
//       {/* ================= CONTACT SECTION ================= */}
// <section className="py-24 px-6 bg-white text-gray-800">
//   <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//     {/* LEFT SIDE INFO */}
//     <div className="space-y-6">
//       <h2 className="text-5xl font-bold text-gray-800">
//         Contact Us
//       </h2>

//       <p className="text-lg text-gray-600 leading-relaxed">
//         Not sure what you need? Our team at SINA is happy to listen and help you plan 
//         your career path in IT, AI, Web Development, and more. Get in touch with us!
//       </p>

//       <div className="space-y-3 mt-6 text-gray-800">
//         <p className="flex items-center gap-3">
//           <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 4.5h21v15h-21v-15zm1.5 2v11h18v-11h-18zm1.5 2h15v1.5h-15v-1.5zm0 3h15v1.5h-15v-1.5z"/></svg>
//           info@sinainstitute.com.pk
//         </p>
//         <p className="flex items-center gap-3">
//           <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.85.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.75 21.5 2.5 13.25 2.5 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.65.74 3.85a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
//           03203400111
//         </p>
//       </div>
//     </div>

//     {/* RIGHT SIDE FORM */}
//     <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#fdad1b]">
//       <form className="space-y-4">
//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//           />
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Company"
//             className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//           />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="Address"
//           className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//         />
//         <textarea
//           placeholder="Your Message"
//           rows="4"
//           className="p-3 border border-gray-300 rounded-lg w-full text-gray-800"
//         />
//         <button
//           type="submit"
//           className="w-full bg-[#fdad1b] text-black font-semibold py-3 rounded-full hover:scale-105 transition"
//         >
//           Send Message
//         </button>
//       </form>
//     </div>

//   </div>
// </section>

//       {/* ================= FOOTER ================= */}
// <Footer />
// <WhatsAppButton />
//   {/* COPYRIGHT
//   <div className="mt-12 border-t border-gray-800 bg-black pt-6 text-center text-white text-sm">
//     © {new Date().getFullYear()} SINA. All Rights Reserved.
//   </div> */}


//     </div>
//   )
// }


// "use client"
// import { useState, useEffect } from "react";
// import Link from "next/link"
// import { motion } from "framer-motion"
// import HeroSlider from "./components/HeroSlider"
// import Footer from "./components/Footer"
// import SinaIntroSection from "./components/SinaIntroSection"
// import Navbar from "./components/NavBar"
// import WhatsAppButton from "./components/WhatsAppButton"
// import { getActiveAnnouncementsQuery, getHomePageQuery, getCourseCategoriesQuery, getCoursesByCategoryQuery } from '../sanity/lib/queries';
// import { client } from "../sanity/lib/client";
// import ContactForm from "./components/ContactForm"

// export default function Home() {
//   const [announcements, setAnnouncements] = useState([])
//   const [homeData, setHomeData] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [coursesByCategory, setCoursesByCategory] = useState([])

//   useEffect(() => {
//     client.fetch(getActiveAnnouncementsQuery).then((data) => {
//       setAnnouncements(data || [])
//     })

//     client.fetch(getHomePageQuery).then((data) => {
//       setHomeData(data || null)
//     })

//     client.fetch(getCourseCategoriesQuery).then((data) => {
//       setCategories(data || [])
//     })

//     client.fetch(getCoursesByCategoryQuery).then((data) => {
//       setCoursesByCategory(data || [])
//     })

//   }, [])

//   return (
//     <div className="bg-white text-gray-800 mt-25">
//       <Navbar announcements={announcements} />

//       <HeroSlider />
//       <SinaIntroSection />
//       <ContactForm />
//       {/* ===== ABOUT SECTION ===== */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           <div className="h-150 rounded-xl flex items-center justify-center">
//             <img
//               src={homeData?.aboutImageUrl || "/about.PNG"}
//               alt="About SINA"
//               className="h-full w-auto rounded-lg"
//             />
//           </div>
//           <div>
//             <h2 className="text-4xl font-bold text-[#074166]">
//               {homeData?.aboutTitle || "About SINA"}
//             </h2>
//             <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//               {homeData?.aboutDescription1 || "SINA is a modern IT training institute committed to preparing students for global careers in technology."}
//             </p>
//             <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//               {homeData?.aboutDescription2 || ""}
//             </p>
//             <p className="mt-8 text-lg text-gray-700 leading-relaxed">
//               {homeData?.aboutDescription3 || ""}
//             </p>
//             <Link
//               href="/aboutus"
//               className="mt-6 inline-flex items-center gap-2 bg-[#fdad1b] px-6 py-3 rounded-full font-semibold text-[#074166] hover:bg-[#fcb21f] hover:shadow-md transition-all duration-300"
//             >
//               Learn More <span className="font-bold">About Us →</span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ===== COURSES SECTION ===== */}
//       <section className="py-20 px-6 bg-gray-100">
//         <h2 className="text-6xl font-bold text-center text-[#074166]">
//           Our <span className="text-[#fdad1b]">Courses</span>
//         </h2>

//         <div className="max-w-7xl mx-auto border-2 border-[#fdad1b] rounded-2xl p-8 mt-12 space-y-16">

//           {[
//             {
//               title: "IT & Software",
//               match: ["IT & Software", "AI & Data Science / IT", "Cloud / IT", "IT & Hardware / Support", "IT Management / IT"]
//             },
//             {
//               title: "Networking & Cyber Security",
//               match: ["Networking / IT", "Networking & Security / Cybersecurity", "Networking & Cyber Security", "Technical / Security Systems", "Technical / Networking"]
//             },
//             {
//               title: "Engineering & Technical",
//               match: ["Technical / Electrical", "Electronics / Embedded Systems", "Electronics / Technical", "Industrial / Automation"]
//             },
//             {
//               title: "Business & Finance",
//               match: ["Business & Finance", "ERP & Business", "Finance / Business"]
//             },
//             {
//               title: "Language & Professional Skills",
//               match: ["Language / English", "Language", "Professional Trainings", "Marketing", "Business / Digital", "Design"]
//             },
//           ].map((cat, i) => {
//             const filteredCourses = coursesByCategory.filter(c => cat.match.includes(c.category))
//             return (
//               <div key={i}>
//                 <h3 className="text-3xl font-bold text-[#074166] mb-8 border-l-4 border-[#fdad1b] pl-4">
//                   {cat.title}
//                 </h3>
//                 <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                   {filteredCourses.map((course, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ scale: 1.05 }}
//                       className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300"
//                     >
//                       <img
//                         src={course.imageUrl || "/courses/default.png"}
//                         alt={course.title}
//                         className="h-40 w-full object-contain rounded-lg mb-4"
//                       />
//                       <h3 className="text-lg font-semibold text-[#074166]">
//                         {course.title}
//                       </h3>
//                       <p className="mt-3 text-sm text-gray-600">
//                         Practical training with real-world industry projects.
//                       </p>
//                       <Link
//                         href={`/courses/${course.slug?.current}`}
//                         className="mt-4 inline-block bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition font-bold"
//                       >
//                         Learn More →
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             )
//           })}

//         </div>
//       </section>

//       {/* ===== CONTACT SECTION ===== */}
//       <section className="py-24 px-6 bg-white text-gray-800">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//           <div className="space-y-6">
//             <h2 className="text-5xl font-bold text-gray-800">Contact Us</h2>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               {homeData?.contactDescription || "Not sure what you need? Our team at SINA is happy to listen and help you plan your career path in IT, AI, Web Development, and more."}
//             </p>
//             <div className="space-y-3 mt-6 text-gray-800">
//               <p className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M1.5 4.5h21v15h-21v-15zm1.5 2v11h18v-11h-18zm1.5 2h15v1.5h-15v-1.5zm0 3h15v1.5h-15v-1.5z"/>
//                 </svg>
//                 {homeData?.contactEmail || "info@sinainstitute.com.pk"}
//               </p>
//               <p className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.85.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.75 21.5 2.5 13.25 2.5 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.65.74 3.85a1 1 0 01-.21 1.11l-2.2 2.2z"/>
//                 </svg>
//                 {homeData?.contactPhone || "03203400111"}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#fdad1b]">
        
//           </div>

//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />
//     </div>
//   )
// }




"use client"
import { useState, useEffect } from "react";
import Link from "next/link"
import { motion } from "framer-motion"
import HeroSlider from "./components/HeroSlider"
import Footer from "./components/Footer"
import SinaIntroSection from "./components/SinaIntroSection"
import Navbar from "./components/NavBar"
import WhatsAppButton from "./components/WhatsAppButton"
import ContactForm from "./components/ContactForm"
import { getActiveAnnouncementsQuery, getHomePageQuery, getCourseCategoriesQuery, getCoursesByCategoryQuery } from '../sanity/lib/queries';
import { client } from "../sanity/lib/client";

export default function Home() {
  const [announcements, setAnnouncements] = useState([])
  const [homeData, setHomeData] = useState(null)
  const [categories, setCategories] = useState([])
  const [coursesByCategory, setCoursesByCategory] = useState([])

  useEffect(() => {
    client.fetch(getActiveAnnouncementsQuery).then((data) => setAnnouncements(data || []))
    client.fetch(getHomePageQuery).then((data) => setHomeData(data || null))
    client.fetch(getCourseCategoriesQuery).then((data) => setCategories(data || []))
    client.fetch(getCoursesByCategoryQuery).then((data) => setCoursesByCategory(data || []))
  }, [])

  return (
    <div className="bg-white text-gray-800 mt-25">
      <Navbar announcements={announcements} />

      <HeroSlider />
      <SinaIntroSection />

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-150 rounded-xl flex items-center justify-center">
            <img
              src={homeData?.aboutImageUrl || "/about.PNG"}
              alt="About SINA"
              className="h-full w-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#074166]">
              {homeData?.aboutTitle || "About SINA"}
            </h2>
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              {homeData?.aboutDescription1 || "SINA is a modern IT training institute committed to preparing students for global careers in technology."}
            </p>
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              {homeData?.aboutDescription2 || ""}
            </p>
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              {homeData?.aboutDescription3 || ""}
            </p>
            <Link
              href="/aboutus"
              className="mt-6 inline-flex items-center gap-2 bg-[#fdad1b] px-6 py-3 rounded-full font-semibold text-[#074166] hover:bg-[#fcb21f] hover:shadow-md transition-all duration-300"
            >
              Learn More <span className="font-bold">About Us →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-6xl font-bold text-center text-[#074166]">
          Our <span className="text-[#fdad1b]">Courses</span>
        </h2>

        <div className="max-w-7xl mx-auto border-2 border-[#fdad1b] rounded-2xl p-8 mt-12 space-y-16">
          {[
            {
              title: "IT & Software",
              match: ["IT & Software", "AI & Data Science / IT", "Cloud / IT", "IT & Hardware / Support", "IT Management / IT"]
            },
            {
              title: "Networking & Cyber Security",
              match: ["Networking / IT", "Networking & Security / Cybersecurity", "Networking & Cyber Security", "Technical / Security Systems", "Technical / Networking"]
            },
            {
              title: "Engineering & Technical",
              match: ["Technical / Electrical", "Electronics / Embedded Systems", "Electronics / Technical", "Industrial / Automation"]
            },
            {
              title: "Business & Finance",
              match: ["Business & Finance", "ERP & Business", "Finance / Business"]
            },
            {
              title: "Language & Professional Skills",
              match: ["Language / English", "Language", "Professional Trainings", "Marketing", "Business / Digital", "Design"]
            },
          ].map((cat, i) => {
            const filteredCourses = coursesByCategory.filter(c => cat.match.includes(c.category))
            return (
              <div key={i}>
                <h3 className="text-3xl font-bold text-[#074166] mb-8 border-l-4 border-[#fdad1b] pl-4">
                  {cat.title}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300"
                    >
                      <img
                        src={course.imageUrl || "/courses/default.png"}
                        alt={course.title}
                        className="h-40 w-full object-contain rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-[#074166]">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-600">
                        Practical training with real-world industry projects.
                      </p>
                      <Link
                        href={`/courses/${course.slug?.current}`}
                        className="mt-4 inline-block bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition font-bold"
                      >
                        Learn More →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-24 px-6 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {homeData?.contactDescription || "Not sure what you need? Our team at SINA is happy to listen and help you plan your career path in IT, AI, Web Development, and more."}
            </p>
            <div className="space-y-3 mt-6 text-gray-800">
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 4.5h21v15h-21v-15zm1.5 2v11h18v-11h-18zm1.5 2h15v1.5h-15v-1.5zm0 3h15v1.5h-15v-1.5z"/>
                </svg>
                {homeData?.contactEmail || "info@sinainstitute.com.pk"}
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#fdad1b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.85.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.75 21.5 2.5 13.25 2.5 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.65.74 3.85a1 1 0 01-.21 1.11l-2.2 2.2z"/>
                </svg>
                {homeData?.contactPhone || "03203400111"}
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#fdad1b]">
            <ContactForm />
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
