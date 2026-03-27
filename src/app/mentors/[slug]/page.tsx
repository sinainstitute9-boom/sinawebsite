// import { client } from "../../../sanity/lib/client";
// import { singleMentorQuery, mentorsQuery } from "../../../sanity/lib/queries";
// import { urlFor } from "../../../sanity/lib/image";
// import { PortableText } from "@portabletext/react";
// import type { Metadata } from "next";
// import { notFound } from "next/navigation";

// // Use on-demand ISR instead of static generation
// export const revalidate = 3600; // Revalidate every hour

// export async function generateMetadata(
//   { params }: { params: { slug: string } | Promise<{ slug: string }> }
// ): Promise<Metadata> {
//   try {
//     const { slug } = await params;
//     if (!slug) {
//       return {
//         title: "Mentor",
//         robots: "noindex",
//       };
//     }
    
//     const mentor = await client.fetch(singleMentorQuery, {
//       slug,
//     });

//     if (!mentor) {
//       return {
//         title: "Mentor Not Found",
//         robots: "noindex",
//       };
//     }

//     const seo = mentor.seo || {};

//     return {
//       title: seo.metaTitle || mentor.name,
//       description: seo.metaDescription || mentor.designation,
//       keywords: seo.keywords?.join(", "),
//       robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
//       openGraph: {
//         title: seo.metaTitle || mentor.name,
//         description: seo.metaDescription || mentor.designation,
//         images: seo.ogImage
//           ? [
//               {
//                 url: urlFor(seo.ogImage)
//                   .width(1200)
//                   .height(630)
//                   .url(),
//               },
//             ]
//           : [],
//       },
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       title: "Mentor",
//       robots: "noindex",
//     };
//   }
// }

// type PageProps = {
//   params: { slug: string } | Promise<{ slug: string }>;
// };

// // Return empty array to make this a fully dynamic route
// // Metadata will be generated on-demand for each request
// export async function generateStaticParams() {
//   return [];
// }

// export default async function MentorDetail({ params }: PageProps) {
//   const { slug } = await params;

//   try {
//     console.log(`[Mentor Page] Fetching mentor with slug: ${slug}`);
    
//     // Debug: Fetch all mentors to see what exists
//     const allMentors = await client.fetch(mentorsQuery);
//     console.log(`[Mentor Page] All mentors available:`, JSON.stringify(allMentors.map((m: any) => ({ name: m.name, slug: m.slug?.current })), null, 2));
    
//     const mentor = await client.fetch(singleMentorQuery, { slug });
//     console.log(`[Mentor Page] Fetch result for slug "${slug}":`, mentor ? "Found" : "Not found");

//     if (!mentor) {
//       console.error(`[Mentor Page] Mentor not found for slug: ${slug}`);
//       notFound();
//     }

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative container mx-auto px-20 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-9 items-center">
//         {/* LEFT */}
//         <div className="relative">
//           {/* NAME BADGE */}
//           <div className="mb-40">
//             <span className="inline-block px-6 py-2 text-[20px] font-bold border-2 rounded-lg text-[#3D4098] border-[#3D4098] bg-white">
//               {mentor.name}
//             </span>
//           </div>

//           {/* SHORT BIO */}
//           <div className="max-w-115 mb-9 mt-[-120]">
//             <h1
//               className="
//                 text-[20px] md:text-[20.74px]
//                 leading-[132%]
//                 tracking-[-0.02em]
//                 text-black
//                 mb-4
//                 [text-shadow:
//                   0.8px_0_0_#3D4098,
//                   -0.8px_0_0_#3D4098,
//                   0_0.8px_0_#3D4098,
//                   0_-0.8px_0_#3D4098
//                 ]
//               "
//             >
//               {mentor.designation}
//             </h1>
//           </div>

//           {/* CTA */}
//           <button className="bg-[#3D4098] hover:bg-[#2f327a] mt-10 text-white px-7 py-2 rounded-lg shadow-lg transition">
//             Enroll Now
//           </button>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="relative flex justify-center">
//           <div
//             className="absolute -top-16 -left-[-20]
//             w-105 md:w-130 lg:w-153.25
//             h-90 md:h-115 lg:h-131.25
//             bg-no-repeat bg-contain"
//             style={{ backgroundImage: "url('/bg.png')" }}
//           />

//           <div className="relative z-10 rounded-2xl overflow-hidden translate-x-8 -translate-6.5">
//             <img
//               src={
//                 mentor.image
//                   ? urlFor(mentor.image).width(500).height(600).url()
//                   : "/placeholder.jpg"
//               }
//               alt={mentor.name}
//               className="w-55 h-130 md:w-100 md:h-105 lg:w-106 lg:h-114.5 object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= ABOUT & EXPERTISE ================= */}
//       <section className="container mx-auto px-20 py-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//         {/* ABOUT */}
//         <div>
//           <div className="flex items-center gap-2 mb-6">
//             <span className="w-6 h-0.75 bg-green-600"></span>
//             <h2 className="font-extrabold text-[#3D4098]">
//               About {mentor.name}
//             </h2>
//           </div>

//           <div className="prose max-w-none">
//             <PortableText value={mentor.bio} />
//           </div>
//         </div>

//         {/* EXPERTISE */}
//         <div className="bg-[#3D4098] rounded-2xl py-8 px-12 mt-6 text-white shadow-xl">
//           <h3 className="text-center mb-10 mt-[-30]">
//             <span className="inline-flex items-center justify-center font-extrabold px-10 w-110 h-22.5 text-[32px] border-l border-r border-b border-white rounded-b-3xl">
//               Expertise & Skills
//             </span>
//           </h3>

//           <ul className="space-y-6 pb-6">
//             {mentor.expertise?.map((item: string, i: number) => (
//               <li
//                 key={i}
//                 className="flex items-center gap-4 pb-4 border-b border-white/60"
//               >
//                 <span className="w-5 h-5 rounded-full bg-[#15A959] flex items-center justify-center text-white text-xs">
//                   ✓
//                 </span>
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
//   } catch (error) {
//     console.error('Error fetching mentor:', error);
//     return <div className="p-8">Error loading mentor details</div>;
//   }
// }







import { client } from "../../../sanity/lib/client";
import { singleMentorQuery } from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

export const revalidate = 3600;

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function MentorDetail({ params }: PageProps) {
  const { slug } = await params;

  const mentor = await client.fetch(singleMentorQuery, { slug });

  if (!mentor) {
    notFound();
  }

  return (
    <div className="bg-white text-gray-800 pt-24">
      <Navbar />

      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="relative flex justify-center">
            <div className="bg-[#074166]  p-3 shadow-2xl">

              <img
                src={
                  mentor.image
                    ? urlFor(mentor.image).width(500).height(600).url()
                    : "/placeholder.jpg"
                }
                alt={mentor.name}
                className=" w-[380px] h-[420px] object-cover"
              />

            </div>
          </div>


          {/* RIGHT CONTENT */}
          <div>

            <h2 className="text-4xl font-bold text-[#074166]">
              Meet Our Mentor
            </h2>

            <h3 className="text-2xl font-semibold mt-3">
              {mentor.name}
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {mentor.designation}
            </p>


            {/* BIO */}
            <div className="mt-6 prose max-w-none">
              <PortableText value={mentor.bio} />
            </div>


            {/* SKILLS */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              {mentor.expertise?.map((skill: string, index: number) => (

                <div
                  key={index}
                  className="flex items-center gap-2 bg-white shadow-md rounded-xl px-4 py-3"
                >

                  <div className="w-3 h-3 bg-[#fdad1b] rounded-full"></div>

                  <p className="text-sm font-medium text-gray-700">
                    {skill}
                  </p>

                </div>

              ))}

            </div>


            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">

              <button className="bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                Ask a Question
              </button>

              <button className="border-2 border-[#074166] text-[#074166] px-6 py-3 rounded-full font-semibold hover:bg-[#074166] hover:text-white transition">
                Enroll Now
              </button>

            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}