'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { BsBoxArrowDown } from 'react-icons/bs';

export default function menu() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileStyling, setIsMobileStyling] = useState(false);
  const styling =
    'h-20 flex items-center justify-center text-center menu-item px-8 hover:bg-gray-700';

  const menuIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      menuIconRef.current,
      { x: -250, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const handleScroll = () => {
    const position = window.scrollY;
    const scrollingDown = position > scrollPosition;
    setIsScrollingDown(scrollingDown);
    setScrollPosition(position);

    if (scrollingDown && !isMenuVisible) {
      setIsMenuVisible(false);
    } else {
      setIsMenuVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.left = isMenuOpen ? '0' : '-24rem';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobileStyling(true);
      } else {
        setIsMobileStyling(false);
      }
    };
    // Check the window size on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`absolute w-full h-full bg-black bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out ${
          isMenuOpen && isMobileStyling
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      <nav
        id="menu-desktop"
        className="bg-gray-950 bg-opacity-80 h-20 fixed text-white lg:text-white w-full lg:flex text-gray-800 justify-between items-center z-10"
        style={{ display: isMenuVisible ? 'flex' : 'none' }}
      >
        <div
          id="blur"
          className="backdrop-blur-3xl h-full w-full absolute -z-30"
        ></div>

        <Link href="/">
          <Image
            id="logo"
            src="/logo.webp"
            alt="Ski Logo"
            width={60}
            height={60}
            className={`my-auto justify-center w-18 lg:ml-32 mx-0 lg:relative lg:top-0 absolute top-2 left-2 transition-left duration-300 ease-in-out ${
              isMenuOpen && isMobileStyling ? 'left-[7rem]' : 'left-2'
            }`}
          />
        </Link>

        <img
          src="/menu-icon.svg"
          alt="mountain"
          className="block lg:hidden absolute right-0 top-4 h-12 w-12 z-10 mr-4"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        <div id="menu">
          <Link href="/" onClick={() => setIsMenuOpen((prev) => !prev)}>
            <div className={styling}>
              <p className="hover:scale-90 transition-transform duration-300">
                Hem
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/news"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className={styling}>
              <p className="hover:scale-90 transition-transform duration-300">
                Nyheter
              </p>
            </div>
          </Link>
          <div className="lg:hidden">
            <Link
              href="/dashboard/association"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <div className={styling}>
                <p className="hover:scale-90 transition-transform duration-300">
                  Förening
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/traningsverksamhet"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <div className={styling}>Träningsverksamhet</div>
            </Link>
            <Link
              href="/dashboard/arrangemang"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <div className={styling}>Arrangemang</div>
            </Link>
          </div>
          <Link
            href="/dashboard/competition"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className={styling}>
              <p className="hover:scale-90 transition-transform duration-300">
                Tävling
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/contact"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className={styling}>
              <p className="hover:scale-90 transition-transform duration-300">
                Kontakt
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/lankar"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className={styling}>
              <p className="hover:scale-90 transition-transform duration-300">
                Länkar
              </p>
            </div>
          </Link>
          <div
            className="relative w-52"
            onMouseEnter={() => setIsDropDownVisible(true)}
            onMouseLeave={() => setIsDropDownVisible(false)}
          >
            <div className="w-1 h-3/4 bg-white bg-opacity-20 absolute left-0 top-[0.5em]"></div>
            <div className={`${styling} hidden lg:flex`}>
              Om oss
              <BsBoxArrowDown className="ml-4" />
            </div>

            <div className="absolute -z-10 left-0 overflow-hidden">
              <div
                className={` bg-gray-950 bg-opacity-80 shadow-lg transform transition-all duration-300 ease-in-out -right-8 backdrop-blur-3xl ${
                  isDropDownVisible ? 'translate-y-0' : 'translate-y-[-400px]'
                }`}
              >
                <Link
                  href="/dashboard/association"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  <div className={styling}>
                    <p className="hover:scale-90 transition-transform duration-300">
                      Förening
                    </p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/traningsverksamhet"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  <div className={styling}>Träningsverksamhet</div>
                </Link>
                <Link
                  href="/dashboard/arrangemang"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  <div className={styling}>Arrangemang</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
