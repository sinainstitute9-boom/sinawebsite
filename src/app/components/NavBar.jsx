"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 h-26 w-full bg-white shadow-md z-50 text-gray-900">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="w-full flex items-center justify-between h-20 gap-8">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/logo.jpeg" alt="SINA Logo" className="h-24 w-auto" />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <div className="flex items-center gap-8 font-light text-[18px]">
              <Link href="/" className="hover:text-[#fdad1b] transition">Home</Link>
              <Link href="/aboutus" className="hover:text-[#fdad1b] transition">About Us</Link>
              <Link href="/mentors" className="hover:text-[#fdad1b] transition">Mentors</Link>
              <Link href="/courses" className="hover:text-[#fdad1b] transition">Courses</Link>
              <Link href="/services" className="hover:text-[#fdad1b] transition">Services</Link>
              <Link href="/class-schedule" className="hover:text-[#fdad1b] transition">Upcoming Events</Link>
              <Link href="/feedback" className="hover:text-[#fdad1b] transition">Feedback</Link>
              <Link href="/seminar" className="hover:text-[#fdad1b] transition">Free Seminars</Link>
              <Link href="/contact" className="hover:text-[#fdad1b] transition">Contact Us</Link>
              <Link href="/gallery" className="hover:text-[#fdad1b] transition">Our Campus</Link>
            </div>
          </div>

          {/* DESKTOP APPLY NOW */}
          <div className="hidden md:block flex-shrink-0">
            <Link href="/book-query"
            className="bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition inline-block font-semibold">
              Apply Now
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/book-query"
            className="bg-[#fdad1b] text-[#074166] px-4 py-2 rounded-lg font-semibold text-sm">
              Apply Now
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <svg className="w-7 h-7 text-[#074166]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-[#074166]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 space-y-2 text-[16px] text-gray-800">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Home</Link>
          <Link href="/aboutus" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">About Us</Link>
          <Link href="/mentors" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Mentors</Link>
          <Link href="/courses" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Courses</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Services</Link>
          <Link href="/class-schedule" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Upcoming Events</Link>
          <Link href="/feedback" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Feedback</Link>
          <Link href="/seminar" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Free Seminars</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] border-b border-gray-100 transition">Contact Us</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="block py-2 hover:text-[#fdad1b] transition">Our Campus</Link>
        </div>
      )}
    </nav>
  );
}
