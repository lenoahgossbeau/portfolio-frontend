'use client';
import React, { useEffect, useState, useRef } from 'react';
import { TfiWorld } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa6";
import Hamburger from 'hamburger-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';
import { API_BASE_URL } from '@/lib/api';

const sections = ["home", "project", "publication", "resume", "about"];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { language, changeLanguage } = useLanguage();

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link indicator
  useEffect(() => {
    const handleActiveSection = () => {
        let current = "home";

        sections.forEach(section => {
            const el = document.getElementById(section);
            if (!el) return;

            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                current = section;
            }
        });

        setActive(current);
    }

    handleActiveSection();

    window.addEventListener("scroll", handleActiveSection);
    window.addEventListener("resize", handleActiveSection);

    return () => {
        window.removeEventListener("scroll", handleActiveSection);
        window.removeEventListener("resize", handleActiveSection);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  // Fermer le menu hamburger quand on clique en dehors
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Déconnexion
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  // Changement de langue
  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow ${
      scrolled ? "shadow-md" : ""
    } border-b border-[#ADADAD]`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 text-sm">

        {/* LEFT */}
        <div>
          <div className="font-semibold text-lg text-[#5F5F5F]">Ekwoge Junior</div>
          <div className="font-light text-[#AAAAAA]">{t('software_engineer', language)}</div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8">
          {sections.map(item => (
            <a
              key={item}
              href={`#${item}`}
              className={`relative hover:text-[#363636] transition ${
                active === item ? "text-black font-medium" : "text-[#5F5F5F]"
              }`}
            >
              {active === item && (
                <span className="absolute -left-3 top-[7px] w-[7px] h-[7px] bg-[#8A9DB4] rounded-full" />
              )}
              {item === "about" ? t('nav_about_me', language) : t(`nav_${item}`, language)}
            </a>
          ))}
        </div>

        {/* AUTH BUTTON + LANGUAGE DROPDOWN */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
            >
              {t('logout', language)}
            </button>
          ) : (
            <a
              href="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
            >
              {t('login', language)}
            </a>
          )}

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 hover:text-[#363636] cursor-pointer"
            >
              <TfiWorld className="text-[#5F5F5F]" />
              <span className="text-[#5F5F5F]">{language}</span>
              <FaChevronDown className='text-xs text-[#5F5F5F]' />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                {["EN", "FR"].map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE HAMBURGER */}
      <div ref={menuRef} className='md:hidden'>
        <button className="text-[#5F5F5F] absolute top-3 right-2" aria-label="Toggle Menu">
          <Hamburger size={22} toggled={open} toggle={setOpen} />
        </button>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center py-6 space-y-4 border-t border-[#ADADAD]">
            {sections.map(item => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={closeMenu}
                  className={`${active === item ? "font-semibold text-black" : "text-[#5F5F5F]"} hover:text-[#363636]`}
                >
                  {item === "about" ? t('nav_about_me', language) : t(`nav_${item}`, language)}
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 hover:text-[#363636] cursor-pointer"
              >
                <TfiWorld className="text-[#5F5F5F]" />
                <span className="text-[#5F5F5F]">{language}</span>
                <FaChevronDown className='text-xs text-[#5F5F5F]' />
              </button>

              {langOpen && (
                <div className="absolute right-48 flex -mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
                  {["EN", "FR"].map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Mobile Auth Button */}
            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full"
                >
                  {t('logout', language)}
                </button>
              ) : (
                <a
                  href="/auth/login"
                  onClick={closeMenu}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition block text-center"
                >
                  {t('login', language)}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}