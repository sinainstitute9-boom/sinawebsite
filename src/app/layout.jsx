// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "SINA",
//   description: "Professional IT Training & Technology Solutions",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "SINA",
//   description: "SINA Institute provides professional IT training in Digital Skills, Robotics, AI, and modern technology to build future-ready professionals.",
//   icons: {
//     icon: "/favicon.ico",
//   },
//   openGraph: {
//     title: "SINA | Learn. Build. Succeed.",
//     description: "Join SINA Institute for cutting-edge IT training in Digital Marketing, Robotics, AI & Software Development. Build your future with practical skills.",
//     url: "https://sinainstitute.com.pk",
//     siteName: "SINA Institute",
//     images: [
//       {
//         url: "https://sinainstitute.com.pk/sina.jpg",
//         width: 1200,
//         height: 630,
//         alt: "SINA Institute Banner",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "SINA | Learn. Build. Succeed.",
//     description: "Professional IT Training in Robotics, AI, Digital Marketing & Software Development.",
//     images: ["https://sinainstitute.com.pk/sina.jpg"],
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    title: "SINA | Learn. Build. Succeed.",
    description:
      "SINA Institute provides professional IT training in Digital Skills, Robotics, AI, and modern technology to build future-ready professionals.",

    icons: {
      icon: "/favicon.ico",
    },

    openGraph: {
      title: "SINA | Learn. Build. Succeed.",
      description:
        "Join SINA Institute for cutting-edge IT training in Digital Marketing, Robotics, AI & Software Development.",
      url: "https://sinainstitute.com.pk",
      siteName: "SINA Institute",
      images: [
        {
          url: "https://sinainstitute.com.pk/sina.jpg",
          width: 1200,
          height: 630,
          alt: "SINA Institute Banner",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "SINA | Learn. Build. Succeed.",
      description:
        "Professional IT Training in Robotics, AI, Digital Marketing & Software Development.",
      images: ["https://sinainstitute.com.pk/sina.jpg"],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}