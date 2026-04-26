"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"


export default function HeroSlider() {

const slides = [
  {
    image: "/images/slide1.png",
    title: "Empowering The Future With",
    highlight: "Artificial Intelligence",
    desc: "Industry-Level Training with Real-World Applications"
  },
{
  image: "/images/slide2.png",
  title: "Start Your Career In",
  highlight: "CCNA Networking",
  desc: "Learn Routing, Switching & Real Network Configuration"
},
  {
    image: "/images/slide3.png",
    title: "Become A Professional",
    highlight: "Data Analytics",
    desc: "Learn BI Tools, Data Visualization & Decision Making"
  },
  {
    image: "/images/slide4.png",
    title: "Master Industrial Automation",
    highlight: "PLC Programming",
    desc: "Practical Training on Real Industrial Systems"
  }
  // {
  //   image: "/images/slide5.png",
  //   title: "Build Your Career In",
  //   highlight: "Networking & Fiber Optics",
  //   desc: "CCNA, Routing, Switching & Fiber Communication Skills"
  // }
]

  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  // Preload images so the slider doesn't flash empty when changing
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  useEffect(() => {
    const start = () => {
      intervalRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length)
      }, 5000)
    }

    start()

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [slides.length])

  const handleDotClick = (i) => {
    setIndex(i)

    // restart the interval so the user sees the slide for the full duration
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length)
      }, 5000)
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden object-cover mt-16">

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="h-screen w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[index].image})`
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
        <div className="max-w-4xl">

          <motion.h1
            key={slides[index].title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-5xl font-bold leading-tight"
          >
            {slides[index].title}{" "}
            <span className="text-[#fdad1b]">
              {slides[index].highlight}
            </span>
          </motion.h1>

          <motion.p
            key={slides[index].desc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-3xl text-gray-200"
          >
            {slides[index].desc}
          </motion.p>

          <button className="mt-8 bg-[#fdad1b] text-black px-8 py-3 rounded-full font-semibold hover:scale-110 transition">
            
            <Link href="/courses" className="ml-2">Learn More</Link>
          </button>

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-40 w-full flex justify-center space-x-3 z-50 ">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-[#fdad1b]" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  )
}