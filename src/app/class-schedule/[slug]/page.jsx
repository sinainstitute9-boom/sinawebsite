import { client } from "../../../sanity/lib/client"
import { singleScheduleQuery } from "../../../sanity/lib/queries"

import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"

// ✅ Dynamic metadata (SEO)
export async function generateMetadata({ params }) {
  const data = await client.fetch(singleScheduleQuery, {
    slug: params.slug,
  })

  return {
    title: data?.title || "Class Schedule",
  }
}

// ✅ Page Component (SERVER COMPONENT - best practice)
export default async function ScheduleDetailPage({ params }) {

  const data = await client.fetch(singleScheduleQuery, {
    slug: params.slug,
  })

  // ✅ Not found case
  if (!data) {
    return (
      <div className="text-center mt-20 text-red-500">
        Schedule not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-[#074166]">
          {data.title}
        </h1>
        <p className="mt-4 text-gray-800">
          {data.course} - {data.instructor}
        </p>
      </section>

      {/* DETAILS */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4">

          <p><strong>Course:</strong> {data.course}</p>

          <p><strong>Instructor:</strong> {data.instructor}</p>

          <p><strong>Room:</strong> {data.room}</p>

          <p>
            <strong>Start:</strong>{" "}
            {new Date(data.start).toLocaleString()}
          </p>

          <p>
            <strong>End:</strong>{" "}
            {new Date(data.end).toLocaleString()}
          </p>

        </div>
      </section>

      <Footer />

    </div>
  )
}