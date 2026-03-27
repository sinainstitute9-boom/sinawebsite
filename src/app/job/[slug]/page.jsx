import { client } from "../../../sanity/lib/client";
import { jobBySlugQuery } from "../../../sanity/lib/queries";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) {
    return <p className="text-center mt-20">Job not found</p>
  }

  const job = await client.fetch(jobBySlugQuery(slug));

  if (!job) return <p className="text-center mt-20">Job not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen  pt-24   ">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#074166] mb-4">{job.title}</h1>
        <p className="text-gray-800 mb-4"><strong>Location:</strong> {job.location}</p>
        <p className="text-gray-800 mb-4">{job.description}</p>
        <h2 className="text-xl font-semibold text-[#074166] mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          {job.requirements?.map((req, idx) => <li key={idx}>{req}</li>)}
        </ul>
        <a href={job.applyLink} target="_blank" className="bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
          Apply Now
        </a>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}