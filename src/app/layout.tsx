import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import Menu from "./components/shared/base-elements/Menu";
import Footer from "./components/shared/base-elements/Footer";
import { Providers } from "./components/Providers";
import "./styles/globals.scss";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <ReduxProvider>
            <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 via-sky-950 to-gray-800 film-grain">
              <Menu />
              <Providers>{children}</Providers>
            </div>
          </ReduxProvider>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
