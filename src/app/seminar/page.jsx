"use client"

import { useEffect, useState } from "react"
import { client } from "../../sanity/lib/client"
import { seminarsQuery, upcomingSeminarsQuery } from "../../sanity/lib/queries"
import { urlFor } from "../../sanity/lib/image"
import Link from "next/link"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"

export default function SeminarsPage(){

  const [seminars,setSeminars] = useState([])
  const [upcoming,setUpcoming] = useState([])

  useEffect(()=>{

    client.fetch(seminarsQuery).then(setSeminars)
    client.fetch(upcomingSeminarsQuery).then(setUpcoming)

  },[])

  return(

    <div className="bg-white">

      <Navbar/>

      {/* ANNOUNCEMENT MARQUEE */}

      {upcoming.length > 0 && (

        <div className="bg-[#fdad1b] text-[#074166] py-3 font-semibold flex items-center justify-center h-8">

          <marquee>

            {upcoming.map(item => (
              `Upcoming Seminar: ${item.title} | `
            ))}

          </marquee>

        </div>

      )}

      {/* HERO */}

      <section className="pt-32 pb-20 bg-[#074166] text-white text-center">

        <h1 className="text-5xl font-bold">

          Seminars & <span className="text-[#fdad1b]">Events</span>

        </h1>

        <p className="mt-6 opacity-90">
          Explore our seminars, guest lectures and knowledge sessions
        </p>

      </section>


      {/* SEMINAR GRID */}

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {seminars.map(item=>(

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:border-[#fdad1b]"
            >

              <img
                src={
                  item.coverImage
                    ? urlFor(item.coverImage).width(600).height(400).url()
                    : "/placeholder.jpg"
                }
                className="w-full h-60 object-cover"
              />

              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-[#074166]">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  {item.speaker}
                </p>

                <p className="text-[#fdad1b] text-sm">
                  {item.date}
                </p>

                {item.slug?.current && (

                  <Link href={`/seminar/${item.slug.current}`}>

                    <button className="mt-4 bg-[#fdad1b] text-[#074166] px-6 py-2 rounded-full font-semibold">

                      View Seminar

                    </button>

                  </Link>

                )}

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer/>

    </div>
  )
}