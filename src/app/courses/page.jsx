// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsAppButton";



// const courses = [
//   {
//     title: "Frontend Development",
//     image: "/courses/FD.png",
//     desc: "Learn HTML, CSS, JavaScript, React and modern UI development.",
//     link: "/courses/frontenddevelopment",
//   },
//   {
//     title: "Backend Development",
//     image: "/courses/BD.png",
//     desc: "Master Node.js, APIs, databases and server side programming.",
//     link: "/courses/backenddevelopment",
//   },
//   {
//     title: "Web Development",
//     image: "/courses/WD.png",
//     desc: "Complete full stack development from frontend to backend.",
//     link: "/courses/webdevelopment",
//   },
//   {
//     title: "Artificial Intelligence",
//     image: "/courses/AI.png",
//     desc: "Build intelligent systems using machine learning and AI.",
//     link: "/courses/artificialintelligence",
//   },
//   {
//     title: "Machine Learning",
//     image: "/courses/ML.png",
//     desc: "Learn data models, prediction systems and ML algorithms.",
//     link: "/courses/machinelearning",
//   },
//   {
//     title: "Frontend Development",
//     image: "/courses/FD.png",
//     desc: "Learn HTML, CSS, JavaScript, React and modern UI development.",
//     link: "/courses/frontenddevelopment",
//   },
//   {
//     title: "Backend Development",
//     image: "/courses/BD.png",
//     desc: "Master Node.js, APIs, databases and server side programming.",
//     link: "/courses/backenddevelopment",
//   },
//   {
//     title: "Web Development",
//     image: "/courses/WD.png",
//     desc: "Complete full stack development from frontend to backend.",
//     link: "/courses/webdevelopment",
//   },
//   {
//     title: "Artificial Intelligence",
//     image: "/courses/AI.png",
//     desc: "Build intelligent systems using machine learning and AI.",
//     link: "/courses/artificialintelligence",
//   },
//   {
//     title: "Machine Learning",
//     image: "/courses/ML.png",
//     desc: "Learn data models, prediction systems and ML algorithms.",
//     link: "/courses/machinelearning",
//   },
//   {
//     title: "Frontend Development",
//     image: "/courses/FD.png",
//     desc: "Learn HTML, CSS, JavaScript, React and modern UI development.",
//     link: "/courses/frontenddevelopment",
//   },
//   {
//     title: "Backend Development",
//     image: "/courses/BD.png",
//     desc: "Master Node.js, APIs, databases and server side programming.",
//     link: "/courses/backenddevelopment",
//   },
//   {
//     title: "Web Development",
//     image: "/courses/WD.png",
//     desc: "Complete full stack development from frontend to backend.",
//     link: "/courses/webdevelopment",
//   },
//   {
//     title: "Artificial Intelligence",
//     image: "/courses/AI.png",
//     desc: "Build intelligent systems using machine learning and AI.",
//     link: "/courses/artificialintelligence",
//   },
//   {
//     title: "Machine Learning",
//     image: "/courses/ML.png",
//     desc: "Learn data models, prediction systems and ML algorithms.",
//     link: "/courses/machinelearning",
//   },
//   {
//     title: "Frontend Development",
//     image: "/courses/FD.png",
//     desc: "Learn HTML, CSS, JavaScript, React and modern UI development.",
//     link: "/courses/frontenddevelopment",
//   },
//   {
//     title: "Backend Development",
//     image: "/courses/BD.png",
//     desc: "Master Node.js, APIs, databases and server side programming.",
//     link: "/courses/backenddevelopment",
//   },
//   {
//     title: "Web Development",
//     image: "/courses/WD.png",
//     desc: "Complete full stack development from frontend to backend.",
//     link: "/courses/webdevelopment",
//   },
//   {
//     title: "Artificial Intelligence",
//     image: "/courses/AI.png",
//     desc: "Build intelligent systems using machine learning and AI.",
//     link: "/courses/artificialintelligence",
//   },
//   {
//     title: "Machine Learning",
//     image: "/courses/ML.png",
//     desc: "Learn data models, prediction systems and ML algorithms.",
//     link: "/courses/machinelearning",
//   },
//   {
//     title: "Frontend Development",
//     image: "/courses/FD.png",
//     desc: "Learn HTML, CSS, JavaScript, React and modern UI development.",
//     link: "/courses/frontenddevelopment",
//   },
 
// ];


// export default function CoursesPage() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
// <Navbar />
//       {/* HERO */}
//       <section className="bg-[#074166] text-white py-16 text-center">
//         <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
//         <p className="text-lg opacity-90">
//           Explore professional courses designed for modern careers
//         </p>
//       </section>

//       {/* COURSES GRID */}
//       <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

//         {courses.map((course, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-lg overflow-hidden 
//             transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
//           >
//             {/* IMAGE */}
//             <div className="relative h-52 w-full">
//               <Image
//                 src={course.image}
//                 alt={course.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-[#074166] mb-2">
//                 {course.title}
//               </h2>

//               <p className="text-gray-600 text-sm mb-4">
//                 {course.desc}
//               </p>

//               {/* BUTTON */}
//               <Link href={course.link}>
//                 <button className="bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
//                   View Course
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}

//       </section>
// <Footer />
// <WhatsAppButton />
//     </div>
    
//   );
// }





// import { client } from "../../sanity/lib/client";
// import { coursesQuery } from "../../sanity/lib/queries";
// import { urlFor } from "../../sanity/lib/image";
// import Link from "next/link";
// import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsAppButton";




// export default async function CoursePage({ params }) {
//   const course = await client.fetch(singleCourseQuery, {
//     slug: params.slug
//   });

//   console.log("Fetched course:", course);

//   return (
//     <div>
//       <h1>{course.title}</h1>
//       <p>{course.duration}</p>
//       <p>{course.lectures}</p>
//       <p>{course.level}</p>
//       <p>{course.language}</p>
//       <p>{course.price}</p>
//     </div>
//   );
// }
// export default async function CoursesPage() {

//   const courses = await client.fetch(coursesQuery);

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <Navbar />

//       {/* HERO */}
//     {/* / <section className="bg-[#074166] text-white py-16 text-center"> */}
//            <section className="text-center text-[#074166] mt-20">
//             <img
//           src="/images/courses.png"
//           alt="courses hero"
//           className="w-screen h-full object-contain opacity-90"></img>
      
//         <p className="text-lg opacity-90 mt-16
//           max-w-4xl mx-auto font-bold">
//           Explore professional courses designed for modern careers
//         </p>
//       </section>


//       {/* COURSES GRID */}
//       <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

//         {courses.filter((c)=>c.slug?.current).map((course)=> (

//           <div
//             key={course._id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden 
//             transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
//           >

//             {/* IMAGE */}
//             <div className="relative h-52 w-full">

//               <img
//                 src={
//                   course.thumbnail
//                     ? urlFor(course.thumbnail).width(800).height(400).url()
//                     : "/placeholder.jpg"
//                 }
//                 alt={course.title}
//                 className="w-full h-full object-contain"
//               />

//             </div>


//             {/* CONTENT */}
//             <div className="p-6">

//               <h2 className="text-xl font-semibold text-[#074166] mb-2">
//                 {course.title}
//               </h2>

//               <p className="text-gray-950 text-sm mb-4">
//                 {course.description}
//               </p>


//               {/* BUTTON */}
//               <Link href={`/courses/${course.slug?.current}`}>
//                 <button className="bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
//                   View Course
//                 </button>
//               </Link>

//             </div>

//           </div>

//         ))}

//       </section>

//       <Footer />
//       <WhatsAppButton />

//     </div>
//   );
// }

// 








"use client"
// 1. Humne sirf zaruri cheezin rakhi hain
import { client } from "../../sanity/lib/client"; 
import { coursesQuery, getActiveAnnouncementsQuery } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnnouncementBar from "../components/AnnouncementBar";
import { useState, useEffect } from "react";

export default function Home() {
  const [announcement, setAnnouncement] = useState(null)
  const [courses, setCourses] = useState([]) // 2. Courses ki state banayi

  useEffect(() => {
    // 3. Announcement fetch karo
    client.fetch(getActiveAnnouncementsQuery).then((data) => {
      setAnnouncement(data?.[0] || null)
    })

    // 4. Courses bhi fetch karo (Taake grid khali na rahe)
    client.fetch(coursesQuery).then((data) => {
      setCourses(data || [])
    })
  }, [])

  return (
    <div className="bg-white">
      <AnnouncementBar announcement={announcement} />
      <Navbar />

      {/* HERO */}
      <section className="text-center text-[#074166] mt-20">
        <img
          src="/images/courses.png"
          alt="courses hero"
          className="w-screen h-full object-contain opacity-90"
        />
        <p className="text-lg opacity-90 mt-16 max-w-4xl mx-auto font-bold">
          Explore professional courses designed for modern careers
        </p>
      </section>

      {/* COURSES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* 5. Ab courses show honge kyunki humne fetch kiye hain */}
        {courses.length > 0 ? (
          courses.filter((c) => c.slug?.current).map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative h-52 w-full">
                <img
                  src={
                    course.thumbnail
                      ? urlFor(course.thumbnail).width(800).height(400).url()
                      : "/placeholder.jpg"
                  }
                  alt={course.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#074166] mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-950 text-sm mb-4">{course.description}</p>

                <Link href={`/courses/${course.slug?.current}`}>
                  <button className="bg-[#fdad1b] text-[#074166] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">Loading courses...</p>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}