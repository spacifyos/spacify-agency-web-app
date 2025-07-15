import "@/app/styles/globals.scss";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Spacify Asia",
  description: "Spacify Asia web app",
  keywords: ["Spacify Asia"],
  verification: {
    google: "xzSyuG_QIOpCOR6BfMK5zYb0-5UWt-jtdiE2vD4u5uI"
  },
  themeColor: "#d71440",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
      { url: "/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" }
    ]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: true,
    minimumScale: 1,
    maximumScale: 1
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "#d71440"
  },
  other: {
    "msapplication-navbutton-color": "#d71440"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
