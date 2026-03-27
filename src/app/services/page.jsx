"use client"

import { useEffect, useState } from "react"
import { client } from "../../sanity/lib/client"
import { servicesQuery } from "../../sanity/lib/queries"
import { urlFor } from "../../sanity/lib/image"
import Link from "next/link"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"
import { motion } from "framer-motion"

export default function ServicesPage() {

  const [services, setServices] = useState([])

  useEffect(() => {
    client.fetch(servicesQuery).then(setServices)
  }, [])

  return (
    <div className="bg-white">

      <Navbar />

      {/* HERO */}

       <section className="text-center text-[#074166] mt-20">
            <img
          src="/images/services.png"
          alt="courses hero"
          className="w-screen h-full object-contain opacity-90"></img>

        <h1 className="text-5xl font-bold text-[#074166] mt-20">
       
          Professional IT training & Technology Solutions
        </h1>

      </section>


      {/* SERVICES GRID */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {services.map(service => (

            <motion.div
              key={service._id}
              whileHover={{ y:-10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:border-[#fdad1b] transition"
            >

              <img
                src={
                  service.image
                    ? urlFor(service.image).width(500).height(300).url()
                    : "/placeholder.jpg"
                }
                className="w-full h-52 object-cover"
              />

              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-[#074166]">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {service.shortDescription}
                </p>

                {service.slug?.current && (

                  <Link href={`/services/${service.slug.current}`}>

                    <button className="mt-5 bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-full font-semibold hover:scale-105 transition">

                      Learn More

                    </button>

                  </Link>

                )}

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  )
}