// File: seminar/[slug]/page.jsx
import { client } from "../../../sanity/lib/client"
import { singleSeminarQuery, seminarsQuery } from "../../../sanity/lib/queries"
import { urlFor } from "../../../sanity/lib/image"
import { notFound } from "next/navigation"
import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"

// This tells Next.js which seminar pages to pre-render
export async function generateStaticParams() {
  const seminars = await client.fetch(seminarsQuery)
  return seminars.map(s => ({ slug: s.slug.current }))
}

export default async function SeminarDetail({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) return notFound()

  const seminar = await client.fetch(singleSeminarQuery, { slug })
  if (!seminar) return notFound()

  const videoId = seminar.youtube?.includes("v=")
    ? seminar.youtube.split("v=")[1]
    : seminar.youtube?.split("/").pop()

  return (
    <div className="bg-white pt-24">
      <Navbar />

      <section className="py-20 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-[#074166]">{seminar.title}</h1>
        <p className="text-[#fdad1b] mt-2">{seminar.speaker}</p>
        <p className="text-gray-600 mt-3">
          {seminar.date} {seminar.location}
        </p>
        {seminar.description && (
          <p className="mt-4 max-w-3xl mx-auto text-gray-700">{seminar.description}</p>
        )}
      </section>

      {videoId && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <iframe
              className="w-full h-[450px] rounded-xl"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
        </section>
      )}

      {seminar.images?.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {seminar.images.map((img, index) => (
              <img
                key={index}
                src={urlFor(img).width(800).url()}
                alt={seminar.title}
                className="rounded-xl shadow-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}






















// // File: seminar/[slug]/page.jsx
// import { client } from "../../../sanity/lib/client"
// import { singleSeminarQuery } from "../../../sanity/lib/queries"
// import { urlFor } from "../../../sanity/lib/image"
// import { notFound } from "next/navigation"
// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"

// export default async function SeminarDetail({ params }) {
//   // ✅ Ensure slug exists
//   const slug = params?.slug
//   if (!slug) {
//     return notFound()
//   }

//   // Fetch seminar from Sanity using the slug
//   const seminar = await client.fetch(singleSeminarQuery, { slug })

//   // If no seminar found, show 404
//   if (!seminar) {
//     return notFound()
//   }

//   // Extract YouTube video ID safely
//   const videoId = seminar.youtube?.includes("v=")
//     ? seminar.youtube.split("v=")[1]
//     : seminar.youtube?.split("/").pop()

//   return (
//     <div className="bg-white pt-24">
//       <Navbar />

//       {/* SEMINAR INFO */}
//       <section className="py-20 bg-gray-100 text-center">
//         <h1 className="text-4xl font-bold text-[#074166]">{seminar.title}</h1>
//         <p className="text-[#fdad1b] mt-2">{seminar.speaker}</p>
//         <p className="text-gray-600 mt-3">
//           {seminar.date} | {seminar.location}
//         </p>
//         {seminar.description && (
//           <p className="mt-4 max-w-3xl mx-auto text-gray-700">{seminar.description}</p>
//         )}
//       </section>

//       {/* YOUTUBE VIDEO */}
//       {videoId && (
//         <section className="py-16 px-6">
//           <div className="max-w-4xl mx-auto">
//             <iframe
//               className="w-full h-[450px] rounded-xl"
//               src={`https://www.youtube.com/embed/${videoId}`}
//               allowFullScreen
//             />
//           </div>
//         </section>
//       )}

//       {/* SEMINAR IMAGES */}
//       {seminar.images?.length > 0 && (
//         <section className="py-16 px-6">
//           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
//             {seminar.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={urlFor(img).width(800).url()}
//                 alt={seminar.title}
//                 className="rounded-xl shadow-lg hover:scale-105 transition"
//               />
//             ))}
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   )
// }








// import { client } from "../../../sanity/lib/client"
// import { singleSeminarQuery } from "../../../sanity/lib/queries"
// import { urlFor } from "../../../sanity/lib/image"
// import { notFound } from "next/navigation"
// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"

// export default async function SeminarDetail({ params }) {

//   const seminar = await client.fetch(singleSeminarQuery, {
//     slug: params.slug
//   })

//   if (!seminar) {
//     return notFound()
//   }

//   const videoId = seminar.youtube?.includes("v=")
//     ? seminar.youtube.split("v=")[1]
//     : seminar.youtube?.split("/").pop()

//   return (

//     <div className="bg-white pt-24">

//       <Navbar/>

//       <section className="py-20 bg-gray-100 text-center">

//         <h1 className="text-4xl font-bold text-[#074166]">
//           {seminar.title}
//         </h1>

//         <p className="text-[#fdad1b] mt-2">
//           {seminar.speaker}
//         </p>

//         <p className="text-gray-600 mt-3">
//           {seminar.date} | {seminar.location}
//         </p>

//       </section>

//       {/* YOUTUBE VIDEO */}

//       {videoId && (

//         <section className="py-16 px-6">

//           <div className="max-w-4xl mx-auto">

//             <iframe
//               className="w-full h-[450px] rounded-xl"
//               src={`https://www.youtube.com/embed/${videoId}`}
//               allowFullScreen
//             />

//           </div>

//         </section>

//       )}

//       {/* IMAGES */}

//       {seminar.images?.length > 0 && (

//         <section className="py-16 px-6">

//           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

//             {seminar.images.map((img, index) => (

//               <img
//                 key={index}
//                 src={urlFor(img).width(800).url()}
//                 alt={seminar.title}
//                 className="rounded-xl shadow-lg hover:scale-105 transition"
//               />

//             ))}

//           </div>

//         </section>

//       )}

//       <Footer/>

//     </div>
//   )
// }


















// import { client } from "../../../sanity/lib/client"
// import { singleSeminarQuery } from "../../../sanity/lib/queries"
// import { urlFor } from "../../../sanity/lib/image"
// import { notFound } from "next/navigation"

// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"

// export default async function SeminarDetail({params}){

//   const seminar = await client.fetch(singleSeminarQuery,{
//     slug:params.slug
//   })

//   if(!seminar){
//     notFound()
//   }

//   const videoId = seminar.youtube?.split("v=")[1]

//   return(

//     <div className="bg-white pt-24">

//       <Navbar/>

//       <section className="py-20 bg-gray-100 text-center">

//         <h1 className="text-4xl font-bold text-[#074166]">
//           {seminar.title}
//         </h1>

//         <p className="text-[#fdad1b] mt-2">
//           {seminar.speaker}
//         </p>

//         <p className="text-gray-600 mt-3">
//           {seminar.date} | {seminar.location}
//         </p>

//       </section>


//       {/* YOUTUBE VIDEO */}

//       {videoId && (

//         <section className="py-16 px-6">

//           <div className="max-w-4xl mx-auto">

//             <iframe
//               className="w-full h-[450px] rounded-xl"
//               src={`https://www.youtube.com/embed/${videoId}`}
//               allowFullScreen
//             />

//           </div>

//         </section>

//       )}


//       {/* IMAGES */}

//       <section className="py-16 px-6 ">

//         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 ">

//           {seminar.images?.map((img,index)=>(

//             <img
//               key={index}
//               src={urlFor(img).width(800).url()}
//               className="rounded-xl shadow-lg hover:scale-105 transition  "
//             />

//           ))}

//         </div>

//       </section>

//       <Footer/>

//     </div>
//   )
// }