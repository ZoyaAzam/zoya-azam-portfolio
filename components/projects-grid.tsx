"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, FileCode2 } from "lucide-react";
import Reveal from "./reveal";
import { useViewMode } from "../lib/view-mode-context";
import { EASE_OUT, DURATION } from "../lib/motion-tokens";

interface Project {
  id: string;
  slug: string;
  ext: "live" | "internal" | "oss" | "archive";
  perms: string;
  size: string;
  title: string;
  client: string;
  tags: string[];
  description: string;
  link: string | null;
  status: string;
}

/** Color is a signal, not decoration: green means genuinely live/active,
 *  red flags anything restricted, everything else stays neutral. No
 *  per-project color choices — that's how the palette drifted into a
 *  rainbow of six unrelated hues in the first place. */
function statusAccent(status: string): string {
  if (status === "PRODUCTION LIVE") return "text-[#00ff66]";
  if (status === "PROPRIETARY PIPELINE") return "text-[#ff3b30]";
  return "text-neutral-400";
}

const PROJECTS: Project[] = [
  {
    id: "PROJ-01",
    slug: "automotive-suite",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "4.2K",
    title: "B2B/B2C Automotive E-Commerce Suite",
    client: "Awamine FZC LLC",
    tags: ["PHP 8.3", "Laravel 11", "Amazon SP-API", "eBay API", "Redis"],
    description:
      "High-performance multi-tier automotive e-commerce platform featuring automated catalog syncing via Amazon SP-API, chassis filtering, and multi-role B2B bulk pricing engines.",
    link: "https://mineautoparts.com",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-02",
    slug: "websocket-scraper",
    ext: "internal",
    perms: "-rw-------",
    size: "2.8K",
    title: "WebSocket Automotive Scraper Extension",
    client: "Internal Tooling",
    tags: ["JavaScript", "Chrome API", "WebSockets", "Pusher", "Laravel"],
    description:
      "Browser-native web scraping extension with asynchronous WebSocket broadcasting. Directly ingests complex external automotive catalog chassis data into database queues.",
    link: null,
    status: "PROPRIETARY PIPELINE",
  },
  {
    id: "PROJ-03",
    slug: "billing-invoicing-engine",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "3.1K",
    title: "Billing, Invoicing & Quotation Engine",
    client: "iqtechworld.com",
    tags: ["Laravel", "Stripe / Telr", "Subscription Billing", "Dynamic PDF", "CSS Print API"],
    description:
      "Custom financial automation spanning UAE bank cheque printing, one-time and monthly-subscription billing, and a quotation-to-invoice workflow covering both COD and card-to-payout invoices.",
    link: "https://iqtechworld.com",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-04",
    slug: "sabeel-e-rahat",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "1.6K",
    title: "Sabeel-e-Rahat Foundation Platform",
    client: "Sabeel-e-Rahat Foundation",
    tags: ["Cloudflare Pages", "HTML5", "Tailwind CSS", "DNS Routing"],
    description:
      "High-availability static community platform hosted on Cloudflare Pages edge CDN, optimized for zero latency and high mobile performance.",
    link: "https://sabeelerahat.org",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-05",
    slug: "null2one-visualizer",
    ext: "oss",
    perms: "-rw-r--r--",
    size: "5.4K",
    title: "Null2One CS Algorithm Visualizer",
    client: "YouTube Masterclass Series",
    tags: ["Python", "Manim CS", "C++", "Graph Theory"],
    description:
      "Custom programmatic animation pipelines built with Python and Manim to visually break down complex CS algorithms including Dijkstra, A* search, and graph traversal.",
    link: null,
    status: "OPEN SOURCE CONTENT",
  },
  {
    id: "PROJ-06",
    slug: "merchant-feed-pipeline",
    ext: "internal",
    perms: "-rw-------",
    size: "3.4K",
    title: "Automated Marketplace Feed Pipeline",
    client: "Awamine FZC LLC",
    tags: ["Laravel", "Google Merchant Center API", "XML Feed Generation", "Scheduled Jobs"],
    description:
      "Scheduled pipeline that generates schema-compliant XML product feeds and pushes them to Google Merchant Center unattended, keeping live pricing and inventory in sync without manual re-uploads.",
    link: null,
    status: "PROPRIETARY PIPELINE",
  },
  {
    id: "PROJ-07",
    slug: "designer-upload-gate",
    ext: "internal",
    perms: "-rw-------",
    size: "2.1K",
    title: "Designer Upload Validation Gate",
    client: "Awamine FZC LLC — mineautoparts.com",
    tags: ["Laravel", "Cloudflare R2", "Image Dimension Validation", "Drag-and-Drop Upload"],
    description:
      "Pre-upload gate for the design team: blocks a product image from being uploaded unless it matches exact, SEO-optimized dimensions, then pushes approved assets straight to a Cloudflare R2 bucket.",
    link: null,
    status: "PROPRIETARY PIPELINE",
  },
  {
    id: "PROJ-08",
    slug: "firstaxisparts",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "3.6K",
    title: "FirstAxisParts.com — Sister Platform",
    client: "Awamine FZC LLC",
    tags: ["Laravel", "Pusher", "MySQL", "REST API"],
    description:
      "Sole developer for this sister platform's backend and schema — built the admin-side event receiver that ingests live Pusher events streamed from MineAutoParts to keep both storefronts consistent.",
    link: "https://firstaxisparts.com",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-09",
    slug: "carsparepartsdubai",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "2.9K",
    title: "MineAutoParts.com — Partner Platform",
    client: "Awamine FZC LLC",
    tags: ["Laravel", "MySQL", "Cart & Checkout"],
    description:
      "Supplier and product-management backend modules built alongside the storefront's cart and checkout logic.",
    link: "https://mineautoparts.com/partner",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-10",
    slug: "ifcs-blog-cms",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "2.2K",
    title: "IFCS — Blog CMS & Service Pages",
    client: "ifcsuae.com",
    tags: ["Laravel", "RBAC", "Blade", "Draft/Publish Workflow"],
    description:
      "Blog CMS backend with a draft/publish editorial workflow and RBAC-controlled dynamic service pages.",
    link: "https://ifcsuae.com",
    status: "PRODUCTION LIVE",
  },
  {
    id: "PROJ-11",
    slug: "ecommerce-lms",
    ext: "archive",
    perms: "-r--r--r--",
    size: "6.1K",
    title: "E-Commerce Learning Management System",
    client: "Final Year Project — University of Punjab",
    tags: ["CodeIgniter", "Zoom API", "Stripe", "JazzCash"],
    description:
      "CodeIgniter-based LMS integrating the Zoom API for live sessions and dual payment gateways (Stripe, JazzCash), with dynamic quiz, assignment, certificate, and real-time discussion modules.",
    link: null,
    status: "FINAL YEAR PROJECT",
  }
];

function JsonViewer({ data }: { data: unknown }) {
  const lines = JSON.stringify(data, null, 2).split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const html = line
          .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
          .replace(/: "([^"]*)"/g, ': <span class="text-[#00ff66]">"$1"</span>');
        return (
          // eslint-disable-next-line react/no-danger
          <div key={i} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />
        );
      })}
    </>
  );
}

export default function ProjectsGrid() {
  const { mode } = useViewMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = PROJECTS[activeIndex];

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, PROJECTS.length - 1);
      setActiveIndex(next);
      rowRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(activeIndex - 1, 0);
      setActiveIndex(prev);
      rowRefs.current[prev]?.focus();
    }
  };

  return (
    <section className="border-t border-neutral-800 bg-[#0d0d0d] py-16 px-4 md:px-8 text-[#f4f4f0]">
      {/* Header */}
      <Reveal className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-mono text-[#00ff66] tracking-widest uppercase">
            // SECTION 03 :: PRODUCTION DEPLOYMENTS
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 uppercase font-mono">
            Featured Projects & Systems
          </h2>
        </div>
        <p className="text-xs font-mono text-neutral-500">
          {mode === "gui"
            ? "zoya@dev-station:~/projects$ ls -la"
            : "zoya@dev-station:~/projects$ cat projects.json"}
        </p>
      </Reveal>

      <Reveal className="max-w-7xl mx-auto border border-neutral-800 bg-[#0a0a0a]">
        <AnimatePresence mode="wait">
          {mode === "gui" ? (
            <motion.div
              key="gui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
              className="grid grid-cols-1 lg:grid-cols-[380px_1fr]"
            >
              {/* Index list */}
              <div
                role="listbox"
                aria-label="Projects"
                onKeyDown={onListKeyDown}
                className="border-b lg:border-b-0 lg:border-r border-neutral-800 font-mono text-xs"
              >
                {PROJECTS.map((p, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={p.id}
                      ref={(el) => {
                        rowRefs.current[i] = el;
                      }}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => setActiveIndex(i)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 border-l-2 transition-colors ${
                        isActive
                          ? "bg-neutral-900 border-l-[#00ff66]"
                          : "border-l-transparent hover:bg-neutral-900/50"
                      }`}
                    >
                      <FileCode2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? "text-[#00ff66]" : "text-neutral-600"
                        }`}
                      />
                      <span className="text-neutral-600 hidden sm:inline">{p.perms}</span>
                      <span className="text-neutral-600 hidden sm:inline w-10 text-right">
                        {p.size}
                      </span>
                      <span
                        className={`truncate ${
                          isActive ? "text-[#f4f4f0]" : "text-neutral-400"
                        }`}
                      >
                        {p.slug}
                        <span className="text-neutral-600">.{p.ext}</span>
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-3.5 bg-[#00ff66] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Preview pane */}
              <div className="p-6 md:p-8 min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE_OUT }}
                  >
                    <div className="font-mono text-[11px] text-neutral-600 mb-4 pb-3 border-b border-neutral-800">
                      ── ~/projects/{active.slug}.{active.ext} ──
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-neutral-500">{active.id}</span>
                      <span className={`font-mono text-[10px] ${statusAccent(active.status)}`}>
                        {active.status}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-mono text-neutral-100 mb-2">
                      {active.title}
                    </h3>
                    <div className="text-xs font-mono text-neutral-500 mb-4">
                      CLIENT / CONTEXT: <span className="text-neutral-300">{active.client}</span>
                    </div>

                    <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-6 max-w-2xl">
                      {active.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[11px]">
                      {active.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#121212] border border-neutral-800 text-neutral-400 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {active.link ? (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#00ff66] hover:underline"
                      >
                        <span>$ open {active.link.replace("https://", "")}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>
                          {active.ext === "archive"
                            ? "read-only — academic archive"
                            : "permission denied — internal repo"}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="api"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
              className="p-6 md:p-8"
            >
              <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto text-neutral-300 font-mono">
                <JsonViewer
                  data={PROJECTS.map((p) => ({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    client: p.client,
                    status: p.status,
                    tags: p.tags,
                    link: p.link
                  }))}
                />
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}