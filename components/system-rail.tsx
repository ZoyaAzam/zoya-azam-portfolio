"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { useViewMode } from "../lib/view-mode-context";

const SECTIONS = [
  { id: "section-hero", label: "HERO" },
  { id: "section-matrix", label: "MATRIX" },
  { id: "section-projects", label: "PROJECTS" },
  { id: "section-contact", label: "CONTACT" }
];

export default function SystemRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { mode, toggle } = useViewMode();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 h-screen w-14 z-40 flex-col items-center justify-between py-6 border-r border-neutral-800 bg-[#0d0d0d]/70 backdrop-blur-sm"
      aria-label="Section navigation"
    >
      <div className="text-[10px] font-mono text-neutral-500 [writing-mode:vertical-rl] tracking-widest uppercase">
        ZOYA AZAM // SYS_ID 9942-LA
      </div>

      <nav className="flex flex-col items-center gap-5">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex flex-col items-center gap-1.5"
            aria-current={activeIndex === i ? "true" : undefined}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                activeIndex === i
                  ? "bg-[#00ff66]"
                  : "bg-neutral-700 group-hover:bg-neutral-500"
              }`}
            />
            <span
              className={`text-[9px] font-mono [writing-mode:vertical-rl] tracking-widest transition-colors ${
                activeIndex === i ? "text-[#00ff66]" : "text-neutral-600"
              }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggle}
          aria-pressed={mode === "api"}
          className="text-[9px] font-mono [writing-mode:vertical-rl] tracking-widest text-neutral-400 hover:text-[#00ff66] transition-colors flex items-center gap-1.5"
        >
          <Terminal className="w-3 h-3 rotate-90" />
          {mode === "gui" ? "GUI" : "API"}
        </button>
        <div className="relative w-px h-16 bg-neutral-800">
          <div
            className="absolute left-0 top-0 w-px bg-[#00ff66] transition-[height] duration-150"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}