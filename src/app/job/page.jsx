"use client";

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { jobsQuery } from "../../sanity/lib/queries";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    client.fetch(jobsQuery).then(setJobs);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
       <div className="  bg-[#074166] py-16 pt-40     text-white text-center">
          <h1 className="text-5xl font-bold">
            Job <span className="text-[#fdad1b]">  Opportunities</span>
          </h1>
          <p className="mt-6 opacity-90">
            Unlock your career potential with our exclusive job opportunities.  </p>
        </div>
      <section className="max-w-7xl mx-auto px-6 py-16 pt-35">   
        
        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map(job => (
            <div key={job.slug.current} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-[#074166] mb-2">{job.title}</h2>
              <p className="text-gray-800 mb-2">{job.location}</p>
              <Link href={`/job/${job.slug.current}`}>
                <button className="bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}