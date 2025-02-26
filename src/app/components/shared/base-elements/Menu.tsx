"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useScrollPosition } from "@/app/hooks/useScrollPosition";

interface MenuItem {
  label: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Hem", href: "/" },
  { label: "Nyheter", href: "/dashboard/nyheter" },
  { label: "Tävling", href: "/dashboard/tavlingar" },
  { label: "Kontakt", href: "/dashboard/kontakt" },
  { label: "Länkar", href: "/dashboard/lankar" },
  { label: "Om oss", href: "/dashboard/om-oss" },
];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isVisible = useScrollPosition(isMenuOpen);

  const menuItemStyle = `
    h-20 flex items-center justify-center text-center
    min-w-[8em]
    px-8 
    text-xl sm:text-sm
    transition-all duration-300 ease-in-out
    group
    relative after:content-[''] after:absolute after:w-0 after:h-[2px] 
    after:bg-white after:bottom-0 after:left-0
    hover:after:w-full after:transition-all after:duration-300
    whitespace-nowrap
  `;

  const menuTextStyle = `
    transform transition-all duration-300 ease-in-out
    group-hover:scale-110 group-hover:text-white
  `;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`
        fixed top-0 w-full z-50
        bg-black/60
        transition-transform duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* Backdrop overlay for mobile */}
      <div
        className={`
          fixed inset-0
          backdrop-blur-xl
          
          transition-all duration-300
          lg:hidden
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={closeMenu}
      />

      {/* Main navigation container */}
      <div className=" backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Ski Logo"
              width={60}
              height={60}
              className="relative z-50"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden relative z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-8 h-6 flex flex-col justify-between relative">
              <span
                className={`
                  w-full h-0.5 bg-white transition-all duration-300 ease-in-out origin-center
                  absolute top-1/2
                  ${
                    isMenuOpen
                      ? "rotate-45 translate-y-0 w-8"
                      : "rotate-0 -translate-y-2.5"
                  }
                `}
              />
              <span
                className={`
                  w-full h-0.5 bg-white transition-all duration-200 ease-in-out
                  absolute top-1/2 -translate-y-1/2
                  ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}
                `}
              />
              <span
                className={`
                  w-full h-0.5 bg-white transition-all duration-300 ease-in-out origin-center
                  absolute top-1/2
                  ${
                    isMenuOpen
                      ? "-rotate-45 translate-y-0 w-8"
                      : "rotate-0 translate-y-2.5"
                  }
                `}
              />
            </div>
          </button>

          {/* Navigation items */}
          <div
            className={`
              fixed lg:static inset-y-0 right-0
              w-[70%] max-w-[30em] h-screen lg:h-auto
              lg:bg-transparent
              backdrop-blur-2xl lg:backdrop-blur-none
              transition-transform duration-300 ease-in-out
              lg:translate-x-0 lg:opacity-100
              flex flex-col lg:flex-row lg:justify-end
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
              bg-black/90 backdrop-blur-2xl z-30
              pt-20 lg:pt-0
              overflow-y-auto lg:overflow-visible
            `}
          >
            {MENU_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                <div className={menuItemStyle}>
                  <span className={menuTextStyle}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
