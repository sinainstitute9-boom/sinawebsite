"use client";

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { blogsQuery } from "../../sanity/lib/queries";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    client.fetch(blogsQuery).then(setBlogs);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
        <div className="  bg-[#074166] py-16 pt-40     text-white text-center">
          <h1 className="text-5xl font-bold">
            Our Latest <span className="text-[#fdad1b]">  Blogs & Articles</span>
          </h1>
          <p className="mt-6 opacity-90">
            Stay Ahead with Industry Trends & Skills
          </p>
        </div>
      <section className="max-w-7xl mx-auto px-6 py-16 pt-30">
       
     

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog.slug.current} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition">
              <img src={(blog.thumbnail || blog.mainImage) ? urlFor(blog.thumbnail || blog.mainImage).width(800).url() : "/placeholder.jpg"} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#074166] mb-2">{blog.title}</h2>
                <Link href={`/blog/${blog.slug.current}`}>
                  <button className="bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}