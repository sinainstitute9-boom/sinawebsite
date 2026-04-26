// "use client"

// import { useEffect, useState } from "react"
// import { client } from "../../sanity/lib/client"
// import { seminarsQuery, upcomingSeminarsQuery } from "../../sanity/lib/queries"
// import { urlFor } from "../../sanity/lib/image"
// import Link from "next/link"
// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"

// export default function SeminarsPage(){

//   const [seminars,setSeminars] = useState([])
//   const [upcoming,setUpcoming] = useState([])

//   useEffect(()=>{

//     client.fetch(seminarsQuery).then(setSeminars)
//     client.fetch(upcomingSeminarsQuery).then(setUpcoming)

//   },[])

//   return(

//     <div className="bg-white">

//       <Navbar/>

//       {/* ANNOUNCEMENT MARQUEE */}

//       {upcoming.length > 0 && (

//         <div className="bg-[#fdad1b] text-[#074166] py-3 font-semibold flex items-center justify-center h-8">

//           <marquee>

//             {upcoming.map(item => (
//               `Upcoming Seminar: ${item.title} | `
//             ))}

//           </marquee>

//         </div>

//       )}

//       {/* HERO */}

//       <section className="pt-32 pb-20 bg-[#074166] text-white text-center">

//         <h1 className="text-5xl font-bold">

//           Seminars & <span className="text-[#fdad1b]">Events</span>

//         </h1>

//         <p className="mt-6 opacity-90">
//           Explore our seminars, guest lectures and knowledge sessions
//         </p>

//       </section>


//       {/* SEMINAR GRID */}

//       <section className="py-24 px-6">

//         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

//           {seminars.map(item=>(

//             <div
//               key={item._id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:border-[#fdad1b]"
//             >

//               <img
//                 src={
//                   item.coverImage
//                     ? urlFor(item.coverImage).width(600).height(400).url()
//                     : "/placeholder.jpg"
//                 }
//                 className="w-full h-60 object-cover"
//               />

//               <div className="p-6 text-center">

//                 <h3 className="text-xl font-bold text-[#074166]">
//                   {item.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-1">
//                   {item.speaker}
//                 </p>

//                 <p className="text-[#fdad1b] text-sm">
//                   {item.date}
//                 </p>

//                 {item.slug?.current && (

//                   <Link href={`/seminar/${item.slug.current}`}>

//                     <button className="mt-4 bg-[#fdad1b] text-[#074166] px-6 py-2 rounded-full font-semibold">

//                       View Seminar

//                     </button>

//                   </Link>

//                 )}

//               </div>

//             </div>

//           ))}

//         </div>

//       </section>

//       <Footer/>

//     </div>
//   )
// }


// "use client"

// import { useEffect, useState, useRef } from "react"
// import { client } from "../../sanity/lib/client"
// import { scheduleQuery } from "../../sanity/lib/queries"
// import Link from "next/link"

// import FullCalendar from "@fullcalendar/react"
// import dayGridPlugin from "@fullcalendar/daygrid"
// import timeGridPlugin from "@fullcalendar/timegrid"
// import interactionPlugin from "@fullcalendar/interaction"

// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"
// import WhatsAppButton from "../components/WhatsAppButton"

// const EVENT_COLORS = ["#074166","#fdad1b","#0e7fc1","#e05c1a","#1a9e6e","#9333ea"]

// export default function SchedulePage() {
//   const [events, setEvents] = useState([])
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [activeView, setActiveView] = useState("dayGridMonth")
//   const [calTitle, setCalTitle] = useState("")
//   const [toasts, setToasts] = useState([])
//   const [permission, setPermission] = useState("default")
//   const [alertsEnabled, setAlertsEnabled] = useState(false)
//   const calendarRef = useRef(null)
//   const notifiedRef = useRef(new Set())

//   const showToast = (msg, color = "#074166") => {
//     const id = Date.now() + Math.random()
//     setToasts((p) => [...p, { id, msg, color }])
//     setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000)
//   }

//   useEffect(() => {
//     if ("Notification" in window) {
//       const perm = Notification.permission
//       setPermission(perm)
//       if (perm === "granted") setAlertsEnabled(true)
//     }
//   }, [])

//   const handleAlertToggle = async () => {
//     if (alertsEnabled) {
//       setAlertsEnabled(false)
//       showToast("Event alerts turned OFF", "#e05c1a")
//       return
//     }
//     if (!("Notification" in window)) {
//       showToast("Browser does not support notifications", "#e05c1a")
//       return
//     }
//     const result = await Notification.requestPermission()
//     setPermission(result)
//     if (result === "granted") {
//       setAlertsEnabled(true)
//       showToast("Event alerts are now ON — you will be notified 30 min before events", "#1a9e6e")
//     } else {
//       showToast("Permission denied — enable from browser settings", "#e05c1a")
//     }
//   }

//   // 30-min alert check
//   useEffect(() => {
//     if (!alertsEnabled || permission !== "granted" || events.length === 0) return
//     const interval = setInterval(() => {
//       const now = new Date()
//       events.forEach((ev) => {
//         const start = new Date(ev.start)
//         const diffMin = (start - now) / 60000
//         const key = ev.id
//         if (diffMin > 0 && diffMin <= 30 && !notifiedRef.current.has(key)) {
//           notifiedRef.current.add(key)
//           try {
//             new Notification(`Starting Soon: ${ev.title}`, {
//               body: `Begins in ${Math.round(diffMin)} min${ev.extendedProps?.room ? ` · Room ${ev.extendedProps.room}` : ""}`,
//               icon: "/favicon.ico",
//             })
//           } catch {}
//           showToast(`"${ev.title}" starts in ${Math.round(diffMin)} min!`, "#074166")
//         }
//       })
//     }, 60000)
//     return () => clearInterval(interval)
//   }, [alertsEnabled, permission, events])

//   useEffect(() => {
//     client.fetch(scheduleQuery).then((data) => {
//       const now = new Date()
//       const formatted = data.map((item, i) => ({
//         id: item._id || String(i),
//         title: item.title || `${item.course} — ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
//         borderColor: "transparent",
//         textColor: "#ffffff",
//         extendedProps: {
//           slug: item.slug?.current,
//           room: item.room,
//           instructor: item.instructor,
//           course: item.course,
//         },
//       }))
//       setEvents(formatted)

//       const upcoming = data
//         .filter((item) => new Date(item.start) >= now)
//         .sort((a, b) => new Date(a.start) - new Date(b.start))
//         .slice(0, 6)
//         .map((item, i) => ({ ...item, color: EVENT_COLORS[i % EVENT_COLORS.length] }))
//       setUpcomingEvents(upcoming)
//     })
//   }, [])

//   const updateTitle = () => {
//     if (calendarRef.current) setCalTitle(calendarRef.current.getApi().view.title)
//   }

//   useEffect(() => {
//     const t = setTimeout(updateTitle, 150)
//     return () => clearTimeout(t)
//   }, [])

//   const calNav = (action) => {
//     const api = calendarRef.current?.getApi()
//     if (!api) return
//     if (action === "prev") api.prev()
//     else if (action === "next") api.next()
//     else api.today()
//     setTimeout(updateTitle, 50)
//   }

//   const switchView = (view) => {
//     setActiveView(view)
//     calendarRef.current?.getApi().changeView(view)
//     setTimeout(updateTitle, 50)
//   }

//   return (
//     <div className="bg-[#f5f7fa] min-h-screen">
//       <Navbar />

//       {/* HERO */}
//       <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
//         <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-10 left-10 w-72 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-[0.2em] uppercase border border-[#fdad1b]/30">
//             Events & Sessions
//           </span>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-2">
//             Upcoming <span className="text-[#fdad1b]">Events</span>
//           </h1>
//           <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
//             Browse all scheduled classes, workshops, and training sessions in one place.
//           </p>

//           {/* ALERT TOGGLE BUTTON */}
//           <div className="mt-8 flex flex-col items-center gap-3">
//             <button
//               onClick={handleAlertToggle}
//               className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-lg
//                 ${alertsEnabled
//                   ? "bg-[#1a9e6e] text-white hover:bg-red-500"
//                   : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:scale-105"
//                 }`}
//             >
//               {/* Bell Icon */}
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 {alertsEnabled ? (
//                   <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
//                 ) : (
//                   <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zM3.71 2.29L2.29 3.71 5.64 7.06C5.23 8.3 5 9.64 5 11v5l-2 2v1h14.17l1.12 1.12 1.41-1.41L3.71 2.29z"/>
//                 )}
//               </svg>
//               {alertsEnabled ? "Alerts ON — Click to Turn OFF" : "Enable Event Alerts"}
//             </button>

//             {/* HOW IT WORKS */}
//             <p className="text-blue-200/70 text-xs max-w-sm">
//               {alertsEnabled
//                 ? "You will receive a browser notification 30 minutes before each event starts"
//                 : "Turn on alerts to get browser notifications 30 minutes before events"
//               }
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* UPCOMING STRIP */}
//       {upcomingEvents.length > 0 ? (
//         <section className="py-10 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-1 h-6 rounded-full bg-[#fdad1b]" />
//               <h2 className="text-lg font-extrabold text-[#074166]">Next Up</h2>
//             </div>
//             <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
//               {upcomingEvents.map((ev, i) => (
//                 <div
//                   key={i}
//                   className="min-w-[200px] flex-shrink-0 rounded-2xl p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
//                   style={{ backgroundColor: ev.color }}
//                 >
//                   <p className="text-[10px] uppercase tracking-[0.15em] text-white/80 mb-2 font-bold">
//                     {new Date(ev.start).toLocaleDateString("en-US", {
//                       weekday: "short", month: "short", day: "numeric",
//                     })}
//                   </p>
//                   <p className="font-bold text-sm leading-snug text-white line-clamp-2">
//                     {ev.title || ev.course}
//                   </p>
//                   {ev.instructor && <p className="mt-2 text-[11px] text-white/80">Instructor: {ev.instructor}</p>}
//                   {ev.room && <p className="text-[11px] text-white/80">Room: {ev.room}</p>}
//                   <p className="mt-2 text-[10px] text-white/70">
//                     {new Date(ev.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       ) : (
//         <section className="py-10 px-6 bg-white border-b border-gray-100">
//           <div className="max-w-7xl mx-auto text-center text-gray-400 py-6">
//             No upcoming events scheduled yet. Check back soon!
//           </div>
//         </section>
//       )}

//       {/* CALENDAR */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

//           {/* Toolbar */}
//           <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">
//             <div className="flex items-center gap-2">
//               <button onClick={() => calNav("prev")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow">
//                 ‹
//               </button>
//               <button onClick={() => calNav("next")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow">
//                 ›
//               </button>
//               <button onClick={() => calNav("today")}
//                 className="h-10 px-5 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm hover:bg-[#074166] hover:text-white transition-all">
//                 Today
//               </button>
//             </div>

//             <h2 className="text-xl md:text-2xl font-extrabold text-[#074166] order-first w-full text-center md:order-none md:w-auto">
//               {calTitle}
//             </h2>

//             <div className="flex items-center bg-[#f0f4f8] rounded-xl p-1 gap-1">
//               {[
//                 { key: "dayGridMonth", label: "Month" },
//                 { key: "timeGridWeek", label: "Week" },
//                 { key: "timeGridDay", label: "Day" },
//               ].map(({ key, label }) => (
//                 <button key={key} onClick={() => switchView(key)}
//                   className={`px-5 h-9 rounded-lg text-sm font-bold transition-all
//                     ${activeView === key ? "bg-[#074166] text-white shadow-md" : "text-gray-500 hover:text-[#074166] hover:bg-white"}`}>
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="px-6 pb-8 pt-2">
//             <FullCalendar
//               ref={calendarRef}
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               events={events}
//               height="auto"
//               headerToolbar={false}
//               eventClick={(info) => {
//                 const slug = info.event.extendedProps?.slug
//                 if (slug) window.location.href = `/class-schedule/${slug}`
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* Toasts */}
//       <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
//         {toasts.map((t) => (
//           <div key={t.id}
//             className="flex items-center gap-3 text-white px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold max-w-[320px]"
//             style={{ backgroundColor: t.color }}>
//             <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
//             </svg>
//             {t.msg}
//           </div>
//         ))}
//       </div>

//       <style global jsx>{`
//         .fc .fc-daygrid-day.fc-day-today { background-color: #fff8e7 !important; }
//         .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
//           background: #fdad1b !important; color: #074166 !important;
//           font-weight: 800 !important; border-radius: 50% !important;
//           width: 30px !important; height: 30px !important;
//           display: inline-flex !important; align-items: center !important;
//           justify-content: center !important; margin: 4px !important;
//         }
//         .fc .fc-col-header-cell { padding: 10px 0 !important; background: #f8fafc !important; }
//         .fc .fc-col-header-cell-cushion {
//           color: #074166 !important; font-weight: 800 !important;
//           font-size: 0.72rem !important; letter-spacing: 0.1em !important;
//           text-transform: uppercase !important; text-decoration: none !important;
//         }
//         .fc .fc-daygrid-day-number {
//           color: #4b5563 !important; font-weight: 500 !important;
//           font-size: 0.85rem !important; padding: 6px 10px !important;
//           text-decoration: none !important;
//         }
//         .fc .fc-day-other .fc-daygrid-day-number { opacity: 0.3 !important; }
//         .fc-event {
//           border: none !important; border-radius: 7px !important;
//           padding: 3px 8px !important; margin-bottom: 2px !important;
//           font-size: 0.75rem !important; font-weight: 600 !important;
//           cursor: pointer !important;
//         }
//         .fc-event:hover { opacity: 0.85 !important; transform: scale(1.02) !important; }
//         .fc-event-title { color: white !important; }
//         .fc-daygrid-event-dot { display: none !important; }
//         .fc .fc-scrollgrid { border: none !important; }
//         .fc td, .fc th { border-color: #f0f0f0 !important; }
//         .fc .fc-timegrid-slot-label-cushion {
//           color: #9ca3af !important; font-size: 0.72rem !important; font-weight: 600 !important;
//         }
//       `}</style>
//     </div>
//   )
// }




"use client"

import { useEffect, useState, useRef } from "react"
import { client } from "../../sanity/lib/client"
import { scheduleQuery } from "../../sanity/lib/queries"
import Link from "next/link"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"

const EVENT_COLORS = ["#074166","#fdad1b","#0e7fc1","#e05c1a","#1a9e6e","#9333ea"]

export default function SchedulePage() {
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [activeView, setActiveView] = useState("dayGridMonth")
  const [calTitle, setCalTitle] = useState("")
  const [toasts, setToasts] = useState([])
  const [permission, setPermission] = useState("default")
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const calendarRef = useRef(null)
  const notifiedRef = useRef(new Set())

  const showToast = (msg, color = "#074166") => {
    const id = Date.now() + Math.random()
    setToasts((p) => [...p, { id, msg, color }])
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000)
  }

  useEffect(() => {
    if ("Notification" in window) {
      const perm = Notification.permission
      setPermission(perm)
      if (perm === "granted") setAlertsEnabled(true)
    }
  }, [])

  const handleAlertToggle = async () => {
    if (alertsEnabled) {
      setAlertsEnabled(false)
      showToast("Event alerts turned OFF", "#e05c1a")
      return
    }
    if (!("Notification" in window)) {
      showToast("Browser does not support notifications", "#e05c1a")
      return
    }
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === "granted") {
      setAlertsEnabled(true)
      showToast("Event alerts are now ON — you will be notified 30 min before events", "#1a9e6e")
    } else {
      showToast("Permission denied — enable from browser settings", "#e05c1a")
    }
  }

  // 30-min alert check
  useEffect(() => {
    if (!alertsEnabled || permission !== "granted" || events.length === 0) return
    const interval = setInterval(() => {
      const now = new Date()
      events.forEach((ev) => {
        const start = new Date(ev.start)
        const diffMin = (start - now) / 60000
        const key = ev.id
        if (diffMin > 0 && diffMin <= 30 && !notifiedRef.current.has(key)) {
          notifiedRef.current.add(key)
          try {
            new Notification(`Starting Soon: ${ev.title}`, {
              body: `Begins in ${Math.round(diffMin)} min${ev.extendedProps?.room ? ` · Room ${ev.extendedProps.room}` : ""}`,
              icon: "/favicon.ico",
            })
          } catch {}
          showToast(`"${ev.title}" starts in ${Math.round(diffMin)} min!`, "#074166")
        }
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [alertsEnabled, permission, events])

  useEffect(() => {
    client.fetch(scheduleQuery).then((data) => {
      const now = new Date()
      const formatted = data.map((item, i) => ({
        id: item._id || String(i),
        title: item.title || `${item.course} — ${item.instructor}`,
        start: item.start,
        end: item.end,
        backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
        borderColor: "transparent",
        textColor: "#ffffff",
        extendedProps: {
          slug: item.slug?.current,
          room: item.room,
          instructor: item.instructor,
          course: item.course,
        },
      }))
      setEvents(formatted)

      const upcoming = data
        .filter((item) => new Date(item.start) >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 6)
        .map((item, i) => ({ ...item, color: EVENT_COLORS[i % EVENT_COLORS.length] }))
      setUpcomingEvents(upcoming)
    })
  }, [])

  const updateTitle = () => {
    if (calendarRef.current) setCalTitle(calendarRef.current.getApi().view.title)
  }

  useEffect(() => {
    const t = setTimeout(updateTitle, 150)
    return () => clearTimeout(t)
  }, [])

  const calNav = (action) => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    if (action === "prev") api.prev()
    else if (action === "next") api.next()
    else api.today()
    setTimeout(updateTitle, 50)
  }

  const switchView = (view) => {
    setActiveView(view)
    calendarRef.current?.getApi().changeView(view)
    setTimeout(updateTitle, 50)
  }

  return (
    <div className="bg-[#f5f7fa] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-[0.2em] uppercase border border-[#fdad1b]/30">
            Events & Sessions
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-2">
            Upcoming <span className="text-[#fdad1b]">Events</span>
          </h1>
          <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Browse all scheduled classes, workshops, and training sessions in one place.
          </p>

          {/* ALERT TOGGLE BUTTON */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={handleAlertToggle}
              className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-lg
                ${alertsEnabled
                  ? "bg-[#1a9e6e] text-white hover:bg-red-500"
                  : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:scale-105"
                }`}
            >
              {/* Bell Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {alertsEnabled ? (
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                ) : (
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zM3.71 2.29L2.29 3.71 5.64 7.06C5.23 8.3 5 9.64 5 11v5l-2 2v1h14.17l1.12 1.12 1.41-1.41L3.71 2.29z"/>
                )}
              </svg>
              {alertsEnabled ? "Alerts ON — Click to Turn OFF" : "Enable Event Alerts"}
            </button>

            {/* HOW IT WORKS */}
            <p className="text-blue-200/70 text-xs max-w-sm">
              {alertsEnabled
                ? "You will receive a browser notification 30 minutes before each event starts"
                : "Turn on alerts to get browser notifications 30 minutes before events"
              }
            </p>
          </div>
        </div>
      </section>

      {/* UPCOMING STRIP */}
      {upcomingEvents.length > 0 ? (
        <section className="py-10 px-6 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-[#fdad1b]" />
              <h2 className="text-lg font-extrabold text-[#074166]">Next Up</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {upcomingEvents.map((ev, i) => (
                <div
                  key={i}
                  className="min-w-[200px] flex-shrink-0 rounded-2xl p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: ev.color }}
                >
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/80 mb-2 font-bold">
                    {new Date(ev.start).toLocaleDateString("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                    })}
                  </p>
                  <p className="font-bold text-sm leading-snug text-white line-clamp-2">
                    {ev.title || ev.course}
                  </p>
                  {ev.instructor && <p className="mt-2 text-[11px] text-white/80">Instructor: {ev.instructor}</p>}
                  {ev.room && <p className="text-[11px] text-white/80">Room: {ev.room}</p>}
                  <p className="mt-2 text-[10px] text-white/70">
                    {new Date(ev.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10 px-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto text-center text-gray-400 py-6">
            No upcoming events scheduled yet. Check back soon!
          </div>
        </section>
      )}

      {/* CALENDAR */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button onClick={() => calNav("prev")}
                className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow">
                ‹
              </button>
              <button onClick={() => calNav("next")}
                className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow">
                ›
              </button>
              <button onClick={() => calNav("today")}
                className="h-10 px-5 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm hover:bg-[#074166] hover:text-white transition-all">
                Today
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-[#074166] order-first w-full text-center md:order-none md:w-auto">
              {calTitle}
            </h2>

            <div className="flex items-center bg-[#f0f4f8] rounded-xl p-1 gap-1">
              {[
                { key: "dayGridMonth", label: "Month" },
                { key: "timeGridWeek", label: "Week" },
                { key: "timeGridDay", label: "Day" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => switchView(key)}
                  className={`px-5 h-9 rounded-lg text-sm font-bold transition-all
                    ${activeView === key ? "bg-[#074166] text-white shadow-md" : "text-gray-500 hover:text-[#074166] hover:bg-white"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pb-8 pt-2">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="auto"
              headerToolbar={false}
              eventClick={(info) => {
                const slug = info.event.extendedProps?.slug
                if (slug) window.location.href = `/class-schedule/${slug}`
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id}
            className="flex items-center gap-3 text-white px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold max-w-[320px]"
            style={{ backgroundColor: t.color }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            {t.msg}
          </div>
        ))}
      </div>

      <style global jsx>{`
        .fc .fc-daygrid-day.fc-day-today { background-color: #fff8e7 !important; }
        .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          background: #fdad1b !important; color: #074166 !important;
          font-weight: 800 !important; border-radius: 50% !important;
          width: 30px !important; height: 30px !important;
          display: inline-flex !important; align-items: center !important;
          justify-content: center !important; margin: 4px !important;
        }
        .fc .fc-col-header-cell { padding: 10px 0 !important; background: #f8fafc !important; }
        .fc .fc-col-header-cell-cushion {
          color: #074166 !important; font-weight: 800 !important;
          font-size: 0.72rem !important; letter-spacing: 0.1em !important;
          text-transform: uppercase !important; text-decoration: none !important;
        }
        .fc .fc-daygrid-day-number {
          color: #4b5563 !important; font-weight: 500 !important;
          font-size: 0.85rem !important; padding: 6px 10px !important;
          text-decoration: none !important;
        }
        .fc .fc-day-other .fc-daygrid-day-number { opacity: 0.3 !important; }
        .fc-event {
          border: none !important; border-radius: 7px !important;
          padding: 3px 8px !important; margin-bottom: 2px !important;
          font-size: 0.75rem !important; font-weight: 600 !important;
          cursor: pointer !important;
        }
        .fc-event:hover { opacity: 0.85 !important; transform: scale(1.02) !important; }
        .fc-event-title { color: white !important; }
        .fc-daygrid-event-dot { display: none !important; }
        .fc .fc-scrollgrid { border: none !important; }
        .fc td, .fc th { border-color: #f0f0f0 !important; }
        .fc .fc-timegrid-slot-label-cushion {
          color: #9ca3af !important; font-size: 0.72rem !important; font-weight: 600 !important;
        }
      `}</style>
    </div>
  )
}
