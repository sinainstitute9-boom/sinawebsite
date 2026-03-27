import { client } from "../../../sanity/lib/client";
import { singleFeedbackQuery } from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function FeedbackDetail({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) {
    return notFound()
  }

  const feedback = await client.fetch(singleFeedbackQuery, {
    slug,
  });

  if (!feedback) {
    notFound();
  }

  return (
    <div className="bg-white pt-24">

      <Navbar />

      <section className="py-20 px-6 bg-gray-100">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">

          <img
            src={
              feedback.image
                ? urlFor(feedback.image).width(200).height(200).url()
                : "/placeholder.jpg"
            }
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />

          <h1 className="text-3xl font-bold text-[#074166] mt-6">
            {feedback.name}
          </h1>

          <p className="text-[#fdad1b] mt-2">
            {feedback.course}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {feedback.text}
          </p>

        </div>

      </section>

      <Footer />
      <WhatsAppButton />

    </div>
  );
}