// "use client";

// import Image from "next/image";
// import { PortableText } from "@portabletext/react";
// import { urlFor } from "../../../sanity/lib/image";
// import React, { useState } from "react";

// // helper to safely build image URLs; returns null if source is falsy
// function buildImageUrl(source: any, width?: number, height?: number) {
//   if (!source) return null;
//   let img = urlFor(source);
//   if (width) img = img.width(width);
//   if (height) img = img.height(height);
//   return img.url();
// }

// /* ================= FAQ ================= */
// const FAQListSection = () => {
//   const faqs = [
//     {
//       q: "Who should take this course?",
//       a: "This course is ideal for students, professionals, and entrepreneurs.",
//     },
//     {
//       q: "Will I get a certificate?",
//       a: "Yes, after successful completion you will receive certification.",
//     },
//   ];

//   const [open, setOpen] = useState<number | null>(0);

//   return (
//     <section className="py-20">
//       <h2 className="text-4xl font-bold text-center mb-10">
//         Frequently Asked Questions
//       </h2>

//       <div className="max-w-4xl mx-auto">
//         {faqs.map((f, i) => (
//           <div key={i} className="border rounded-xl mb-4">
//             <button
//               onClick={() => setOpen(open === i ? null : i)}
//               className="w-full p-6 flex justify-between font-semibold"
//             >
//               {f.q}
//               <span>{open === i ? "-" : "+"}</span>
//             </button>
//             {open === i && (
//               <div className="p-6 pt-0 text-gray-600">{f.a}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// /* ================= MAIN UI ================= */
// export default function CourseDetailUI({ course }: any) {
//   return (
//     <>
//       {/* ================= HERO ================= */}
//      <section className="py-20 bg-gradient-to-r from-[#f7f7f7] to-[#eaf1f9]">
//   <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

//     {/* ================= LEFT ================= */}
//     <div>
//       <h1 className="text-5xl font-extrabold text-[#2f2f8f] leading-tight">
//         {course.title}
//       </h1>

//       <p className="mt-6 text-lg text-gray-700 max-w-xl">
//         {course.shortDescription}
//       </p>
//        <div className="prose max-w-none">
//             <PortableText value={course.description} />
//           </div>

//       <div className="flex gap-4 mt-8">
//         <button className="bg-[#3c3f9e] text-white px-8 py-3 rounded-lg font-semibold">
//           Enroll Now
//         </button>
//         <button className="border-2 border-[#3c3f9e] text-[#3c3f9e] px-8 py-3 rounded-lg font-semibold">
//           Explore
//         </button>
//       </div>
//     </div>

//     {/* ================= RIGHT IMAGES (FIXED ALIGNMENT) ================= */}
//     <div className="grid grid-cols-[1fr_1fr] gap-6">

//       {/* LEFT TALL IMAGE */}
//       <div className="rounded-[32px] overflow-hidden h-[420px]">
//         {course.thumbnail ? (
//           <Image
//             src={buildImageUrl(course.thumbnail, 600, 800)!}
//             alt={course.title}
//             width={600}
//             height={800}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-500">No image available</span>
//           </div>
//         )}
//       </div>

//       {/* RIGHT STACKED IMAGES */}
//       <div className="flex flex-col gap-6">

//         {/* TOP RIGHT */}
//         {course.gallery?.[0] && (
//           <div className="rounded-[32px] overflow-hidden h-[130px]">
//             {course.gallery[0] ? (
//               <Image
//                 src={buildImageUrl(course.gallery[0], 500, 300)!}
//                 alt=""
//                 width={500}
//                 height={300}
//                 className="w-full h-full object-cover"
//               />
//             ) : null}
//           </div>
//         )}

//         {/* MIDDLE RIGHT */}
//         {course.gallery?.[1] && (
//           <div className="rounded-[32px] overflow-hidden h-[130px]">
//             {course.gallery[1] ? (
//               <Image
//                 src={buildImageUrl(course.gallery[1], 500, 300)!}
//                 alt=""
//                 width={500}
//                 height={300}
//                 className="w-full h-full object-cover"
//               />
//             ) : null}
//           </div>
//         )}

//         {/* BOTTOM RIGHT */}
//         {course.gallery?.[2] && (
//           <div className="rounded-[32px] overflow-hidden h-[130px]">
//             {course.gallery[2] ? (
//               <Image
//                 src={buildImageUrl(course.gallery[2], 500, 300)!}
//                 alt=""
//                 width={500}
//                 height={300}
//                 className="w-full h-full object-cover"
//               />
//             ) : null}
//           </div>
//         )}
//       </div>
//     </div>

//   </div>
// </section>



//       {/* ================= ABOUT ================= */}
//       {/* <section className="py-20 bg-white">
//         <div className="max-w-5xl mx-auto px-6">
//           <h2 className="text-4xl font-bold mb-6">About this Course</h2>
//           <div className="prose max-w-none">
//             <PortableText value={course.description} />
//           </div>
//         </div>
//       </section> */}

//       {course.benefits?.length > 0 && (
//   <section className="py-20 bg-white">
//     <div className="max-w-6xl mx-auto px-6">
//       <h2 className="text-4xl font-bold mb-10">
//         Course Benefits
//       </h2>

//       <div className="grid md:grid-cols-2 gap-8">
//         {course.benefits.map((b: string, i: number) => (
//           <div key={i}>
//             <span className="text-3xl font-bold text-[#3c3f9e]">
//               {i + 1}.
//             </span>
//             <p className="mt-2 text-gray-600">{b}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// )}

//  <h1 className="flex justify-center text-4xl -mb-12 text-white">Course Outline</h1>
// {course.outline?.length > 0 && ( 
//   <section className="py-20 bg-[#262A7B] text-white"> 
//     <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
//       {course.outline.map((o: any, i: number) => (
//         <div key={i} className="border border-white/40 p-6">
//           <h3 className="font-bold text-lg mb-2">
//             {o.title}
//           </h3>
//           <p className="text-white/80 text-sm">
//             {o.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   </section>
// )}



// {course.instructor && (
//   <section className="py-20 bg-[#f6f6f6]">
//     <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-10 shadow-lg">
//       {course.instructor.image ? (
//         <Image
//           src={buildImageUrl(course.instructor.image, 400) as string}
//           alt={course.instructor.name}
//           width={400}
//           height={500}
//           className="rounded-2xl"
//         />
//       ) : (
//         <div className="w-[400px] h-[500px] bg-gray-200 rounded-2xl" />
//       )}

//       <div>
//         <h2 className="text-3xl font-bold mb-2">
//           {course.instructor.name}
//         </h2>
//         <p className="text-gray-600 mb-4">
//           {course.instructor.designation}
//         </p>

//         <button className="bg-[#3c3f9e] text-white px-6 py-3 rounded-xl">
//           Explore more
//         </button>
//       </div>
//     </div>
//   </section>
// )}


// {course.certificate && (
//   <section className="py-20 bg-white">
//     <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
//       {course.certificate.image ? (
//         <Image
//           src={buildImageUrl(course.certificate.image, 700) as string}
//           alt="Certificate"
//           width={700}
//           height={400}
//           className="rounded-2xl"
//         />
//       ) : (
//         <div className="w-[700px] h-[400px] bg-gray-200 rounded-2xl" />
//       )}

//       <div>
//         <h2 className="text-4xl font-bold mb-6">
//           {course.certificate.title}
//         </h2>
//         <p className="text-gray-600 mb-8">
//           {course.certificate.text}
//         </p>

//         <button className="bg-[#3c3f9e] text-white px-10 py-4 rounded-xl">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   </section>
// )}
    
//       {/* ================= FAQ ================= */}
//       <FAQListSection />
//     </>
//   );
// }




"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

import Link from "next/link";

function buildImageUrl(source, width, height) {
  if (!source) return null;
  let img = urlFor(source);
  if (width) img = img.width(width);
  if (height) img = img.height(height);
  return img.url();
}

export default function CoursePage({ course }) {
  return (
    <div className="pt-24 bg-gray-100 min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="bg-[#074166] py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {course.title}
          </h1>
        </div>
      </section>


      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">

          {/* COURSE IMAGE */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            {course.thumbnail && (
              <Image
                src={buildImageUrl(course.thumbnail, 800)}
                alt={course.title}
                width={800}
                height={800}
                className="rounded-lg"
              />
            )}
          </div> */}


          {/* DESCRIPTION */}
          <div className="bg-white text-gray-800 mt-8 p-8 rounded-lg shadow">

            <h2 className="text-2xl font-semibold text-[#074166] mb-4">
              Course Description
            </h2>

            <div className="prose max-w-none">
              <PortableText value={course.description} />
            </div>

          </div>


          {/* CURRICULUM */}
          {course.outline?.length > 0 && (

            <div className="bg-white mt-8 p-8 rounded-lg shadow">

              <h2 className="text-2xl font-semibold text-[#074166] mb-6">
                Course Curriculum
              </h2>

              <div className="space-y-8">

                {course.outline.map((item, i) => (

                  <div key={i}>

                    <h3 className="font-semibold text-lg mb-2 text-[#fdad1b]">
                      {item.title}
                    </h3>

                    <p className="text-gray-600">
                      {item.description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          )}


         {/* BOTTOM - Who this course is for */}
{course.whoIsFor?.length > 0 && (
  <div className="bg-white mt-8 p-8 rounded-lg shadow">
    <h2 className="text-2xl font-semibold text-[#074166] mb-4">
      Who this course is for
    </h2>
    <ul className="list-disc ml-6 text-gray-600 space-y-2">
      {course.whoIsFor.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
)}

        </div>


        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* INFO CARD */}
          <div className="bg-white shadow p-6 rounded-lg border-t-4 border-[#fdad1b]">

            <ul className="space-y-4 text-gray-700">

              <li className="flex justify-between">
                <span>Duration</span>
                <span>{course.duration || "2 Months"}</span>
              </li>

              <li className="flex justify-between">
                <span>Lectures</span>
                <span>{course.lectures || "40+ Hours"}</span>
              </li>

              <li className="flex justify-between">
                <span>Level</span>
                <span>{course.level || "Beginner"}</span>
              </li>

              <li className="flex justify-between">
                <span>Language</span>
                <span>{course.language || "English / Urdu"}</span>
              </li>

              <li className="flex justify-between">
                <span>Certificate</span>
                <span>{course.hasCertificate ? "Yes" : "No"}</span>
              </li>

            </ul>

            <button className="mt-6 w-full bg-[#fdad1b] text-[#074166] py-3 rounded font-semibold hover:opacity-90 transition">
              Enroll Now
              <Link href="/enrollnow" className="ml-2 font-bold">→</Link>
            </button>

          </div>


          {/* WHAT YOU WILL LEARN */}
          {course.benefits?.length > 0 && (

            <div className="bg-white p-6 rounded-lg shadow">

              <h3 className="text-xl font-semibold text-[#074166] mb-4">
                What you will learn
              </h3>

              <ul className="space-y-3 text-gray-600">

                {course.benefits.map((b, i) => (
                  <li key={i}>✔ {b}</li>
                ))}

              </ul>

            </div>

          )}

        </div>

      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  );
}