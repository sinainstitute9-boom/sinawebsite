// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { client } from "../../sanity/lib/client";
// import { mentorsQuery } from "../../sanity/lib/queries";
// import { urlFor } from "../../sanity/lib/image";
// import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsAppButton";
// import { motion } from "framer-motion";

// export default function MentorsPage() {

//   const [mentors, setMentors] = useState([]);

//   useEffect(() => {
//     client.fetch(mentorsQuery).then(setMentors);
//   }, []);

//   return (
//     <div className="bg-white text-gray-800">

//       <Navbar />

//       {/* HERO */}
//       <section className="text-center text-[#074166] mt-20">
//             <img
//           src="/images/mentors.png"
//           alt="mentors hero"
//           className="w-screen h-full object-contain opacity-90"></img>

//         {/* <h1 className="text-5xl font-bold text-[#074166]">
//           Our <span className="text-[#fdad1b]">Mentors</span>
//         </h1> */}

//         <p className="mt-6 max-w-2xl mx-auto  
//          text-gray-900-10 text-4xl font-bold">
//           Learn from industry experts 
//         </p>

//       </section>


//       {/* MENTOR GRID */}
//       <section className="py-20 px-6 pt-10">

//         <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

//           {mentors.map((mentor) => {

//             const slug =
//               mentor.slug?.current ||
//               mentor.name
//                 ?.toLowerCase()
//                 .trim()
//                 .replace(/[^\w\s-]/g, "")
//                 .replace(/[\s_]+/g, "-")
//                 .replace(/^-+|-+$/g, "");

//             return (

//               <motion.div
//                 key={mentor._id}
//                 whileHover={{ y: -8 }}
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#fdad1b] transition overflow-hidden"
//               >

//                 {/* IMAGE */}
//                 <div className="h-90 object-cover">

//                   <img
//                     src={
//                       mentor.image
//                         ? urlFor(mentor.image).width(400).height(500).url()
//                         : "/placeholder.jpg"
//                     }
//                     alt={mentor.name}
//                     className="w-full h-full object-cover hover:scale-110 transition duration-500"
//                   />

//                 </div>


//                 {/* CONTENT */}
//                 <div className="p-6 text-center">

//                   <h3 className="text-lg font-bold text-[#074166]">
//                     {mentor.name}
//                   </h3>

//                   <p className="text-[#fdad1b] font-semibold text-sm mt-1">
//                     {mentor.designation}
//                   </p>

//                   <p className="text-gray-600 text-sm mt-3 line-clamp-3">
//                     {mentor.shortBio || "Experienced mentor guiding students with industry expertise."}
//                   </p>

//                   {slug && (
//                     <Link href={`/mentors/${slug}`}>
//                       <button className="mt-5 bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
//                         Read More
//                       </button>
//                     </Link>
//                   )}

//                 </div>

//               </motion.div>

//             );
//           })}
//         </div>

//       </section>

//       <Footer />
//       <WhatsAppButton />

//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { mentorsQuery } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { motion } from "framer-motion";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    client.fetch(mentorsQuery).then(setMentors);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="text-center text-[#074166] mt-16 md:mt-20">
        <img
          src="/images/mentors.png"
          alt="mentors hero"
          className="w-full h-auto object-contain opacity-90"
        />
        <p className="mt-4 md:mt-6 max-w-2xl mx-auto px-4 text-2xl md:text-4xl font-bold">
          Learn from industry experts
        </p>
      </section>

      {/* MENTOR GRID */}
      <section className="py-10 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
          {mentors.map((mentor) => {
            const slug =
              mentor.slug?.current ||
              mentor.name
                ?.toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_]+/g, "-")
                .replace(/^-+|-+$/g, "");

            return (
              <motion.div
                key={mentor._id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#fdad1b] transition overflow-hidden"
              >
                {/* IMAGE */}
                <div className="h-65 md:h-85 overflow-hidden">
                  <img
                    src={
                      mentor.image
                        ? urlFor(mentor.image).width(400).height(500).url()
                        : "/placeholder.jpg"
                    }
                    alt={mentor.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-3 md:p-6 text-center">
                  <h3 className="text-sm md:text-lg font-bold text-[#074166]">
                    {mentor.name}
                  </h3>
                  <p className="text-[#fdad1b] font-semibold text-xs md:text-sm mt-1">
                    {mentor.designation}
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm mt-2 line-clamp-3">
                    {mentor.shortBio || "Experienced mentor guiding students with industry expertise."}
                  </p>
                  {slug && (
                    <Link href={`/mentors/${slug}`}>
                      <button className="mt-3 md:mt-5 bg-[#fdad1b] text-[#074166] px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold hover:scale-105 transition">
                        Read More
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}