"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Terminal,
  Mail,
  Copy,
  Check,
  Code
} from "lucide-react";
import Reveal from "./reveal";
import { useViewMode } from "../lib/view-mode-context";
import { EASE_OUT, DURATION } from "../lib/motion-tokens";

const CONTACT_EMAIL = "zoyaazam.here@gmail.com";
const CURL_CONTACT = `curl -X POST https://zoyaazam.dev/api/v1/contact \\\n  -H "Content-Type: application/json" \\\n  -d '{"subject":"role inquiry"}'`;

const CONTACT_JSON = {
  endpoint: "POST /api/v1/contact",
  status: 201,
  accepts: [
    "full-stack development roles",
    "backend architecture consultations",
    "technical inquiries"
  ],
  contact: CONTACT_EMAIL
};

function JsonViewer({ data }: { data: unknown }) {
  const lines = JSON.stringify(data, null, 2).split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const html = line
          .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
          .replace(/: "([^"]*)"/g, ': <span class="text-[#00ff66]">"$1"</span>')
          .replace(/: (-?\d+(\.\d+)?)/g, ': <span class="text-amber-400">$1</span>');
        return (
          // eslint-disable-next-line react/no-danger
          <div key={i} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />
        );
      })}
    </>
  );
}

export default function ExperienceFooter() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const { mode } = useViewMode();

  const copy = async (text: string, setFlag: (v: boolean) => void) => {
    if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    }
  };

  const timeline = [
    {
      period: "2024 — PRESENT",
      role: "Laravel Web Developer",
      organization: "Awamine FZC LLC",
      icon: Briefcase,
      accent: "text-[#00ff66]",
      details: [
        "Architected multi-tier automotive e-commerce backend pipelines (mineautoparts.com, ifcsuae.com).",
        "Engineered bulk product listing sync and inventory mutations via Amazon Selling Partner API.",
        "Built automated background queue workers in Redis and configured Pusher WebSockets for real-time catalog feeds.",
        "Developed custom financial cheque printing modules and dynamic PDF invoice generators."
      ]
    },
    {
      period: "2026 — PRESENT",
      role: "Creator & Educational Engineering Lead",
      organization: "Null2One CS Masterclass",
      icon: Code,
      accent: "text-purple-400",
      details: [
        "Authored programmatic animation scripts using Python and the Manim CS library.",
        "Produced visual masterclasses breaking down graph theory, Dijkstra's algorithm, and A* pathfinding."
      ]
    },
    {
      period: "2019 — 2023",
      role: "BS in Computer Science",
      organization: "Punjab University / Wisdom Degree College",
      icon: GraduationCap,
      accent: "text-amber-400",
      details: [
        "Specialized in backend architecture, relational database management systems (RDBMS), and software design patterns.",
        "Completed rigorous coursework in discrete mathematics, data structures, and graph algorithms."
      ]
    }
  ];

  return (
    <footer className="border-t border-neutral-800 bg-[#0d0d0d] text-[#f4f4f0]">
      {/* Timeline Section */}
      <div className="py-16 px-4 md:px-8 border-b border-neutral-800">
        <Reveal className="max-w-7xl mx-auto mb-12 border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00ff66] tracking-widest uppercase">
              // SECTION 04 :: TRACK RECORD
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 uppercase font-mono">
              Experience & Education
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md">
            Production background in web application architecture, system design, and computer science education.
          </p>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-8">
          {timeline.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Reveal
                key={index}
                distance={16}
                delay={index * 0.08}
                className="bg-[#121212] border border-neutral-800 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-neutral-700 transition-colors"
              >
                <div className="md:w-1/4 font-mono">
                  <span className={`text-xs ${item.accent} font-semibold block mb-1`}>
                    {item.period}
                  </span>
                  <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <IconComponent className="w-4 h-4" />
                    <span>{item.organization}</span>
                  </div>
                </div>

                <div className="md:w-3/4 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
                  <h3 className="text-lg font-bold font-mono text-neutral-100 mb-3">
                    {item.role}
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-400 font-sans">
                    {item.details.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-600 font-mono mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Terminal Contact Shell */}
      <div className="py-16 px-4 md:px-8 bg-[#080808]">
        <Reveal className="max-w-4xl mx-auto bg-[#101010] border border-neutral-800 p-6 md:p-8 font-mono">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Terminal className="w-4 h-4 text-[#00ff66]" />
              <span>{mode === "gui" ? "TERMINAL CONTACT SHELL" : "RAW RESPONSE :: HTTP/2 201 CREATED"}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === "gui" ? (
              <motion.div
                key="gui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
                className="space-y-4 text-xs"
              >
                <p className="text-neutral-400">
                  <span className="text-[#00ff66]">zoya@dev-station:~$</span> initiate-contact --mode=direct
                </p>
                <p className="text-neutral-300">
                  Open for full-stack software development roles, backend system architecture consultations, and technical inquiries.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => copy(CONTACT_EMAIL, setEmailCopied)}
                    className="inline-flex items-center gap-2 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] px-4 py-2 hover:bg-[#00ff66]/20 transition-colors"
                  >
                    {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{emailCopied ? "EMAIL COPIED" : "COPY EMAIL ADDRESS"}</span>
                  </button>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 border border-neutral-700 bg-neutral-900 text-neutral-300 px-4 py-2 hover:border-neutral-500 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>OPEN MAIL CLIENT</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="api"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
                className="space-y-4 text-xs"
              >
                <pre className="text-[11px] md:text-xs leading-relaxed text-neutral-300 overflow-x-auto">
                  <JsonViewer data={CONTACT_JSON} />
                </pre>

                <div className="pt-2">
                  <span className="text-[10px] text-neutral-500 block mb-2 uppercase">Reproduce this request</span>
                  <button
                    onClick={() => copy(CURL_CONTACT, setCurlCopied)}
                    className="w-full p-3 bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-600 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-[11px] text-neutral-400 whitespace-pre">{CURL_CONTACT}</span>
                    {curlCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#00ff66] shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>© {new Date().getFullYear()} ZOYA AZAM :: SYS_ID [9942-LA]</div>
            <div className="flex items-center gap-6">
              <span className="text-[#00ff66]">● NEXT.JS 15 / TAILWIND V4</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}