"use client";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnnouncementBar from "../components/AnnouncementBar";
import { createClient } from "next-sanity"
import { getActiveAnnouncementsQuery } from "../../sanity/lib/queries"
import { useState, useEffect } from "react";

const client = createClient({
  projectId: 'u4tign1y', 
  dataset: 'production',
  apiVersion: '2026-03-25',
  useCdn: true,
})


export default function Home() {
  const [announcement, setAnnouncement] = useState(null)

  useEffect(() => {
    client.fetch(getActiveAnnouncementsQuery).then((data) => {
      setAnnouncement(data?.[0] || null)
    })
  }, [])

  return (
    <div className="bg-white">
            {/* ================= ANNOUNCEMENT BAR ================= */}
         <AnnouncementBar announcement={announcement} />
      <Navbar />
      
      <section className="text-center text-[#074166] pt-30 px-6 pb-20 ">
        <h1 className="text-3xl font-bold mb-4">Admissions Open</h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Join SINA Institute today and enhance your professional skills.
        </p>
        <a
          href="/book-query" 
          className="bg-[#fdad1b] text-[#074166] px-8 py-3 rounded-lg font-semibold hover:scale-105 transition "
        >
          Enroll Now
        </a>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}