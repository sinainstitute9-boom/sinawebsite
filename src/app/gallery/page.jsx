"use client"

import { useEffect, useState } from "react"
import { client } from "../../sanity/lib/client"
import { galleryQuery} from "../../sanity/lib/queries"
import { urlFor } from "../../sanity/lib/image"
import Link from "next/link"
import { motion } from "framer-motion"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"

export default function GalleryPage(){

  const [galleries,setGalleries] = useState([])

  useEffect(()=>{
    client.fetch(galleryQuery).then(setGalleries)
  },[])

  return(

    <div className="bg-white">

      <Navbar/>

      {/* HERO */}

      <section className=" text-white text-center">

        {/* <h1 className="text-5xl font-bold">
          Our <span className="text-[#fdad1b]">Gallery</span>
        </h1> */}
           <img
          src="/images/staff.JPG"
          alt="About Us Hero"
          className="w-screen h-screen object-cover opacity-80"></img>
        

        <p className="mt-6 max-w-2xl mx-auto opacity-90">
          Explore moments from our departments, training sessions,
          events and student activities.
        </p>

      </section>


      {/* GALLERY GRID */}

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {galleries.map(item=>(

            <motion.div
              key={item._id}
              whileHover={{y:-10}}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:border-[#fdad1b]"
            >

              <img
                src={
                  item.coverImage
                    ? urlFor(item.coverImage).width(600).height(400).url()
                    : "/placeholder.jpg"
                }
                className="w-full h-64 object-cover"
              />

              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-[#074166]">
                  {item.title}
                </h3>

                <p className="text-[#fdad1b] text-sm mt-1">
                  {item.department}
                </p>

                <p className="text-gray-600 mt-3 text-sm">
                  {item.description}
                </p>

                {item.slug?.current && (

                  <Link href={`/gallery/${item.slug.current}`}>

                    <button className="mt-5 bg-[#fdad1b] text-[#074166] px-6 py-2 rounded-full font-semibold hover:scale-105 transition">

                      View Photos

                    </button>

                  </Link>

                )}

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      <Footer/>
      <WhatsAppButton/>

    </div>
  )
}