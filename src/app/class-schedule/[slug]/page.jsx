import { client } from "../../../sanity/lib/client"
import Link from "next/link"
import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"
import WhatsAppButton from "../../components/WhatsAppButton"

const singleScheduleQuery = `
*[_type == "classSchedule" && slug.current == $slug][0]{
  title,
  course,
  instructor,
  room,
  start,
  end,
  color
}
`

export default async function ScheduleDetailPage({ params }) {
  const { slug } = await params
  const data = await client.fetch(singleScheduleQuery, { slug })

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-6xl mb-4">📭</p>
            <h2 className="text-2xl font-bold text-[#074166]">Event not found</h2>
            <Link href="/class-schedule"
              className="mt-6 inline-block px-6 py-3 rounded-xl bg-[#074166] text-white font-semibold hover:bg-[#fdad1b] hover:text-[#074166] transition">
              ← Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const start = new Date(data.start)
  const end = new Date(data.end)
  const durationMin = Math.round((end - start) / 60000)

  const details = [
    { icon: "📚", label: "Course", value: data.course },
    { icon: "👤", label: "Instructor", value: data.instructor },
    { icon: "📍", label: "Room / Location", value: data.room },
    { icon: "🕐", label: "Starts", value: start.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) },
    { icon: "🕔", label: "Ends", value: end.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) },
  ]

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 bg-[#074166] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Link href="/class-schedule"
            className="inline-flex items-center gap-2 mb-6 text-blue-200 hover:text-[#fdad1b] text-sm font-medium transition">
            ← All Events
          </Link>
          <span className="inline-block mb-3 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-widest uppercase border border-[#fdad1b]/30">
            {start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight">
            {data.title || data.course}
          </h1>
          {data.instructor && (
            <p className="mt-4 text-blue-200 text-lg">👤 {data.instructor}</p>
          )}
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#074166] to-[#fdad1b]" />
            <div className="p-8 space-y-4">
              {details.map((d, i) =>
                d.value ? (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f5f7fa] hover:bg-[#074166]/5 transition">
                    <span className="text-2xl mt-0.5">{d.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#074166]/50 uppercase tracking-widest">{d.label}</p>
                      <p className="mt-0.5 text-[#074166] font-semibold text-base">{d.value}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Duration */}
            <div className="px-8 pb-8">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fdad1b]/10 border border-[#fdad1b]/30">
                <span className="text-sm font-bold text-[#074166]">⏱ Duration</span>
                <span className="text-sm font-bold text-[#074166]">{durationMin} minutes</span>
              </div>
            </div>
          </div>

          {/* Enroll CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enrollnow"
              className="text-center bg-[#fdad1b] text-[#074166] font-bold px-8 py-3 rounded-2xl hover:scale-105 transition shadow-lg">
              Enroll Now →
            </Link>
            <Link href="/class-schedule"
              className="text-center bg-[#074166] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#fdad1b] hover:text-[#074166] transition shadow-lg">
              ← Back to All Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}












// import { client } from "../../../sanity/lib/client"
// import Link from "next/link"
// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"
// import WhatsAppButton from "../../components/WhatsAppButton"

// const singleScheduleQuery = `
// *[_type == "classSchedule" && slug.current == $slug][0]{
//   title,
//   course,
//   instructor,
//   room,
//   start,
//   end,
//   color
// }
// `

// export default async function ScheduleDetailPage({ params }) {
//   const { slug } = await params
//   const data = await client.fetch(singleScheduleQuery, { slug })

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-[#f5f7fa]">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <p className="text-6xl mb-4">📭</p>
//             <h2 className="text-2xl font-bold text-[#074166]">Event not found</h2>
//             <Link href="/class-schedule"
//               className="mt-6 inline-block px-6 py-3 rounded-xl bg-[#074166] text-white font-semibold hover:bg-[#fdad1b] hover:text-[#074166] transition">
//               ← Back to Events
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   const start = new Date(data.start)
//   const end = new Date(data.end)
//   const durationMin = Math.round((end - start) / 60000)

//   const details = [
//     { icon: "📚", label: "Course", value: data.course },
//     { icon: "👤", label: "Instructor", value: data.instructor },
//     { icon: "📍", label: "Room / Location", value: data.room },
//     { icon: "🕐", label: "Starts", value: start.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) },
//     { icon: "🕔", label: "Ends", value: end.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) },
//   ]

//   return (
//     <div className="min-h-screen bg-[#f5f7fa]">
//       <Navbar />

//       {/* HERO */}
//       <section className="relative pt-36 pb-24 bg-[#074166] overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//         <div className="relative max-w-3xl mx-auto px-6 text-center">
//           <Link href="/class-schedule"
//             className="inline-flex items-center gap-2 mb-6 text-blue-200 hover:text-[#fdad1b] text-sm font-medium transition">
//             ← All Events
//           </Link>
//           <span className="inline-block mb-3 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-widest uppercase border border-[#fdad1b]/30">
//             {start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
//           </span>
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight">
//             {data.title || data.course}
//           </h1>
//           {data.instructor && (
//             <p className="mt-4 text-blue-200 text-lg">👤 {data.instructor}</p>
//           )}
//         </div>
//       </section>

//       {/* DETAILS */}
//       <section className="py-16 px-6">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//             <div className="h-2 bg-gradient-to-r from-[#074166] to-[#fdad1b]" />
//             <div className="p-8 space-y-4">
//               {details.map((d, i) =>
//                 d.value ? (
//                   <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f5f7fa] hover:bg-[#074166]/5 transition">
//                     <span className="text-2xl mt-0.5">{d.icon}</span>
//                     <div>
//                       <p className="text-xs font-bold text-[#074166]/50 uppercase tracking-widest">{d.label}</p>
//                       <p className="mt-0.5 text-[#074166] font-semibold text-base">{d.value}</p>
//                     </div>
//                   </div>
//                 ) : null
//               )}
//             </div>

//             {/* Duration */}
//             <div className="px-8 pb-8">
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fdad1b]/10 border border-[#fdad1b]/30">
//                 <span className="text-sm font-bold text-[#074166]">⏱ Duration</span>
//                 <span className="text-sm font-bold text-[#074166]">{durationMin} minutes</span>
//               </div>
//             </div>
//           </div>

//           {/* Enroll CTA */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/enrollnow"
//               className="text-center bg-[#fdad1b] text-[#074166] font-bold px-8 py-3 rounded-2xl hover:scale-105 transition shadow-lg">
//               Enroll Now →
//             </Link>
//             <Link href="/class-schedule"
//               className="text-center bg-[#074166] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#fdad1b] hover:text-[#074166] transition shadow-lg">
//               ← Back to All Events
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />
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

// // ─── Notification System ────────────────────────────────────────────────────
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
//     if (!("Notification" in window)) return showToast("❌ Browser does not support notifications")
//     const result = await Notification.requestPermission()
//     setPermission(result)
//     if (result === "granted") showToast("✅ Notifications enabled! You'll be alerted 30 min before events.", "#1a9e6e")
//     else showToast("❌ Notification permission denied.", "#e05c1a")
//   }

//   // Poll every 60s — fire when event is 30 min away
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

// // ─── Main Page ──────────────────────────────────────────────────────────────
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

//   // Sync our title display with FullCalendar
//   const updateTitle = () => {
//     if (calendarRef.current) {
//       setCalTitle(calendarRef.current.getApi().view.title)
//     }
//   }

//   useEffect(() => {
//     // Small delay to let FullCalendar render
//     const t = setTimeout(updateTitle, 100)
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

//   const VIEW_LABELS = { dayGridMonth: "Month", timeGridWeek: "Week", timeGridDay: "Day" }

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

//           {/* Notification Bell */}
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
//               {permission === "granted"
//                 ? "Event alerts are ON"
//                 : "Enable Event Alerts"}
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

//           {/* ══ FULLY CUSTOM TOOLBAR — no FullCalendar CSS involved ══ */}
//           <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">

//             {/* Left: Prev / Next / Today */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => calNav("prev")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center
//                            hover:bg-[#fdad1b] hover:text-[#074166] transition-all duration-150 shadow"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={() => calNav("next")}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white font-bold text-xl flex items-center justify-center
//                            hover:bg-[#fdad1b] hover:text-[#074166] transition-all duration-150 shadow"
//               >
//                 ›
//               </button>
//               <button
//                 onClick={() => calNav("today")}
//                 className="h-10 px-5 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm
//                            hover:bg-[#074166] hover:text-white transition-all duration-150"
//               >
//                 Today
//               </button>
//             </div>

//             {/* Center: Calendar title */}
//             <h2 className="text-xl md:text-2xl font-extrabold text-[#074166] order-first w-full md:order-none md:w-auto">
//               {calTitle}
//             </h2>

//             {/* Right: Month / Week / Day pill switcher */}
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

//           {/* FullCalendar — toolbar completely off */}
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

//       {/* ─── Toast notifications ─── */}
//       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center pointer-events-none">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className="text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-semibold"
//             style={{
//               backgroundColor: t.color,
//               animation: "slideUp 0.35s ease forwards",
//             }}
//           >
//             {t.msg}
//           </div>
//         ))}
//       </div>

//       <style global jsx>{`
//         /* ── Today cell ── */
//         .fc .fc-daygrid-day.fc-day-today {
//           background-color: #fff8e7 !important;
//         }
//         .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
//           background: #fdad1b !important;
//           color: #074166 !important;
//           font-weight: 800 !important;
//           border-radius: 50% !important;
//           width: 30px !important;
//           height: 30px !important;
//           display: inline-flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           line-height: 1 !important;
//           margin: 4px !important;
//         }

//         /* ── Day headers ── */
//         .fc .fc-col-header-cell {
//           padding: 10px 0 !important;
//           background: #f8fafc !important;
//         }
//         .fc .fc-col-header-cell-cushion {
//           color: #074166 !important;
//           font-weight: 800 !important;
//           font-size: 0.72rem !important;
//           letter-spacing: 0.1em !important;
//           text-transform: uppercase !important;
//           text-decoration: none !important;
//         }

//         /* ── Day numbers ── */
//         .fc .fc-daygrid-day-number {
//           color: #4b5563 !important;
//           font-weight: 500 !important;
//           font-size: 0.85rem !important;
//           padding: 6px 10px !important;
//           text-decoration: none !important;
//         }
//         .fc .fc-day-other .fc-daygrid-day-number {
//           opacity: 0.3 !important;
//         }

//         /* ── Events ── */
//         .fc-event {
//           border: none !important;
//           border-radius: 7px !important;
//           padding: 2px 7px !important;
//           margin-bottom: 2px !important;
//           font-size: 0.75rem !important;
//           font-weight: 600 !important;
//           cursor: pointer !important;
//           transition: opacity 0.15s, transform 0.15s !important;
//         }
//         .fc-event:hover {
//           opacity: 0.85 !important;
//           transform: scale(1.02) !important;
//         }
//         .fc-event .fc-event-title {
//           color: white !important;
//         }

//         /* ── Grid borders ── */
//         .fc .fc-scrollgrid {
//           border: none !important;
//         }
//         .fc td, .fc th {
//           border-color: #f0f0f0 !important;
//         }

//         /* ── Time grid ── */
//         .fc .fc-timegrid-slot-label-cushion {
//           color: #9ca3af !important;
//           font-size: 0.72rem !important;
//           font-weight: 600 !important;
//         }

//         /* ── Toast animation ── */
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
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

// // ─── Notification Bell Component ───────────────────────────────────────────
// function NotificationBell({ events }) {
//   const [permission, setPermission] = useState("default")
//   const [notified, setNotified] = useState(new Set())
//   const [toasts, setToasts] = useState([])
//   const intervalRef = useRef(null)

//   // Request permission on mount
//   useEffect(() => {
//     if ("Notification" in window) {
//       setPermission(Notification.permission)
//     }
//   }, [])

//   const requestPermission = async () => {
//     if (!("Notification" in window)) return
//     const result = await Notification.requestPermission()
//     setPermission(result)
//     if (result === "granted") {
//       showToast("✅ Notifications enabled! You'll be reminded 30 mins before events.")
//     }
//   }

//   // Check every minute for events starting in ~30 min
//   useEffect(() => {
//     if (permission !== "granted" || events.length === 0) return

//     intervalRef.current = setInterval(() => {
//       const now = new Date()
//       events.forEach((ev) => {
//         const start = new Date(ev.start)
//         const diffMin = (start - now) / 60000
//         const key = ev.id || ev.title

//         if (diffMin > 0 && diffMin <= 30 && !notified.has(key)) {
//           // Browser notification
//           new Notification(`📅 Upcoming: ${ev.title}`, {
//             body: `Starts in ${Math.round(diffMin)} minutes${ev.extendedProps?.room ? ` — Room: ${ev.extendedProps.room}` : ""}`,
//             icon: "/favicon.ico",
//           })
//           // In-app toast
//           showToast(`🔔 "${ev.title}" starts in ${Math.round(diffMin)} min!`)
//           setNotified((prev) => new Set([...prev, key]))
//         }
//       })
//     }, 60000)

//     return () => clearInterval(intervalRef.current)
//   }, [permission, events, notified])

//   const showToast = (msg) => {
//     const id = Date.now()
//     setToasts((prev) => [...prev, { id, msg }])
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id))
//     }, 5000)
//   }

//   return (
//     <>
//       {/* Bell button */}
//       <button
//         onClick={requestPermission}
//         title={permission === "granted" ? "Notifications ON" : "Enable notifications"}
//         className={`
//           flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-md
//           ${permission === "granted"
//             ? "bg-[#1a9e6e] text-white cursor-default"
//             : "bg-white text-[#074166] hover:bg-[#fdad1b] hover:text-[#074166] border border-[#074166]/20"
//           }
//         `}
//       >
//         <span className="text-lg">{permission === "granted" ? "🔔" : "🔕"}</span>
//         {permission === "granted" ? "Alerts ON" : "Enable Alerts"}
//       </button>

//       {/* Toast stack */}
//       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center pointer-events-none">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className="bg-[#074166] text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-semibold animate-bounce-in"
//           >
//             {t.msg}
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// // ─── Main Page ──────────────────────────────────────────────────────────────
// export default function SchedulePage() {
//   const [events, setEvents] = useState([])
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [activeView, setActiveView] = useState("dayGridMonth")
//   const calendarRef = useRef(null)

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
//         .slice(0, 5)
//         .map((item, i) => ({ ...item, color: EVENT_COLORS[i % EVENT_COLORS.length] }))

//       setUpcomingEvents(upcoming)
//     })
//   }, [])

//   // Custom view switcher — controls FullCalendar via ref
//   const switchView = (view) => {
//     setActiveView(view)
//     if (calendarRef.current) {
//       calendarRef.current.getApi().changeView(view)
//     }
//   }

//   const viewOptions = [
//     { key: "dayGridMonth", label: "Month" },
//     { key: "timeGridWeek", label: "Week" },
//     { key: "timeGridDay", label: "Day" },
//   ]

//   return (
//     <div className="bg-[#f5f7fa] min-h-screen">
//       <Navbar />

//       {/* ─── HERO ─── */}
//       <section className="relative pt-36 pb-24 overflow-hidden bg-[#074166]">
//         <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#fdad1b]/10 blur-3xl" />
//         <div className="absolute bottom-0 left-10 w-60 h-40 rounded-full bg-white/5 blur-2xl" />
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-widest uppercase border border-[#fdad1b]/30">
//             Events &amp; Sessions
//           </span>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-2">
//             Upcoming <span className="text-[#fdad1b]">Events</span>
//           </h1>
//           <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
//             Browse all scheduled classes, workshops, and training sessions in one place.
//           </p>

//           {/* Notification bell in hero */}
//           <div className="mt-8 flex justify-center">
//             <NotificationBell events={events} />
//           </div>
//         </div>
//       </section>

//       {/* ─── UPCOMING STRIP ─── */}
//       {upcomingEvents.length > 0 && (
//         <section className="py-10 px-6 bg-white border-b border-gray-100">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-lg font-extrabold text-[#074166] flex items-center gap-2">
//                 <span className="w-1 h-5 rounded-full bg-[#fdad1b] inline-block" />
//                 Next Up
//               </h2>
//               <span className="text-xs text-gray-400 font-medium">Upcoming events →</span>
//             </div>
//             <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//               {upcomingEvents.map((ev, i) => (
//                 <Link
//                   key={i}
//                   href={`/schedule/${ev.slug?.current || ""}`}
//                   className="min-w-[200px] flex-shrink-0 rounded-2xl p-5 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
//                   style={{ background: `linear-gradient(135deg, ${ev.color}, ${ev.color}cc)` }}
//                 >
//                   <p className="text-[10px] uppercase tracking-widest opacity-75 mb-2 font-bold">
//                     {new Date(ev.start).toLocaleDateString("en-US", {
//                       weekday: "short", month: "short", day: "numeric",
//                     })}
//                   </p>
//                   <p className="font-bold text-sm leading-snug line-clamp-2">
//                     {ev.title || ev.course}
//                   </p>
//                   {ev.instructor && (
//                     <p className="mt-2 text-[11px] opacity-70">👤 {ev.instructor}</p>
//                   )}
//                   {ev.room && (
//                     <p className="text-[11px] opacity-70">📍 {ev.room}</p>
//                   )}
//                   <div className="mt-3 text-[10px] font-bold opacity-80 flex items-center gap-1">
//                     View details →
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ─── CALENDAR ─── */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

//           {/* ── Custom Toolbar ── */}
//           <div className="flex flex-wrap items-center justify-between gap-4 px-8 pt-8 pb-4">
//             {/* Prev / Next / Today */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => calendarRef.current?.getApi().prev()}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow font-bold text-lg"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={() => calendarRef.current?.getApi().next()}
//                 className="w-10 h-10 rounded-xl bg-[#074166] text-white flex items-center justify-center hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow font-bold text-lg"
//               >
//                 ›
//               </button>
//               <button
//                 onClick={() => calendarRef.current?.getApi().today()}
//                 className="px-4 h-10 rounded-xl border-2 border-[#074166] text-[#074166] font-bold text-sm hover:bg-[#074166] hover:text-white transition-all"
//               >
//                 Today
//               </button>
//             </div>

//             {/* Month/Week/Day toggle pills */}
//             <div className="flex items-center gap-1 bg-[#f5f7fa] p-1 rounded-xl">
//               {viewOptions.map((v) => (
//                 <button
//                   key={v.key}
//                   onClick={() => switchView(v.key)}
//                   className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
//                     activeView === v.key
//                       ? "bg-[#074166] text-white shadow-md"
//                       : "text-gray-500 hover:text-[#074166]"
//                   }`}
//                 >
//                   {v.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ── FullCalendar (headerToolbar hidden — we use custom above) ── */}
//           <div className="px-4 pb-8">
//             <FullCalendar
//               ref={calendarRef}
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               events={events}
//               height="auto"
//               headerToolbar={false}
//               eventClassNames={() =>
//                 "rounded-lg text-white text-xs font-semibold px-2 py-0.5 shadow-sm cursor-pointer transition-opacity hover:opacity-80"
//               }
//               eventClick={(info) => {
//                 const slug = info.event.extendedProps.slug
//                 if (slug) window.location.href = `/schedule/${slug}`
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       <style global jsx>{`
//         /* Today cell */
//         .fc .fc-daygrid-day.fc-day-today {
//           background: #fdad1b18 !important;
//         }
//         .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
//           background: #fdad1b !important;
//           color: #074166 !important;
//           font-weight: 800 !important;
//           border-radius: 50% !important;
//           width: 30px;
//           height: 30px;
//           display: inline-flex !important;
//           align-items: center;
//           justify-content: center;
//           line-height: 1 !important;
//         }

//         /* Day header (SUN MON TUE…) */
//         .fc .fc-col-header-cell-cushion {
//           color: #074166 !important;
//           font-weight: 800 !important;
//           font-size: 0.75rem !important;
//           letter-spacing: 0.08em !important;
//           text-transform: uppercase !important;
//           padding: 10px 0 !important;
//         }

//         /* Day number */
//         .fc .fc-daygrid-day-number {
//           color: #6b7280;
//           font-weight: 500;
//           font-size: 0.85rem;
//           padding: 6px 10px;
//         }

//         /* Other month days */
//         .fc .fc-day-other .fc-daygrid-day-number {
//           opacity: 0.35;
//         }

//         /* Event pill */
//         .fc-event {
//           border: none !important;
//           border-radius: 8px !important;
//           padding: 2px 8px !important;
//           margin-bottom: 2px !important;
//         }

//         /* Grid lines */
//         .fc .fc-scrollgrid {
//           border: none !important;
//         }
//         .fc td, .fc th {
//           border-color: #f0f0f0 !important;
//         }
//         .fc .fc-scrollgrid-section > td {
//           border: none !important;
//         }

//         /* Time grid */
//         .fc .fc-timegrid-slot-label-cushion {
//           color: #9ca3af;
//           font-size: 0.75rem;
//           font-weight: 600;
//         }

//         /* Toast animation */
//         @keyframes bounceIn {
//           0% { transform: translateY(20px); opacity: 0; }
//           60% { transform: translateY(-4px); opacity: 1; }
//           100% { transform: translateY(0); }
//         }
//         .animate-bounce-in {
//           animation: bounceIn 0.4s ease forwards;
//         }

//         /* Hide scrollbar */
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   )
// }





















// import { client } from "../../../sanity/lib/client"
// import { singleScheduleQuery } from "../../../sanity/lib/queries"
// import Link from "next/link"

// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"

// export async function generateMetadata({ params }) {
//   const data = await client.fetch(singleScheduleQuery, { slug: params.slug })
//   return {
//     title: data?.title || "Event Details",
//   }
// }

// export default async function ScheduleDetailPage({ params }) {
//   const data = await client.fetch(singleScheduleQuery, { slug: params.slug })

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
//         <div className="text-center">
//           <p className="text-6xl">📭</p>
//           <h2 className="mt-4 text-2xl font-bold text-[#074166]">Event not found</h2>
//           <Link href="/schedule" className="mt-6 inline-block px-6 py-2 rounded-xl bg-[#074166] text-white font-semibold hover:bg-[#fdad1b] hover:text-[#074166] transition-colors">
//             ← Back to Events
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const start = new Date(data.start)
//   const end = new Date(data.end)

//   const details = [
//     { icon: "📚", label: "Course", value: data.course },
//     { icon: "👤", label: "Instructor", value: data.instructor },
//     { icon: "📍", label: "Room / Location", value: data.room },
//     {
//       icon: "🕐",
//       label: "Starts",
//       value: start.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }),
//     },
//     {
//       icon: "🕔",
//       label: "Ends",
//       value: end.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }),
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-[#f5f7fa]">
//       <Navbar />

//       {/* HERO */}
//       <section className="relative pt-36 pb-24 bg-[#074166] overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#fdad1b]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
//         <div className="relative max-w-3xl mx-auto px-6 text-center">
//           <Link
//             href="/schedule"
//             className="inline-flex items-center gap-2 mb-6 text-blue-200 hover:text-[#fdad1b] text-sm font-medium transition-colors"
//           >
//             ← All Events
//           </Link>
//           <span className="inline-block mb-3 px-4 py-1 rounded-full bg-[#fdad1b]/20 text-[#fdad1b] text-xs font-bold tracking-widest uppercase">
//             {start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
//           </span>
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 leading-tight">
//             {data.title}
//           </h1>
//         </div>
//       </section>

//       {/* DETAILS CARD */}
//       <section className="py-16 px-6">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//             {/* Top colored bar */}
//             <div className="h-2 bg-gradient-to-r from-[#074166] to-[#fdad1b]" />

//             <div className="p-8 space-y-5">
//               {details.map(
//                 (d, i) =>
//                   d.value && (
//                     <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f5f7fa] hover:bg-[#074166]/5 transition-colors">
//                       <span className="text-2xl mt-0.5">{d.icon}</span>
//                       <div>
//                         <p className="text-xs font-bold text-[#074166]/50 uppercase tracking-widest">
//                           {d.label}
//                         </p>
//                         <p className="mt-0.5 text-[#074166] font-semibold text-base">
//                           {d.value}
//                         </p>
//                       </div>
//                     </div>
//                   )
//               )}
//             </div>

//             {/* Duration badge */}
//             <div className="px-8 pb-8">
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fdad1b]/10 border border-[#fdad1b]/30">
//                 <span className="text-sm font-bold text-[#074166]">⏱ Duration</span>
//                 <span className="text-sm font-bold text-[#074166]">
//                   {Math.round((end - start) / 60000)} minutes
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Back button */}
//           <div className="mt-8 text-center">
//             <Link
//               href="/schedule"
//               className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#074166] text-white font-bold hover:bg-[#fdad1b] hover:text-[#074166] transition-all shadow-lg"
//             >
//               ← Back to All Events
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }














// import { client } from "../../../sanity/lib/client"
// import { singleScheduleQuery } from "../../../sanity/lib/queries"

// import Navbar from "../../components/NavBar"
// import Footer from "../../components/Footer"

// // ✅ Dynamic metadata (SEO)
// export async function generateMetadata({ params }) {
//   const data = await client.fetch(singleScheduleQuery, {
//     slug: params.slug,
//   })

//   return {
//     title: data?.title || "Class Schedule",
//   }
// }

// // ✅ Page Component (SERVER COMPONENT - best practice)
// export default async function ScheduleDetailPage({ params }) {

//   const data = await client.fetch(singleScheduleQuery, {
//     slug: params.slug,
//   })

//   // ✅ Not found case
//   if (!data) {
//     return (
//       <div className="text-center mt-20 text-red-500">
//         Schedule not found
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white">

//       <Navbar />

//       {/* HERO */}
//       <section className="pt-32 pb-20 bg-gray-100 text-center">
//         <h1 className="text-5xl font-bold text-[#074166]">
//           {data.title}
//         </h1>
//         <p className="mt-4 text-gray-800">
//           {data.course} - {data.instructor}
//         </p>
//       </section>

//       {/* DETAILS */}
//       <section className="py-20 px-6">
//         <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4">

//           <p><strong>Course:</strong> {data.course}</p>

//           <p><strong>Instructor:</strong> {data.instructor}</p>

//           <p><strong>Room:</strong> {data.room}</p>

//           <p>
//             <strong>Start:</strong>{" "}
//             {new Date(data.start).toLocaleString()}
//           </p>

//           <p>
//             <strong>End:</strong>{" "}
//             {new Date(data.end).toLocaleString()}
//           </p>

//         </div>
//       </section>

//       <Footer />

//     </div>
//   )
// }