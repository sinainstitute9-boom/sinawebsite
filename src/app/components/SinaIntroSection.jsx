"use client";
import React from "react";
import { FaChalkboardTeacher, FaUserFriends, FaMapMarkerAlt, FaLaptop } from "react-icons/fa";

export default function SinaIntroSection() {
  return (
    <section className="relative z-10 -mt-24 px-4 md:px-8">
      
      <div className="max-w-7xl mx-auto bg-[#074166] text-white rounded-2xl shadow-2xl p-8 md:p-12">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          SINA Systems - Best IT Training Institute in Islamabad
        </h2>

        {/* Paragraph */}
        <p className="text-gray-300 leading-7 text-sm md:text-base mb-6">
          For the last 16 years, the name “SINA” has represented excellence in 
          technical education across Pakistan and beyond. SINA is committed 
          to delivering high-quality IT training through modern learning 
          methodologies. Over the past decade, we have produced highly skilled 
          professionals equipped with competitive technical expertise.
          <br /><br />
         
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button className="bg-[#fbae1a] text-[#074166] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Read More
          </button>

          <button className="border-2 border-[#fbae1a] text-[#fbae1a] px-6 py-3 rounded-lg font-semibold hover:bg-[#fbae1a] hover:text-[#074166] transition">
            +92 300 1234567
          </button>
        </div>

        {/* Modes of Training */}
        <div>
          <h3 className="text-2xl flex justify-center  font-semibold mb-6 text-[#fbae1a]">
            Modes of Training
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center gap-3">
              <FaChalkboardTeacher size={30} className="text-[#fbae1a]" />
              <span className="text-sm">Class Room</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <FaUserFriends size={30} className="text-[#fbae1a]" />
              <span className="text-sm">One-To-One</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <FaMapMarkerAlt size={30} className="text-[#fbae1a]" />
              <span className="text-sm">Customer Premise</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <FaLaptop size={30} className="text-[#fbae1a]" />
              <span className="text-sm">Online / E-Learning</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}