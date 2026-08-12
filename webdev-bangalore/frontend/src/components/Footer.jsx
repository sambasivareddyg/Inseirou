import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="font-display font-black text-white text-sm">
                IS
              </span>
            </div>
            <span className="font-display font-bold text-xl text-white">
              InSeirou Labs
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Crafting exceptional digital experiences from the heart of
            Bangalore. We build scalable, beautiful, and performant web
            applications.
          </p>
          <p className="text-slate-500 text-xs mt-4">
            📍 Madiwala, Bangalore, Karnataka 560068
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
            Services
          </h4>
          <ul className="space-y-2">
            {[
              "Web Development",
              "Mobile Apps",
              "UI/UX Design",
              "Cloud Solutions",
              "DevOps",
            ].map((s) => (
              <li key={s}>
                <span className="text-slate-400 hover:text-white text-sm cursor-pointer transition-colors">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-2">
            {[
              ["About", "/about"],
              ["Projects", "/projects"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <Link
                  to={h}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs">
            © 2026 InSeirou labs. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            Made with ❤️ in Bangalore
          </p>
        </div>
      </div>
    </footer>
  );
}
