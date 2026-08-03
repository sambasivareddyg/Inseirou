import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-2xl" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center glow group-hover:scale-110 transition-transform">
            <span className="font-display font-black text-white text-sm">
              IS
            </span>
          </div>
          <span className="font-display font-bold text-xl text-white">
            InSeirou
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === l.to
                    ? "text-brand-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:glow hover:scale-105"
        >
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-slate-300 hover:text-white border-b border-white/10 last:border-0 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
