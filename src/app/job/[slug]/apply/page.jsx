import { client } from "../../../../sanity/lib/client";
import { jobBySlugQuery } from "../../../../sanity/lib/queries";
import Navbar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { useState } from "react";

export default async function JobApplyPage({ params }) {
  const job = await client.fetch(jobBySlugQuery(params.slug));

  if (!job) return <p className="text-center mt-20 text-[#074166] font-semibold">Job not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#074166] mb-4">{job.title} - Apply Now</h1>
        <p className="text-gray-800 mb-6">{job.description}</p>

        <h2 className="text-xl font-semibold text-[#074166] mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-800 mb-6">
          {job.requirements?.map((req, idx) => <li key={idx}>{req}</li>)}
        </ul>

        {job.applyLink ? (
          <a 
            href={job.applyLink} 
            target="_blank" 
            className="bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Apply via Link
          </a>
        ) : (
          <JobForm fields={job.formFields || []} />
        )}

      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// Component for dynamic job form
function JobForm({ fields }) {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) return <p className="text-green-600 font-semibold mt-4">Application submitted successfully!</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      {fields.length === 0 && <p className="text-gray-700">Please fill your details and submit.</p>}

      {fields.map((field, idx) => (
        <input
          key={idx}
          type="text"
          name={field}
          placeholder={field}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#074166]"
          required
        />
      ))}

      <button className="bg-[#fdad1b] text-[#074166] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
        Submit Application
      </button>
    </form>
  );
}