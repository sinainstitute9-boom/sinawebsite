// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import { client } from "../../../sanity/lib/client"
// import { feeStructureBySlugQuery } from "../../../sanity/lib/queries"

// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"
// import WhatsAppButton from "../../components/WhatsAppButton"


// export default function FeeDetailPage() {

//   const { slug } = useParams()                // dynamic route slug
//   const [course, setCourse] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (!slug) return

//     client.fetch(feeStructureBySlugQuery(slug))
//       .then(data => {
//         setCourse(data)
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error(err)
//         setLoading(false)
//       })
//   }, [slug])

//   if (loading) return (
//     <div className="text-center py-32 text-gray-500 font-semibold">
//       Loading course details...
//     </div>
//   )

//   if (!course) return (
//     <div className="text-center py-32 text-red-500 font-semibold">
//       Course not found!
//     </div>
//   )

//   return (
//     <div className="bg-white min-h-screen">

//       <Navbar />

//       {/* HERO */}
//       <section className="pt-32 pb-20 bg-gray-100 text-center">
//         <h1 className="text-5xl font-bold text-[#074166]">{course.title}</h1>
//         <p className="mt-4 text-gray-800">Detailed Fee Structure & Course Info</p>
//       </section>

//       {/* FEE DETAILS */}
//       <section className="py-20 px-6">
//         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

//           <p className="text-gray-700 text-lg">
//             <span className="font-semibold">Duration:</span> {course.duration}
//           </p>

//           <p className="text-gray-700 text-lg mt-4">
//             <span className="font-semibold">Fee:</span> <span className="text-[#fdad1b]">PKR {course.fee}</span>
//           </p>

//           {course.description && (
//             <p className="text-gray-700 mt-6 leading-relaxed">
//               {course.description}
//             </p>
//           )}

//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//     </div>
//   )
// }






"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { client } from "../../../sanity/lib/client"
import { feeStructureBySlugQuery } from "../../../sanity/lib/queries"

import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"
import WhatsAppButton from "../../components/WhatsAppButton"


export default function FeeDetailPage() {

  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    // ✅ FIXED: function call hataya, { slug } pass kiya
    client.fetch(feeStructureBySlugQuery, { slug })
      .then(data => {
        setCourse(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div className="text-center py-32 text-gray-500 font-semibold">
      Loading course details...
    </div>
  )

  if (!course) return (
    <div className="text-center py-32 text-red-500 font-semibold">
      Course not found!
    </div>
  )

  return (
    <div className="bg-white min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-[#074166]">{course.title}</h1>
        <p className="mt-4 text-gray-800">Detailed Fee Structure & Course Info</p>
      </section>

      {/* FEE DETAILS */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Duration:</span> {course.duration}
          </p>

          <p className="text-gray-700 text-lg mt-4">
            <span className="font-semibold">Fee:</span> <span className="text-[#fdad1b]">PKR {course.fee}</span>
          </p>

          {course.description && (
            <p className="text-gray-700 mt-6 leading-relaxed">
              {course.description}
            </p>
          )}

        </div>
      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  )
}