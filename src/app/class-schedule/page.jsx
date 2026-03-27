"use client"

import { useEffect, useState } from "react"
import { client } from "../../sanity/lib/client"
import { scheduleQuery } from "../../sanity/lib/queries"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"

export default function SchedulePage() {

  const [events, setEvents] = useState([])

  useEffect(() => {

    client.fetch(scheduleQuery).then(data => {

      const formatted = data.map(item => ({
        title: `${item.course} - ${item.instructor}`,
        start: item.start,
        end: item.end,
        backgroundColor: item.color || "#074166"
      }))

      setEvents(formatted)

    })

  }, [])

  return (

    <div className="bg-white min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-[#074166]">
          Class <span className="text-[#fdad1b]">Schedule</span>
        </h1>
        <p className="mt-4 text-gray-800">
          View upcoming classes and training sessions
        </p>
      </section>

      {/* CALENDAR */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"

            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}

            titleFormat={{ year: 'numeric', month: 'long' }}

            /* Add Tailwind classes for day numbers */
            dayCellClassNames={(arg) => {
              if (arg.isOther) return "text-gray-500"
              return "text-[#074166] font-semibold"
            }}

            dayCellContent={(arg) => {
              if (arg.isToday) {
                return (
                  <div className="bg-[#fdad1b]/20 rounded-lg w-full h-full flex justify-center items-center">
                    {arg.dayNumberText}
                  </div>
                )
              }
              return arg.dayNumberText
            }}

            eventClassNames={() => "rounded-xl text-white px-2 py-1 shadow-md"}
          />

        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* FullCalendar header styles */}
      <style global jsx>{`
        .fc .fc-toolbar-title {
          color: #074166 !important;
          font-weight: 700 !important;
          font-size: 1.875rem !important; /* text-3xl */
        }
        .fc .fc-button {
          background-color: #074166 !important;
          color: white !important;
          font-weight: 500 !important;
          padding: 0.25rem 0.75rem !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
        }
        .fc .fc-button:hover {
          background-color: #fdad1b !important;
          color: #074166 !important;
        }
      `}</style>

    </div>
  )
}












// "use client"

// import { useEffect, useState } from "react"
// import { client } from "../../sanity/lib/client"
// import { scheduleQuery } from "../../sanity/lib/queries"

// import FullCalendar from "@fullcalendar/react"
// import dayGridPlugin from "@fullcalendar/daygrid"
// import timeGridPlugin from "@fullcalendar/timegrid"
// import interactionPlugin from "@fullcalendar/interaction"

// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"
// import WhatsAppButton from "../components/WhatsAppButton"

// export default function SchedulePage() {

//   const [events, setEvents] = useState([])

//   useEffect(() => {

//     client.fetch(scheduleQuery).then(data => {

//       const formatted = data.map(item => ({
//         title: `${item.course} - ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: item.color || "#074166"
//       }))

//       setEvents(formatted)

//     })

//   }, [])

//   return (

//     <div className="bg-white min-h-screen">

//       <Navbar />

//       {/* HERO */}
//       <section className="pt-32 pb-20 bg-gray-100 text-center">
//         <h1 className="text-5xl font-bold text-[#074166]">
//           Class <span className="text-[#fdad1b]">Schedule</span>
//         </h1>
//         <p className="mt-4 text-gray-800">
//           View upcoming classes and training sessions
//         </p>
//       </section>

//       {/* CALENDAR */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             height="auto"

//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}

//             titleFormat={{ year: 'numeric', month: 'long' }}

//             /* Day numbers styling */
//             dayCellClassNames={(arg) => {
//               if (arg.isOther) return "text-gray-500"
//               return "text-[#074166] font-semibold"
//             }}

//             dayCellContent={(arg) => {
//               if (arg.isToday) {
//                 return (
//                   <div className="bg-[#fdad1b]/20 rounded-lg w-full h-full flex justify-center items-center">
//                     {arg.dayNumberText}
//                   </div>
//                 )
//               }
//               return arg.dayNumberText
//             }}

//             /* Event styling */
//             eventClassNames={() => "rounded-xl text-white px-2 py-1 shadow-md"}
//             eventBackgroundColor="#074166"
//             eventBorderColor="#074166"
//           />

//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* Inline CSS for header buttons & title */}
//       <style jsx>{`
//         .fc .fc-toolbar-title {
//           color: #074166 !important;
//           font-weight: 700;
//           font-size: 1.875rem; /* text-3xl */
//         }
//         .fc .fc-button {
//           background-color: #074166;
//           color: white;
//           font-weight: 500;
//           padding: 0.25rem 0.75rem;
//           border-radius: 0.5rem;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.2);
//         }
//         .fc .fc-button:hover {
//           background-color: #fdad1b;
//           color: #074166;
//         }
//       `}</style>

//     </div>
//   )
// }








// // "use client"

// import { useEffect, useState } from "react"
// import { client } from "../../sanity/lib/client"
// import { scheduleQuery } from "../../sanity/lib/queries"

// import FullCalendar from "@fullcalendar/react"
// import dayGridPlugin from "@fullcalendar/daygrid"
// import timeGridPlugin from "@fullcalendar/timegrid"
// import interactionPlugin from "@fullcalendar/interaction"

// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"
// import WhatsAppButton from "../components/WhatsAppButton"

// export default function SchedulePage(){

//   const [events,setEvents] = useState([])

//   useEffect(()=>{

//     client.fetch(scheduleQuery).then(data => {

//       const formatted = data.map(item => ({
//         title: `${item.course} - ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: item.color || "#074166"
//       }))

//       setEvents(formatted)

//     })

//   },[])

//   return(

//     <div className="bg-white">

//       <Navbar/>

//       {/* HERO */}

//       <section className="pt-32 pb-20 bg-gray-100 text-center">

//         <h1 className="text-5xl font-bold text-[#074166]">

//           Class <span className="text-[#fdad1b]">Schedule</span>

//         </h1>

//         <p className="mt-4 text-gray-800">
//           View upcoming classes and training sessions
//         </p>

//       </section>

//       {/* CALENDAR */}

//       <section className="py-20 px-6">

//         <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl text-shadow-blue-950 shadow-lg">

//           <FullCalendar
//             plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             height="auto"
//           />

//         </div>

//       </section>

//       <Footer/>
//       <WhatsAppButton/>

//     </div>

//   )
// }



// "use client"

// import { useEffect, useState } from "react"
// import { client } from "../../sanity/lib/client"
// import { scheduleQuery } from "../../sanity/lib/queries"

// import FullCalendar from "@fullcalendar/react"
// import dayGridPlugin from "@fullcalendar/daygrid"
// import timeGridPlugin from "@fullcalendar/timegrid"
// import interactionPlugin from "@fullcalendar/interaction"

// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"
// import WhatsAppButton from "../components/WhatsAppButton"

// export default function SchedulePage(){

//   const [events,setEvents] = useState([])

//   useEffect(()=>{

//     client.fetch(scheduleQuery).then(data => {

//       const formatted = data.map(item => ({
//         title: `${item.course} - ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: item.color || "#074166"
//       }))

//       setEvents(formatted)

//     })

//   },[])

//   return(

//     <div className="bg-white">

//       <Navbar/>

//       {/* HERO */}

//       <section className="pt-32 pb-20 bg-gray-100 text-center">

//         <h1 className="text-5xl font-bold text-[#074166]">
//           Class <span className="text-[#fdad1b]">Schedule</span>
//         </h1>

//         <p className="mt-4 text-gray-800">
//           View upcoming classes and training sessions
//         </p>

//       </section>

//       {/* CALENDAR */}

//       <section className="py-20 px-6">

//         <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

//           <FullCalendar
//             plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             height="auto"
            
//             /* ---------------- Inline styling fixes ---------------- */
//             dayCellClassNames={(arg) => {
//               // Inactive days (other month)
//               if(arg.isOther) return "text-gray-500"
//               return "text-[#074166] font-semibold"
//             }}
            
//             dayCellContent={(arg) => {
//               // Add rounded bg for today
//               if(arg.isToday){
//                 return (
//                   <div className="bg-[#fdad1b]/50 rounded-lg w-full h-full flex justify-center items-center">
//                     {arg.dayNumberText}
//                   </div>
//                 )
//               }
//               return arg.dayNumberText
//             }}

//             eventClassNames={() => "rounded-xl text-white px-2 py-1 shadow-md"}
//           />

//         </div>

//       </section>

//       <Footer/>
//       <WhatsAppButton/>

//     </div>

//   )
// }