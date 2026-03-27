// 'use client'; // important: client-side component

// import Link from 'next/link';

// export default function AnnouncementBar({ announcement }) {
//   if (!announcement) return null;

//   const { text, link, backgroundColor = '#fdad1b]', textColor = '#ffffff' } = announcement;

//   return (
//     <div
//   style={{
//     backgroundColor: announcement?.backgroundColor || "#3c449c",
//     color: announcement?.textColor || "#ffffff"
//   }}
//   className="fixed top-0 w-full z-50 h-8 flex items-center bg-[#9E1313]"
// >
//       <div className="whitespace-nowrap animate-marquee px-4">
//         {link ? (
//           <Link href={link}>
//             <span className="underline">{text}</span>
//           </Link>
//         ) : (
//           <span>{text}</span>
//         )}
//       </div>

//       <style jsx>{`
//         .animate-marquee {
//           display: inline-block;
//           padding-left: 100%;
//           animation: marquee 15s linear infinite;
//         }

//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//       `}</style>
//     </div>
//   );
// }



//above is MURQEE CODE and BELOW is DROPDOWN CODE 

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function AnnouncementBell({ announcements }) {
//   const [open, setOpen] = useState(false);

//   if (!announcements || announcements.length === 0) return null;

//   return (
//     <div className="fixed top-4 right-4 z-50">
      
//       {/* 🔔 Bell Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative bg-[#3c449c] text-white p-3 rounded-full shadow-lg"
//       >
//         🔔

//         {/* Notification Count */}
//         <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
//           {announcements.length}
//         </span>
//       </button>

//       {/* 📦 Dropdown */}
//       {open && (
//         <div className="mt-3 w-80 bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="p-3 font-semibold border-b">
//             Notifications
//           </div>

//           <div className="max-h-60 overflow-y-auto">
//             {announcements.map((item) => (
//               <div
//                 key={item._id}
//                 className="p-3 border-b hover:bg-gray-100"
//                 style={{
//                   backgroundColor: item.backgroundColor || "#ffffff",
//                   color: item.textColor || "#000000"
//                 }}
//               >
//                 {item.link ? (
//                   <Link href={item.link}>
//                     {item.text}
//                   </Link>
//                 ) : (
//                   <span>{item.text}</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar({ announcements }) {
  const [open, setOpen] = useState(false);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-[#3c449c] text-white p-3 rounded-full shadow-lg"
      >
        🔔

        {/* Count */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
          {announcements.length}
        </span>
      </button>

      {/* 📦 Dropdown */}
      {open && (
        <div className="mt-3 w-80 bg-white shadow-xl rounded-lg overflow-hidden">
          
          {/* Header */}
          <div className="p-3 font-semibold border-b">
            Notifications
          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="p-3 border-b hover:bg-gray-100"
                style={{
                  backgroundColor: item.backgroundColor || "#ffffff",
                  color: item.textColor || "#000000"
                }}
              >
                {item.link ? (
                  <Link href={item.link}>
                    {item.text}
                  </Link>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}