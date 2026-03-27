"use client";

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { faqQuery } from "../../sanity/lib/queries";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(faqQuery).then(data => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-20 text-[#074166] font-semibold">Loading FAQs...</p>;

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="text-center text-[#074166] mt-20">
        <img
          src="/images/faq-hero.png"
          alt="FAQ Hero"
          className="w-full max-h-80 object-contain opacity-90"
        />
        <p className="text-lg opacity-90 mt-8 max-w-4xl mx-auto font-bold">
          Frequently Asked Questions about SINA Institute
        </p>
      </section>

      {/* FAQ GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-8">
        {categories.map(cat => (
          <div key={cat} className="mb-8">
            <h2 className="text-2xl font-bold text-[#074166] mb-4 capitalize border-b-2 border-[#fdad1b] inline-block pb-2">
              {cat}
            </h2>

            <div className="grid gap-4">
              {faqs
                .filter(f => f.category === cat)
                .map((faq, idx) => (
                  <details
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <summary className="font-semibold text-[#074166]">{faq.question}</summary>
                    <p className="mt-2 text-gray-800">{faq.answer}</p>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}