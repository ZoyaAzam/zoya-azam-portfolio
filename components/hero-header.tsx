"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ArrowDownRight,
  Activity,
  Wifi,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";
import { useViewMode } from "../lib/view-mode-context";

// R3F touches the DOM/WebGL context, so it must never run during SSR.
const ServerNodeCanvas = dynamic(() => import("./server-node-canvas"), {
  ssr: false
});

const API_PAYLOAD = {
  endpoint: "GET /api/v1/hero",
  status: 200,
  headers: {
    "content-type": "application/json",
    "x-framework": "Laravel 11",
    "x-powered-by": "PHP 8.3",
    "x-runtime-ms": 12
  },
  data: {
    name: "Zoya Azam",
    role: "Senior Full Stack Developer",
    stack: ["PHP 8.3", "Laravel 11", "MySQL", "Redis", "Pusher WebSockets"],
    live_platforms: ["mineautoparts.com", "firstaxisparts.com"],
    availability: "open_to_roles"
  }
};

const CURL_COMMAND = `curl -s https://zoyaazam.dev/api/v1/hero \\\n  -H "Accept: application/json"`;

/** Minimal, dependency-free JSON syntax coloring for the API view. */
function JsonViewer({ data }: { data: unknown }) {
  const lines = JSON.stringify(data, null, 2).split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const html = line
          .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
          .replace(/: "([^"]*)"/g, ': <span class="text-[#00ff66]">"$1"</span>')
          .replace(/: (-?\d+(\.\d+)?)/g, ': <span class="text-amber-400">$1</span>')
          .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>');
        return (
          // eslint-disable-next-line react/no-danger
          <div key={i} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />
        );
      })}
    </>
  );
}

export default function HeroHeader() {
  const [ping, setPing] = useState<number>(12);
  const [sshCopied, setSshCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { mode, toggle } = useViewMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 5) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = async (
    text: string,
    setFlag: (v: boolean) => void
  ) => {
    if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  const copySSHKey = () =>
    copyToClipboard(
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIZoyaAzamBackendEng2026 zoyaazam.here@gmail.com",
      setSshCopied
    );

  const copyCurl = () => copyToClipboard(CURL_COMMAND, setCurlCopied);

  return (
    <header
      ref={heroRef}
      className="relative w-full bg-[#0d0d0d] text-[#f4f4f0] border-b border-neutral-800 font-sans selection:bg-[#ff3b30] selection:text-white overflow-hidden"
    >
      <ServerNodeCanvas eventSource={heroRef} />

      {/* ================= TOP EDITORIAL BAR ================= */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 border-b border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400">
        <div className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r border-neutral-800 flex items-center justify-between bg-[#0d0d0d]/80 backdrop-blur-sm">
          <span className="font-bold text-[#f4f4f0] tracking-wider">ZOYA AZAM</span>
          <span className="text-neutral-500">[SYS_ID: 9942-LA]</span>
        </div>

        <div className="md:col-span-5 p-4 border-b md:border-b-0 md:border-r border-neutral-800 flex items-center gap-3 bg-[#0d0d0d]/80 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66]" />
          </span>
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-[#00ff66]" />
            <span className="text-[#f4f4f0] font-semibold">PUSHER_WS: ONLINE</span>
            <span className="text-neutral-500">({ping}ms LATENCY)</span>
          </div>
        </div>

        <div className="md:col-span-3 p-4 flex items-center bg-neutral-900/60 backdrop-blur-sm">
          <button
            onClick={toggle}
            aria-pressed={mode === "api"}
            className="w-full flex items-center justify-between text-neutral-300 hover:text-[#00ff66] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00ff66] focus-visible:outline-offset-2"
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#ff3b30]" />
              {mode === "gui" ? "GUI MODE" : "API MODE"}
            </span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-[10px] text-neutral-300 font-mono">
              TOGGLE
            </kbd>
          </button>
        </div>
      </div>

      {/* ================= HERO MAIN ================= */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[75vh]">
        <AnimatePresence mode="wait">
          {mode === "gui" ? (
            <motion.div
              key="gui"
              className="contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left Column: Editorial Headline */}
              <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between bg-[#0d0d0d]/70 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 font-mono text-xs text-[#ff3b30] mb-8">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SENIOR FULL STACK DEVELOPER</span>
                  </div>

                  <h1 className="text-[clamp(2.75rem,7vw+1rem,7.5rem)] font-black uppercase tracking-tight leading-[0.9] text-[#f4f4f0] mb-8">
                    ARCHITECTING <br />
                    <span className="scroll-reveal text-transparent bg-clip-text bg-gradient-to-r from-[#f4f4f0] via-neutral-400 to-neutral-600">
                      HIGH-THROUGHPUT
                    </span>{" "}
                    <br />
                    SYSTEMS.
                  </h1>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-neutral-800/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <p className="text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
                    Full stack developer specializing in PHP 8.x, Laravel 11, Redis queues, and real-time Pusher WebSockets. Building resilient multi-role B2B/B2C e-commerce platforms and automated REST APIs.
                  </p>

                  <div className="flex flex-col justify-end gap-3 font-mono text-xs">
                    <a
                      href="#case-studies"
                      className="group flex items-center justify-between p-4 bg-[#f4f4f0] text-[#0d0d0d] font-bold tracking-wider uppercase hover:bg-[#ff3b30] hover:text-white transition-colors duration-200"
                    >
                      <span>EXPLORE ARCHITECTURE</span>
                      <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Technical Metadata Matrix */}
              <div className="lg:col-span-4 bg-[#141414]/85 backdrop-blur-[2px] p-6 md:p-10 flex flex-col justify-between font-mono">
                <div className="space-y-8">
                  <div className="border-b border-neutral-800 pb-4 flex justify-between items-center">
                    <span className="text-xs text-neutral-500 uppercase">SYSTEM SPECIFICATION</span>
                    <Activity className="w-4 h-4 text-neutral-600" />
                  </div>

                  <div className="space-y-6 text-xs">
                    <div>
                      <span className="text-neutral-500 block mb-1">CORE STACK</span>
                      <p className="text-[#f4f4f0] font-semibold text-sm">PHP 8.3 / LARAVEL 11 / JAVASCRIPT / MYSQL</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">EVENT DISPATCH & REAL-TIME</span>
                      <p className="text-[#f4f4f0] font-semibold text-sm">PUSHER / LARAVEL ECHO / WEBSOCKETS</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">CLOUD & STORAGE</span>
                      <p className="text-[#f4f4f0] font-semibold text-sm">CLOUDFLARE R2 CDN / AWS S3 / GIT</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">APIS & MARKETPLACES</span>
                      <p className="text-[#f4f4f0] font-semibold text-sm">AMAZON SP-API / EBAY / STRIPE / TELR / JAZZCASH</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">LIVE PLATFORMS SHIPPED</span>
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#ff3b30]">
                        <a href="https://mineautoparts.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          mineautoparts.com <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <span>•</span>
                        <a href="https://firstaxisparts.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          firstaxisparts.com <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <span>•</span>
                        <a href="#section-projects" className="text-neutral-400 hover:text-[#f4f4f0] hover:underline">
                          +4 more ↓
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block mb-2 uppercase">PUBLIC SSH KEY SUITE</span>
                  <button
                    onClick={copySSHKey}
                    className="w-full p-3 bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-600 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-[11px] text-neutral-400 truncate pr-2">
                      ssh-ed25519 AAAAC3NzaC1lZDI1... zoyaazam.here@gmail.com
                    </span>
                    {sshCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#00ff66] shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="api"
              className="lg:col-span-12 p-6 md:p-12 lg:p-16 bg-[#080808]/90 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-3xl mx-auto font-mono">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6 text-xs text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00ff66]" />
                    RAW RESPONSE :: HTTP/2 200 OK
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 inline-block" />
                  </div>
                </div>

                <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto text-neutral-300">
                  <JsonViewer data={API_PAYLOAD} />
                </pre>

                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block mb-2 uppercase">Reproduce this request</span>
                  <button
                    onClick={copyCurl}
                    className="w-full p-3 bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-600 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-[11px] text-neutral-400 whitespace-pre">{CURL_COMMAND}</span>
                    {curlCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#00ff66] shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scroll-reveal {
          animation: trackIn linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 40%;
        }
        @keyframes trackIn {
          from {
            letter-spacing: -0.02em;
            opacity: 0.45;
          }
          to {
            letter-spacing: 0em;
            opacity: 1;
          }
        }
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: none;
            opacity: 1;
            letter-spacing: 0em;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal {
            animation: none;
            opacity: 1;
            letter-spacing: 0em;
          }
        }
      `}</style>
    </header>
  );
}