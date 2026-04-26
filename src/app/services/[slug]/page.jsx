// "use client";  


// import { client } from "../../../sanity/lib/client"
// import { singleServiceQuery } from "../../../sanity/lib/queries"
// import { urlFor } from "../../../sanity/lib/image"
// import { PortableText } from "@portabletext/react"
// import { notFound } from "next/navigation"
// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"
// import WhatsAppButton from "../../components/WhatsAppButton"

// const data = await fetch(url, { next: { revalidate: 60 } });

// export default async function ServiceDetail({ params }) {
//   const resolvedParams = await params
//   const slug = resolvedParams?.slug
//   if (!slug) {
//     return notFound()
//   }

//   const service = await client.fetch(singleServiceQuery, {
//     slug
//   })

//   if (!service) {
//     notFound()
//   }

//   return (
//     <div className="bg-white pt-24">

//       <Navbar />

//       <section className="py-20 px-6 bg-gray-100">

//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//           <img
//             src={
//               service.image
//                 ? urlFor(service.image).width(1000).height(500).url()
//                 : "/placeholder.jpg"
//             }
//             className="rounded-2xl shadow-xl"
//           />

//           <div>

//             <h1 className="text-4xl font-bold text-[#074166]">
//               {service.title}
//             </h1>

//             <div className="mt-6 prose max-w-none">
//               <PortableText value={service.description} />
//             </div>

//             <button
//   onClick={() => window.open("https://wa.me/923001234567", "_blank")}
//   className="mt-8 bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
// >
//   Get Service Now?
// </button>

//             {/* <button className="mt-8 bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
//               Get Service Now?
            
//             </button> */}

//           </div>

//         </div>

//       </section>

//       <Footer />
//       <WhatsAppButton />

//     </div>
//   )
// }


import { client } from "../../../sanity/lib/client"
import { singleServiceQuery } from "../../../sanity/lib/queries"
import { urlFor } from "../../../sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"
import WhatsAppButton from "../../components/WhatsAppButton"

export default async function ServiceDetail({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) return notFound()

  const service = await client.fetch(singleServiceQuery, { slug })
  if (!service) notFound()

  return (
    <div className="bg-white pt-24">
      <Navbar />
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src={service.image ? urlFor(service.image).width(1000).height(500).url() : "/placeholder.jpg"}
            className="rounded-2xl shadow-xl"
          />
          <div>
            <h1 className="text-4xl font-bold text-[#074166]">{service.title}</h1>
            <div className="mt-6 prose max-w-none">
              <PortableText value={service.description} />
            </div>

            <a
              href="https://wa.me/923203400111?text=Hello%20I%20want%20course%20information"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-8 bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                Get Service Now?
              </button>
            </a>

          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}