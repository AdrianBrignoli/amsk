import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import Menu from "./components/shared/base-elements/Menu";
import Footer from "./components/shared/base-elements/Footer";
import { Providers } from "./components/Providers";
import "./styles/globals.css";
import { ErrorBoundary } from "./components/error-bondaries/ErrorBoundary";
import { ReduxProvider } from "@/providers/ReduxProvider";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // Define the weights you need
  style: ["normal", "italic"], // Include italic if needed
});

export const metadata: Metadata = {
  title: "Märsta skidklubb",
  description: "Märsta skidklubbs hemsida",
  themeColor: "#1e293b", // Dark theme color for mobile browsers
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-navbutton-color" content="#1e293b" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={robotoCondensed.className}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <ReduxProvider>
            <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 via-sky-950 to-gray-800 film-grain">
              <Menu />
              <Providers>{children}</Providers>
            </div>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
