"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { client } from "../../sanity/lib/client"
import { allFeeStructuresQuery } from "../../sanity/lib/queries"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"

export default function FeeStructurePage() {
  const [fees, setFees] = useState([])

  useEffect(() => {
    client.fetch(allFeeStructuresQuery)
      .then(data => setFees(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-[#074166]">
          Fee <span className="text-[#fdad1b]">Structure</span>
        </h1>
        <p className="mt-4 text-gray-800">Check our courses fees and duration</p>
      </section>

      {/* FEE CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {fees.map((item, idx) => (
            <Link key={idx} href={`/feestructure/${item.slug.current}`}>
              <div className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
                <h2 className="text-2xl font-bold text-[#074166]">{item.title}</h2>
                <p className="mt-2 text-gray-700">Duration: <span className="font-semibold">{item.duration}</span></p>
                <p className="mt-2 text-gray-700">Fee: <span className="font-semibold text-[#fdad1b]">PKR {item.fee}</span></p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}