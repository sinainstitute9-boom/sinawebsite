"use client";
import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from './AnnouncementBar';

export default function Navbar({ announcements }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 h-26 w-full bg-white shadow-md z-50 flex justify-between items-center  text-gray-900 gap-8">
      <div className="max-w-[1800px] mx-auto px-6 ">
        
        <div className="w-full flex items-center justify-between h-20 gap-8">
          
          {/* LEFT - LOGO */}
          <div className="flex-shrink-0 ">
            <img
              src="/logo.jpeg"
              alt="SINA Logo"
              className="h-24 w-auto"
            />
          </div>

          {/* CENTER - MENU */}
          <div className=" hidden md:flex flex-1 justify-center items-center gap-8">
            <div className="flex items-center gap-8 font-light text-[18px]">
              <Link href="/" className="hover:text-[#fdad1b] transition">Home</Link>
              <Link href="/aboutus" className="hover:text-[#fdad1b] transition">About Us</Link>
              <Link href="/mentors" className="hover:text-[#fdad1b] transition">Mentors</Link>
              <Link href="/courses" className="hover:text-[#fdad1b] transition">Courses</Link>
              <Link href="/services" className="hover:text-[#fdad1b] transition">Services</Link>
              <Link href="/class-schedule" className="hover:text-[#fdad1b] transition">Class Schedule</Link>
              <Link href="/feedback" className="hover:text-[#fdad1b] transition">Feedback</Link>
              <Link href="/seminar" className="hover:text-[#fdad1b] transition">Free Seminars</Link>
              <Link href="/contact" className="hover:text-[#fdad1b] transition">Contact Us</Link>
              <Link href="/gallery" className="hover:text-[#fdad1b] transition">Our Campus</Link>
              <div className="flex items-center gap-4">
              <AnnouncementBar announcements={announcements} />
</div>
            </div>
          </div>

          {/* RIGHT - BUTTON */}
          <div className="hidden md:block">
            <Link
              href="/book-query"
              className="bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition inline-block"
            >
              Apply Now
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-7 h-7 text-[#074166]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 space-y-3 text-[16px]">
          <Link href="/" className="block">Home</Link>
          <Link href="/aboutus" className="block">About Us</Link>
          <Link href="/mentors" className="block">Mentors</Link>
          <Link href="/courses" className="block">Courses</Link>
          <Link href="/services" className="block">Services</Link>
          <Link href="/class-schedule" className="block">Class Schedule</Link>
          <Link href="/corporate-trainings" className="block">Corporate Trainings</Link>
          <Link href="/fee-structure" className="block">Fee Structure</Link>
          <Link href="/feedback" className="block">Feedback</Link>
          <Link href="/free-seminars" className="block">Free Seminars</Link>
          <Link href="/contact" className="block">Contact Us</Link>
          <Link href="/gallery" className="block">Gallery</Link>

          <button className="w-full bg-[#fdad1b] text-[#074166] px-6 py-2 rounded-lg mt-3">
            Book Schedule
           
            <Link
              href="/book-query"
              className="bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition inline-block"
            >
              Apply Now
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
}