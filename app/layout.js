import "@/app/styles/globals.scss";
import "@/src/lib/swiper/swiper.css";
import "@/src/lib/swiper/modules/effect-cards.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="keywords"
          content="Spacify Asia"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=1"
          name="viewport"
        />
        <meta name="theme-color" content="#d71440" />
        <meta name="msapplication-navbutton-color" content="#d71440" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#d71440" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/*<link*/}
        {/*  rel="stylesheet"*/}
        {/*  href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"*/}
        {/*/>*/}
      </Head>
      <body>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
