"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { client } from "../../sanity/lib/client";
import { feedbackQuery } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

export default function FeedbackPage() {

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    client.fetch(feedbackQuery).then(setFeedbacks);
  }, []);

  return (
    <div className="bg-white">

      <Navbar />

      <section className="pt-32 pb-20 bg-gray-100 text-center">

        <h1 className="text-5xl font-bold text-[#074166]">
          Student <span className="text-[#fdad1b]">Feedback</span>
        </h1>

      </section>

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          {feedbacks.map((item)=>(

            <motion.div
              key={item._id}
              whileHover={{ y:-10 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border hover:border-[#fdad1b]"
            >

              <img
                src={
                  item.image
                    ? urlFor(item.image).width(200).height(200).url()
                    : "/placeholder.jpg"
                }
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />

              <h3 className="mt-4 font-bold text-[#074166]">
                {item.name}
              </h3>

              <p className="text-sm text-[#fdad1b]">
                {item.course}
              </p>

              <p className="text-gray-600 mt-4">
                "{item.text}"
              </p>

              {item.slug?.current && (
                <Link href={`/feedback/${item.slug.current}`}>
                  <button className="mt-5 bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-full font-semibold">
                    Read Story
                  </button>
                </Link>
              )}

            </motion.div>

          ))}

        </div>

      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  );
}