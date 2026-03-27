import { client } from "../../../sanity/lib/client";
import { singleCourseQuery } from "../../../sanity/lib/queries";
import CourseDetailUI from "./CourseDetailUI";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { urlFor } from "../../../sanity/lib/image";

// ISR
export const revalidate = 3600;

// dynamic route
export async function generateStaticParams() {
  return [];
}

type PageProps = {
  params: Promise<{ slug: string }>; // Promise define karein
};

// ✅ COURSE PAGE
export default async function CoursePage({ params }: PageProps) {
  // 1. Params ko await karein (Next.js 15/16 requirement)
  const { slug } = await params;

  // 2. Query variable pass karein (bina $ sign ke object key mein)
  const course = await client.fetch(singleCourseQuery, { slug });

  if (!course) {
    notFound();
  }

  return <CourseDetailUI course={course} />;
}

// ✅ METADATA GENERATION
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await yahan bhi zaroori hai

  if (!slug) {
    return { title: "Course", robots: "noindex" };
  }

  // ✅ Same fix here: pass { slug }
  const course = await client.fetch(singleCourseQuery, { slug });

  if (!course) {
    return { title: "Course Not Found", robots: "noindex" };
  }

  const seo = course.seo || {};

  return {
    title: seo.metaTitle || course.title,
    description:
      seo.metaDescription ||
      course.shortDescription ||
      (course.description?.[0]?.children?.[0]?.text) ||
      "",
    keywords: seo.keywords?.join(","),
    robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: seo.metaTitle || course.title,
      description: seo.metaDescription || course.shortDescription,
      images: seo.ogImage
        ? [
            {
              url: urlFor(seo.ogImage).width(1200).height(630).url(),
            },
          ]
        : [],
    },
  };
}








// import { client } from "../../../sanity/lib/client";
// import { singleCourseQuery } from "../../../sanity/lib/queries";
// import CourseDetailUI from "./CourseDetailUI";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { urlFor } from "../../../sanity/lib/image";

// // ISR
// export const revalidate = 3600;

// // dynamic route (no pre-build)
// export async function generateStaticParams() {
//   return [];
// }

// type PageProps = {
//   params: { slug: string };
// };

// // ✅ COURSE PAGE
// export default async function CoursePage({ params }: PageProps) {
//   const { slug } = params;

//   // ✅ Pass exact $slug to Sanity
//   // const course = await client.fetch(singleCourseQuery, { $slug: slug });
//   const data = await client.fetch(query, { slug: params.slug });

//   if (!course) {
//     notFound();
//   }

//   return <CourseDetailUI course={course} />;
// }

// // ✅ METADATA GENERATION
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = params;

//   if (!slug) {
//     return { title: "Course", robots: "noindex" };
//   }

//   // ✅ Pass $slug exactly
//   const course = await client.fetch(singleCourseQuery, { $slug: slug });

//   if (!course) {
//     return { title: "Course Not Found", robots: "noindex" };
//   }

//   const seo = course.seo || {};

//   return {
//     title: seo.metaTitle || course.title,
//     description:
//       seo.metaDescription ||
//       course.shortDescription ||
//       course.description?.[0]?.children?.[0]?.text ||
//       "",
//     keywords: seo.keywords?.join(","),
//     robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
//     openGraph: {
//       title: seo.metaTitle || course.title,
//       description: seo.metaDescription || course.shortDescription,
//       images: seo.ogImage
//         ? [
//             {
//               url: urlFor(seo.ogImage).width(1200).height(630).url(),
//             },
//           ]
//         : [],
//     },
//   };
// }