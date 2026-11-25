import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, ShieldCheck, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-3.5 shadow-lg shadow-black/40" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
  <img
    src="https://avatars.githubusercontent.com/u/166216392?v=4"
    alt="BA Coder"
    className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/15 group-hover:ring-indigo-400/60 transition-all"
  />
  <span
    style={{ fontFamily: "'Silkscreen', monospace" }}
    className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-cyan-300 transition-all"
  >
    BA Coder
  </span>
</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {!isAdminPage ? (
            <>
              <a href="#projects" className="hover:text-white transition-colors">
                Loyihalar
              </a>
              <a href="#skills" className="hover:text-white transition-colors">
                Ko‘nikmalar
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                Men haqimda
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Bog‘lanish
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">
              ← Asosiy saytga qaytish
            </Link>
          )}
                  
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 mt-3 px-4 py-4 space-y-3">
          {!isAdminPage && (
            <>
              <a
                href="#projects"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300 hover:text-white"
              >
                Loyihalar
              </a>
              <a
                href="#skills"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300 hover:text-white"
              >
                Ko‘nikmalar
              </a>
              <a
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300 hover:text-white"
              >
                Men haqimda
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300 hover:text-white"
              >
                Bog‘lanish
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}
