"use client";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, FaPinterest}from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#074166] text-white pt-12 pb-6">
      
      {/* Top Grid Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#fbae1a] mb-4">
            Sina Institute
          </h2>
          <p className="text-sm leading-6 text-gray-300">
            We provide professional training in Artificial Intelligence,
            Web Development, Cyber Security, Graphic Designing, 
            Digital Marketing, and emerging technologies to empower 
            students with future-ready skills.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="https://www.facebook.com/sinainstitute1" 
            className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaFacebookF size={14} />
            </a>
            <a href="https://www.x.com/sinainstitute1/"
            className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaTwitter size={14} />
            </a>
            <a href="https://www.instagram.com/sinainstitute1/" 
            className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaInstagram size={14} />
            </a>
            <a href="https://www.linkedin.com/company/sinainstitute1/" className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaLinkedinIn size={14} />
            </a>
            <a href="https://www.tiktok.com/@sinainstitute1" className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaTiktok size={14} />
            </a>
            <a href="https://www.youtube.com/@synergyinstitute10" className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaYoutube size={14} />
            </a>
            <a href="https://www.pinterest.com/sinainstitute9/" className="bg-[#fbae1a] p-2 rounded-full text-[#074166] hover:scale-110 transition">
              <FaPinterest size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#fbae1a] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/faq" className="hover:text-[#fbae1a] transition">FAQs</a></li>
            <li><a href="/admissions" className="hover:text-[#fbae1a] transition">Admissions</a></li>
            {/* <li><a href="/online-it-training" className="hover:text-[#fbae1a] transition">Online IT Training</a></li> */}
            {/* <li><a href="/class-schedule" className="hover:text-[#fbae1a] transition">Class Schedule</a></li> */}
            <li><a href="/job" className="hover:text-[#fbae1a] transition">Job Opportunities</a></li>
            <li><a href="/blog" className="hover:text-[#fbae1a] transition">Blog</a></li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xl font-semibold text-[#fbae1a] mb-4">
            Our Location
          </h3>
          <p className="text-sm text-gray-300 flex items-start gap-2">
            <MdLocationOn className="text-[#fbae1a] mt-1" />
            693 Rehman Baba Rd, opposite to PSO Pump, I-8/4 I 8/4 I-8, Islamabad, 44000, Pakistan
          </p>
          <div className="mt-4">
            <iframe
              src="https://maps.google.com/maps?q=693+Rehman+Baba+Rd,+I-8%2F4+I+8%2F4+I-8,+Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-40 rounded-lg border-2 border-[#fbae1a]"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#fbae1a] mb-4">
            Contact Us
          </h3>

          <p className="flex items-center gap-2 text-gray-300 text-sm mb-3">
            <MdEmail className="text-[#fbae1a]" />
            info@sinainstitute.com.pk
          </p>

          <p className="flex items-center gap-2 text-gray-300 text-sm">
            <MdPhone className="text-[#fbae1a]" />
            +92 3203400111
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-[#fbae1a] text-[#074166] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h4 className="text-xl font-bold">
            Want to Enroll Now?
          </h4>
          <button className="bg-[#074166] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
          
             
            <Link
              href="/book-query"
              // className="bg-[#fdad1b] text-[#074166] px-7 py-3 rounded-lg hover:opacity-90 transition inline-block"
            >
              Apply Now
            </Link>
          </button>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sina Institute. All rights reserved.
      </div>

    </footer>
  );
}