import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import Menu from './components/Menu';
import Banner from './components/Banner';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { Providers } from './components/Providers';
import Image from 'next/image';
import './globals.css';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'], // Define the weights you need
  style: ['normal', 'italic'], // Include italic if needed
});

export const metadata: Metadata = {
  title: 'Märsta skidklubb',
  description: 'Märsta skidklubbs hemsida',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        {/* from-[#2C3093] via-purple-900 to-[#EA5661]*/}
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 via-sky-950 to-gray-800 film-grain">
          <Menu />
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
