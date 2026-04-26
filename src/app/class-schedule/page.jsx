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

const EVENT_COLORS = [
  "#074166",
  "#fdad1b",
  "#0e7fc1",
  "#e05c1a",
  "#1a9e6e",
  "#9333ea",
]

export default function SchedulePage() {
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [activeView, setActiveView] = useState("dayGridMonth")
  const [calTitle, setCalTitle] = useState("")
  const [toasts, setToasts] = useState([])
  const [permission, setPermission] = useState("default")
  const calendarRef = useRef(null)
  const notifiedRef = useRef(new Set())

  // Toast helper
  const showToast = (msg, color = "#074166") => {
    const id = Date.now() + Math.random()
    setToasts((p) => [...p, { id, msg, color }])
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000)
  }

  // Notification permission
  const requestPermission = async () => {
    if (!("Notification" in window)) return showToast("❌ Browser does not support notifications", "#e05c1a")
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === "granted") showToast("🔔 Alerts enabled! You'll be notified 30 min before events.", "#1a9e6e")
    else showToast("❌ Permission denied.", "#e05c1a")
  }

  useEffect(() => {
    if ("Notification" in window) setPermission(Notification.permission)
  }, [])

  // 30-min alert check
  useEffect(() => {
    if (permission !== "granted" || events.length === 0) return
    const interval = setInterval(() => {
      const now = new Date()
      events.forEach((ev) => {
        const start = new Date(ev.start)
        const diffMin = (start - now) / 60000
        const key = ev.id
        if (diffMin > 0 && diffMin <= 30 && !notifiedRef.current.has(key)) {
          notifiedRef.current.add(key)
          try {
            new Notification(`📅 Starting Soon: ${ev.title}`, {
              body: `Begins in ${Math.round(diffMin)} min`,
              icon: "/favicon.ico",
            })
          } catch {}
          showToast(`🔔 "${ev.title}" starts in ${Math.round(diffMin)} min!`, "#074166")
        }
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [permission, events])

  // Fetch events
  useEffect(() => {
    client.fetch(scheduleQuery).then((data) => {
      const now = new Date()
      const formatted = data.map((item, i) => ({
        id: item.slug?.current || String(i),
        title: item.title || `${item.course} — ${item.instructor}`,
        start: item.start,
        end: item.end,
        backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
        borderColor: "transparent",
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
          <div className="mt-8 flex justify-center">
            <button
              onClick={requestPermission}
              disabled={permission === "granted"}
              className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-lg
                ${permission === "granted"
                  ? "bg-[#1a9e6e] text-white cursor-default"
                  : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:scale-105"
                }`}
            >
              <span className="text-xl">{permission === "granted" ? "🔔" : "🔕"}</span>
              {permission === "granted" ? "Event Alerts are ON" : "Enable Event Alerts"}
            </button>
          </div>
          {permission !== "granted" && (
            <p className="mt-3 text-blue-200/70 text-xs">
              Allow notifications → get an alert 30 minutes before every event
            </p>
          )}
        </div>
      </section>

      {/* UPCOMING STRIP */}
      {upcomingEvents.length > 0 && (
        <section className="py-10 px-6 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-[#fdad1b]" />
              <h2 className="text-lg font-extrabold text-[#074166]">Next Up</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {upcomingEvents.map((ev, i) => (
                <Link
                  key={i}
                  href={`/class-schedule/${ev.slug?.current || ""}`}
                  className="min-w-[200px] flex-shrink-0 rounded-2xl p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                  style={{ backgroundColor: ev.color }}
                >
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/80 mb-2 font-bold">
                    {new Date(ev.start).toLocaleDateString("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                    })}
                  </p>
                  <p className="font-bold text-sm leading-snug line-clamp-2 text-white">
                    {ev.title || ev.course}
                  </p>
                  {ev.instructor && <p className="mt-2 text-[11px] text-white/80">👤 {ev.instructor}</p>}
                  {ev.room && <p className="text-[11px] text-white/80">📍 {ev.room}</p>}
                  <p className="mt-3 text-[11px] font-bold text-white/90">View details →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALENDAR */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Custom Toolbar */}
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
            className="flex items-center gap-3 text-white px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold max-w-[300px]"
            style={{ backgroundColor: t.color }}>
            🔔 {t.msg}
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
          padding: 2px 7px !important; margin-bottom: 2px !important;
          font-size: 0.75rem !important; font-weight: 600 !important; cursor: pointer !important;
        }
        .fc-event:hover { opacity: 0.85 !important; transform: scale(1.02) !important; }
        .fc-event .fc-event-title { color: white !important; }
        .fc .fc-scrollgrid { border: none !important; }
        .fc td, .fc th { border-color: #f0f0f0 !important; }
        .fc .fc-timegrid-slot-label-cushion {
          color: #9ca3af !important; font-size: 0.72rem !important; font-weight: 600 !important;
        }
      `}</style>
    </div>
  )
}




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

// const EVENT_COLORS = [
//   "#074166",
//   "#fdad1b",
//   "#0e7fc1",
//   "#e05c1a",
//   "#1a9e6e",
//   "#9333ea",
// ]

// // ─── Toast Hook ─────────────────────────────────────────────────────────────
// function useToasts() {
//   const [toasts, setToasts] = useState([])
//   const show = (msg, color = "#074166") => {
//     const id = Date.now() + Math.random()
//     setToasts((p) => [...p, { id, msg, color, leaving: false }])
//     // start fade-out 400ms before removing
//     setTimeout(() => {
//       setToasts((p) => p.map((t) => t.id === id ? { ...t, leaving: true } : t))
//     }, 4600)
//     setTimeout(() => {
//       setToasts((p) => p.filter((t) => t.id !== id))
//     }, 5000)
//   }
//   return { toasts, show }
// }

// // ─── Notification Hook ───────────────────────────────────────────────────────
// function useNotifications(events, showToast) {
//   const [permission, setPermission] = useState("default")
//   const notifiedRef = useRef(new Set())

//   useEffect(() => {
//     if ("Notification" in window) setPermission(Notification.permission)
//   }, [])

//   const requestPermission = async () => {
//     if (!("Notification" in window)) {
//       showToast("❌ Your browser does not support notifications", "#e05c1a")
//       return
//     }
//     const result = await Notification.requestPermission()
//     setPermission(result)
//     if (result === "granted") {
//       showToast("🔔 Alerts enabled! You'll be notified 30 min before each event.", "#1a9e6e")
//     } else {
//       showToast("❌ Permission denied. Enable from browser settings.", "#e05c1a")
//     }
//   }

//   // Check every 60s — alert 30 min before event
//   useEffect(() => {
//     if (permission !== "granted" || events.length === 0) return
//     const interval = setInterval(() => {
//       const now = new Date()
//       events.forEach((ev) => {
//         const start = new Date(ev.start)
//         const diffMin = (start - now) / 60000
//         const key = ev.id
//         if (diffMin > 0 && diffMin <= 30 && !notifiedRef.current.has(key)) {
//           notifiedRef.current.add(key)
//           // System notification (shows even if tab is closed)
//           try {
//             new Notification(`📅 Starting Soon: ${ev.title}`, {
//               body: `Begins in ${Math.round(diffMin)} min${ev.extendedProps?.room ? ` · Room ${ev.extendedProps.room}` : ""}`,
//               icon: "/favicon.ico",
//             })
//           } catch {}
//           // In-app toast
//           showToast(`🔔 "${ev.title}" starts in ${Math.round(diffMin)} min!`, "#074166")
//         }
//       })
//     }, 60000)
//     return () => clearInterval(interval)
//   }, [permission, events])

//   return { permission, requestPermission }
// }

// // ─── Main Page ───────────────────────────────────────────────────────────────
// export default function SchedulePage() {
//   const [events, setEvents] = useState([])
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [activeView, setActiveView] = useState("dayGridMonth")
//   const [calTitle, setCalTitle] = useState("")
//   const calendarRef = useRef(null)

//   const { toasts, show: showToast } = useToasts()
//   const { permission, requestPermission } = useNotifications(events, showToast)

//   useEffect(() => {
//     client.fetch(scheduleQuery).then((data) => {
//       const now = new Date()

//       const formatted = data.map((item, i) => ({
//         id: item.slug?.current || String(i),
//         title: item.title || `${item.course} — ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
//         borderColor: "transparent",
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
//     if (calendarRef.current) {
//       setCalTitle(calendarRef.current.getApi().view.title)
//     }
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

//       {/* ─── HERO ─── */}
//       <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
//         <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-10 left-10 w-72 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-[0.2em] uppercase border border-[#fdad1b]/30">
//             Events &amp; Sessions
//           </span>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-2">
//             Upcoming <span className="text-[#fdad1b]">Events</span>
//           </h1>
//           <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
//             Browse all scheduled classes, workshops, and training sessions in one place.
//           </p>

//           {/* Notification Button */}
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={requestPermission}
//               disabled={permission === "granted"}
//               className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-sm
//                 transition-all duration-200 shadow-lg
//                 ${permission === "granted"
//                   ? "bg-[#1a9e6e] text-white cursor-default"
//                   : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:scale-105 active:scale-95"
//                 }`}
//             >
//               <span className="text-xl">{permission === "granted" ? "🔔" : "🔕"}</span>
//               {permission === "granted" ? "Event Alerts are ON" : "Enable Event Alerts"}
//             </button>
//           </div>

//           {/* Explain what notifications do */}
//           {permission !== "granted" && (
//             <p className="mt-3 text-blue-200/70 text-xs">
//               Allow notifications → get an alert 30 minutes before every event
//             </p>
//           )}
//         </div>
//       </section>

//       {/* ─── UPCOMING STRIP ─── */}
//       {upcomingEvents.length > 0 && (
//         <section className="py-10 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-1 h-6 rounded-full bg-[#fdad1b]" />
//               <h2 className="text-lg font-extrabold text-[#074166]">Next Up</h2>
//             </div>
//             <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
//               {upcomingEvents.map((ev, i) => (
//                 <Link
//                   key={i}
//                   href={`/schedule/${ev.slug?.current || ""}`}
//                   className="min-w-[195px] flex-shrink-0 rounded-2xl p-5 text-white shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
//                   style={{ backgroundColor: ev.color }}
//                 >
//                   <p className="text-[10px] uppercase tracking-[0.15em] opacity-80 mb-2 font-bold">
//                     {new Date(ev.start).toLocaleDateString("en-US", {
//                       weekday: "short", month: "short", day: "numeric",
//                     })}
//                   </p>
//                   <p className="font-bold text-sm leading-snug line-clamp-2">
//                     {ev.title || ev.course}
//                   </p>
//                   {ev.instructor && <p className="mt-2 text-[11px] opacity-75">👤 {ev.instructor}</p>}
//                   {ev.room && <p className="text-[11px] opacity-75">📍 {ev.room}</p>}
//                   <p className="mt-3 text-[11px] font-bold opacity-90">View details →</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ─── CALENDAR ─── */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

//           {/* Custom Toolbar */}
//           <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => calNav("prev")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={() => calNav("next")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow"
//               >
//                 ›
//               </button>
//               <button
//                 onClick={() => calNav("today")}
//                 className="h-10 px-5 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm hover:bg-[#074166] hover:text-white transition-all"
//               >
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
//                 { key: "timeGridDay",  label: "Day"   },
//               ].map(({ key, label }) => (
//                 <button
//                   key={key}
//                   onClick={() => switchView(key)}
//                   className={`px-5 h-9 rounded-lg text-sm font-bold transition-all
//                     ${activeView === key
//                       ? "bg-[#074166] text-white shadow-md"
//                       : "text-gray-500 hover:text-[#074166] hover:bg-white"
//                     }`}
//                 >
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
//                 if (slug) window.location.href = `/schedule/${slug}`
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* ─── TOASTS — bottom-right corner ─── */}
//       <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className="flex items-start gap-3 text-white px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold max-w-[300px]"
//             style={{
//               backgroundColor: t.color,
//               animation: t.leaving
//                 ? "slideOut 0.4s ease forwards"
//                 : "slideIn 0.35s ease forwards",
//             }}
//           >
//             <span className="text-base leading-none mt-0.5 flex-shrink-0">🔔</span>
//             <span className="leading-snug">{t.msg}</span>
//           </div>
//         ))}
//       </div>
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

// const EVENT_COLORS = [
//   "#074166",
//   "#fdad1b",
//   "#0e7fc1",
//   "#e05c1a",
//   "#1a9e6e",
//   "#9333ea",
// ]

// function useNotifications(events) {
//   const [permission, setPermission] = useState("default")
//   const [toasts, setToasts] = useState([])
//   const notifiedRef = useRef(new Set())

//   useEffect(() => {
//     if ("Notification" in window) setPermission(Notification.permission)
//   }, [])

//   const showToast = (msg, color = "#074166") => {
//     const id = Date.now()
//     setToasts((p) => [...p, { id, msg, color }])
//     setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000)
//   }

//   const requestPermission = async () => {
//     if (!("Notification" in window)) return showToast("❌ Browser does not support notifications", "#e05c1a")
//     const result = await Notification.requestPermission()
//     setPermission(result)
//     if (result === "granted") showToast("✅ Notifications enabled! You'll be alerted 30 min before events.", "#1a9e6e")
//     else showToast("❌ Notification permission denied.", "#e05c1a")
//   }

//   useEffect(() => {
//     if (permission !== "granted" || events.length === 0) return
//     const interval = setInterval(() => {
//       const now = new Date()
//       events.forEach((ev) => {
//         const start = new Date(ev.start)
//         const diff = (start - now) / 60000
//         const key = ev.id
//         if (diff > 0 && diff <= 30 && !notifiedRef.current.has(key)) {
//           notifiedRef.current.add(key)
//           try {
//             new Notification(`📅 Starting Soon: ${ev.title}`, {
//               body: `Begins in ${Math.round(diff)} minutes${ev.extendedProps?.room ? ` — Room ${ev.extendedProps.room}` : ""}`,
//               icon: "/favicon.ico",
//             })
//           } catch {}
//           showToast(`🔔 "${ev.title}" starts in ${Math.round(diff)} min!`, "#074166")
//         }
//       })
//     }, 60000)
//     return () => clearInterval(interval)
//   }, [permission, events])

//   return { permission, toasts, requestPermission }
// }

// export default function SchedulePage() {
//   const [events, setEvents] = useState([])
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [activeView, setActiveView] = useState("dayGridMonth")
//   const [calTitle, setCalTitle] = useState("")
//   const calendarRef = useRef(null)
//   const { permission, toasts, requestPermission } = useNotifications(events)

//   useEffect(() => {
//     client.fetch(scheduleQuery).then((data) => {
//       const now = new Date()
//       const formatted = data.map((item, i) => ({
//         id: item.slug?.current || String(i),
//         title: item.title || `${item.course} — ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
//         borderColor: "transparent",
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
//     if (calendarRef.current) {
//       setCalTitle(calendarRef.current.getApi().view.title)
//     }
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
//     else if (action === "today") api.today()
//     setTimeout(updateTitle, 50)
//   }

//   const switchView = (view) => {
//     setActiveView(view)
//     calendarRef.current?.getApi().changeView(view)
//     setTimeout(updateTitle, 50)
//   }

//   const VIEW_LABELS = {
//     dayGridMonth: "Month",
//     timeGridWeek: "Week",
//     timeGridDay: "Day",
//   }

//   return (
//     <div className="bg-[#f5f7fa] min-h-screen">
//       <Navbar />

//       {/* ─── HERO ─── */}
//       <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
//         <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-10 left-10 w-72 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-[0.2em] uppercase border border-[#fdad1b]/30">
//             Events &amp; Sessions
//           </span>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-2">
//             Upcoming <span className="text-[#fdad1b]">Events</span>
//           </h1>
//           <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
//             Browse all scheduled classes, workshops, and training sessions in one place.
//           </p>
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={requestPermission}
//               disabled={permission === "granted"}
//               className={`
//                 inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm
//                 transition-all duration-200 shadow-lg
//                 ${permission === "granted"
//                   ? "bg-[#1a9e6e] text-white cursor-default"
//                   : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:scale-105 active:scale-95"
//                 }
//               `}
//             >
//               <span className="text-xl">{permission === "granted" ? "🔔" : "🔕"}</span>
//               {permission === "granted" ? "Event Alerts are ON" : "Enable Event Alerts"}
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ─── UPCOMING STRIP ─── */}
//       {upcomingEvents.length > 0 && (
//         <section className="py-10 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-1 h-6 rounded-full bg-[#fdad1b]" />
//               <h2 className="text-lg font-extrabold text-[#074166]">Next Up</h2>
//             </div>
//             <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
//               {upcomingEvents.map((ev, i) => (
//                 <Link
//                   key={i}
//                   href={`/schedule/${ev.slug?.current || ""}`}
//                   className="min-w-[195px] flex-shrink-0 rounded-2xl p-5 text-white shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
//                   style={{ backgroundColor: ev.color }}
//                 >
//                   <p className="text-[10px] uppercase tracking-[0.15em] opacity-80 mb-2 font-bold">
//                     {new Date(ev.start).toLocaleDateString("en-US", {
//                       weekday: "short", month: "short", day: "numeric",
//                     })}
//                   </p>
//                   <p className="font-bold text-sm leading-snug line-clamp-2">
//                     {ev.title || ev.course}
//                   </p>
//                   {ev.instructor && <p className="mt-2 text-[11px] opacity-75">👤 {ev.instructor}</p>}
//                   {ev.room && <p className="text-[11px] opacity-75">📍 {ev.room}</p>}
//                   <p className="mt-3 text-[11px] font-bold opacity-90">View details →</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ─── CALENDAR ─── */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

//           {/* Custom Toolbar */}
//           <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">
//             {/* Prev / Next / Today */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => calNav("prev")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all duration-150 shadow"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={() => calNav("next")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all duration-150 shadow"
//               >
//                 ›
//               </button>
//               <button
//                 onClick={() => calNav("today")}
//                 className="h-10 px-5 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm hover:bg-[#074166] hover:text-white transition-all duration-150"
//               >
//                 Today
//               </button>
//             </div>

//             {/* Title */}
//             <h2 className="text-xl md:text-2xl font-extrabold text-[#074166] order-first w-full text-center md:order-none md:w-auto">
//               {calTitle}
//             </h2>

//             {/* Month / Week / Day */}
//             <div className="flex items-center bg-[#f0f4f8] rounded-xl p-1 gap-1">
//               {Object.entries(VIEW_LABELS).map(([key, label]) => (
//                 <button
//                   key={key}
//                   onClick={() => switchView(key)}
//                   className={`px-5 h-9 rounded-lg text-sm font-bold transition-all duration-150
//                     ${activeView === key
//                       ? "bg-[#074166] text-white shadow-md"
//                       : "text-gray-500 hover:text-[#074166] hover:bg-white"
//                     }`}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* FullCalendar */}
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
//                 if (slug) window.location.href = `/schedule/${slug}`
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* ─── Toasts — top right ─── */}
//       <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className="text-white px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold max-w-xs flex items-start gap-3"
//             style={{
//               backgroundColor: t.color,
//               animation: "slideIn 0.35s ease forwards",
//             }}
//           >
//             <span className="text-lg leading-none mt-0.5">🔔</span>
//             <span>{t.msg}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



















// "use client"

// import { useEffect, useState } from "react"
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

// // Vibrant colors for events — matching your brand palette
// const EVENT_COLORS = [
//   "#074166", // deep navy
//   "#fdad1b", // gold
//   "#0e7fc1", // sky blue
//   "#e05c1a", // burnt orange
//   "#1a9e6e", // emerald
//   "#7b3fa8", // purple
// ]

// export default function SchedulePage() {
//   const [events, setEvents] = useState([])
//   const [upcomingEvents, setUpcomingEvents] = useState([])

//   useEffect(() => {
//     client.fetch(scheduleQuery).then((data) => {
//       const now = new Date()

//       const formatted = data.map((item, i) => ({
//         id: item.slug?.current || String(i),
//         title: item.title || `${item.course} — ${item.instructor}`,
//         start: item.start,
//         end: item.end,
//         backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
//         borderColor: "transparent",
//         extendedProps: { slug: item.slug?.current, room: item.room, instructor: item.instructor },
//       }))

//       setEvents(formatted)

//       // Next 5 upcoming
//       const upcoming = data
//         .filter((item) => new Date(item.start) >= now)
//         .sort((a, b) => new Date(a.start) - new Date(b.start))
//         .slice(0, 5)
//         .map((item, i) => ({ ...item, color: EVENT_COLORS[i % EVENT_COLORS.length] }))

//       setUpcomingEvents(upcoming)
//     })
//   }, [])

//   return (
//     <div className="bg-[#f5f7fa] min-h-screen font-sans">
//       <Navbar />

//       {/* ─── HERO ─── */}
//       <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
//         {/* decorative circles */}
//         <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#fdad1b]/10 blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-96 h-40 rounded-full bg-white/5 blur-2xl" />

//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-sm font-semibold tracking-widest uppercase">
//             Events & Sessions
//           </span>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
//             Upcoming <span className="text-[#fdad1b]">Events</span>
//           </h1>
//           <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto">
//             Browse all scheduled classes, workshops, and training sessions in one place.
//           </p>
//         </div>
//       </section>

//       {/* ─── UPCOMING STRIP ─── */}
//       {upcomingEvents.length > 0 && (
//         <section className="py-12 px-6 bg-white border-b border-gray-100">
//           <div className="max-w-7xl mx-auto">
//             <h2 className="text-xl font-bold text-[#074166] mb-6">
//               🗓 Next Up
//             </h2>
//             <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//               {upcomingEvents.map((ev, i) => (
//                 <Link
//                   key={i}
//                   href={`/schedule/${ev.slug?.current || ""}`}
//                   className="min-w-[220px] flex-shrink-0 rounded-2xl p-5 text-white shadow-md hover:scale-105 transition-transform"
//                   style={{ backgroundColor: ev.color }}
//                 >
//                   <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
//                     {new Date(ev.start).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//                   </p>
//                   <p className="font-bold text-base leading-snug">{ev.title || ev.course}</p>
//                   <p className="mt-2 text-xs opacity-75">{ev.instructor}</p>
//                   <p className="text-xs opacity-75">📍 {ev.room}</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ─── CALENDAR ─── */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             height="auto"
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             titleFormat={{ year: "numeric", month: "long" }}
//             eventClassNames={() =>
//               "rounded-lg text-white text-xs font-semibold px-2 py-0.5 shadow cursor-pointer"
//             }
//             eventClick={(info) => {
//               const slug = info.event.extendedProps.slug
//               if (slug) window.location.href = `/schedule/${slug}`
//             }}
//             dayCellClassNames={(arg) =>
//               arg.isToday
//                 ? "fc-today-custom"
//                 : arg.isOther
//                 ? "opacity-40"
//                 : ""
//             }
//           />
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       <style global jsx>{`
//         /* Today highlight */
//         .fc-today-custom {
//           background: linear-gradient(135deg, #fdad1b15, #fdad1b30) !important;
//         }
//         .fc .fc-daygrid-day.fc-day-today {
//           background: #fdad1b18 !important;
//           border-radius: 0 !important;
//         }
//         .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
//           background: #fdad1b !important;
//           color: #074166 !important;
//           font-weight: 800 !important;
//           border-radius: 50% !important;
//           width: 32px;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         /* Toolbar title */
//         .fc .fc-toolbar-title {
//           color: #074166 !important;
//           font-weight: 800 !important;
//           font-size: 1.6rem !important;
//         }

//         /* Nav buttons */
//         .fc .fc-button {
//           background-color: #074166 !important;
//           border: none !important;
//           color: white !important;
//           font-weight: 600 !important;
//           padding: 0.35rem 1rem !important;
//           border-radius: 0.6rem !important;
//           transition: background 0.2s !important;
//         }
//         .fc .fc-button:hover,
//         .fc .fc-button-active {
//           background-color: #fdad1b !important;
//           color: #074166 !important;
//         }
//         .fc .fc-button:focus {
//           box-shadow: none !important;
//         }

//         /* Day header */
//         .fc .fc-col-header-cell-cushion {
//           color: #074166;
//           font-weight: 700;
//           font-size: 0.8rem;
//           letter-spacing: 0.05em;
//           text-transform: uppercase;
//         }

//         /* Day number */
//         .fc .fc-daygrid-day-number {
//           color: #374151;
//           font-weight: 500;
//           font-size: 0.875rem;
//           padding: 6px 8px;
//         }

//         /* Event pill */
//         .fc-event {
//           border: none !important;
//           border-radius: 8px !important;
//           padding: 2px 6px !important;
//           font-size: 0.75rem !important;
//           font-weight: 600 !important;
//           cursor: pointer !important;
//         }
//         .fc-event:hover {
//           opacity: 0.85 !important;
//           transform: scale(1.02);
//         }

//         /* Hide scrollbar for upcoming strip */
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

//         /* Grid border */
//         .fc .fc-scrollgrid {
//           border-radius: 1rem;
//           overflow: hidden;
//           border-color: #e5e7eb !important;
//         }
//         .fc td, .fc th {
//           border-color: #e5e7eb !important;
//         }
//       `}</style>
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

//             /* Add Tailwind classes for day numbers */
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

//             eventClassNames={() => "rounded-xl text-white px-2 py-1 shadow-md"}
//           />

//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* FullCalendar header styles */}
//       <style global jsx>{`
//         .fc .fc-toolbar-title {
//           color: #074166 !important;
//           font-weight: 700 !important;
//           font-size: 1.875rem !important; /* text-3xl */
//         }
//         .fc .fc-button {
//           background-color: #074166 !important;
//           color: white !important;
//           font-weight: 500 !important;
//           padding: 0.25rem 0.75rem !important;
//           border-radius: 0.5rem !important;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
//         }
//         .fc .fc-button:hover {
//           background-color: #fdad1b !important;
//           color: #074166 !important;
//         }
//       `}</style>

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