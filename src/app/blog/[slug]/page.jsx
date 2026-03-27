import { client } from "../../../sanity/lib/client";
import { blogBySlugQuery } from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) {
    return <p className="text-center mt-20">Blog not found</p>
  }

  const blog = await client.fetch(blogBySlugQuery(slug));

  if (!blog) return <p className="text-center mt-20">Blog not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-16">
        {(blog.thumbnail || blog.mainImage) && (
          <img
            src={urlFor(blog.thumbnail || blog.mainImage).width(1200).url()}
            className="w-full h-full object-contain rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-[#074166] mb-4">{blog.title}</h1>
        <p className="text-gray-800 mb-6">
          {blog.content || (Array.isArray(blog.body) ? blog.body.map(block => block.children?.map(c => c.text).join("")).join("\n") : "")}
        </p>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}