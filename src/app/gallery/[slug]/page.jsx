import { client } from "../../../sanity/lib/client"
import { singleGalleryQuery } from "../../../sanity/lib/queries"
import { urlFor } from "../../../sanity/lib/image"
import { notFound } from "next/navigation"

import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"
import WhatsAppButton from "../../components/WhatsAppButton"

export default async function GalleryDetail({ params }) {
  const { slug } = await params

  const gallery = await client.fetch(singleGalleryQuery, {
    slug,
  })

  if(!gallery){
    notFound()
  }

  return(

    <div className="bg-white pt-24">

      <Navbar/>

      {/* HEADER */}

      <section className="py-20 bg-gray-100 text-center">

        <h1 className="text-4xl font-bold text-[#074166]">
          {gallery.title}
        </h1>

        <p className="text-[#fdad1b] mt-2">
          {gallery.department}
        </p>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {gallery.description}
        </p>

      </section>


      {/* IMAGES */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {gallery.images?.map((img,index)=>(

            <img
              key={index}
              src={urlFor(img).width(800).url()}
              className="rounded-xl shadow-lg hover:scale-105 transition"
            />

          ))}

        </div>

      </section>

      <Footer/>
      <WhatsAppButton/>

    </div>

  )
}