import { client } from "@/sanity/lib/client"
import { registrationBySlug, allRegistrationSlugs } from "@/sanity/lib/queries"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"

export async function generateStaticParams() {
  const slugs = await client.fetch(allRegistrationSlugs)

  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function RegistrationDetail({ params }) {
  const { slug } = params

  const data = await client.fetch(registrationBySlug, { slug })

  if (!data) return <div className="p-10">No Data Found</div>

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-6">{data.fullName}</h1>

        <p><b>Program:</b> {data.programTitle}</p>
        <p><b>Coordinator:</b> {data.coordinator}</p>
        {/* <p><b>Batch:</b> {data.batchNo}</p> */}

        <hr className="my-6" />

        <p><b>Father Name:</b> {data.fatherName}</p>
        <p><b>CNIC:</b> {data.cnic}</p>
        <p><b>DOB:</b> {data.dob}</p>
        <p><b>City:</b> {data.city}</p>
        <p><b>Contact:</b> {data.contact}</p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold">Academic Background</h2>
        {data.academics?.map((a, i) => (
          <div key={i}>
            {a.degree} - {a.year} ({a.institution})
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-6">Experience</h2>
        {data.experience?.map((e, i) => (
          <div key={i}>
            {e.organization} - {e.designation} ({e.period})
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-6">Comments</h2>
        <p>{data.comments}</p>
      </div>

      <Footer />
    </div>
  )
}