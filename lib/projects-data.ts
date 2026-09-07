export interface Project {
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
 *  red flags anything restricted, everything else stays neutral. */
export function statusAccent(status: string): string {
  if (status === "PRODUCTION LIVE") return "#00ff66";
  if (status === "PROPRIETARY PIPELINE") return "#ff3b30";
  return "#a3a3a3";
}

export const PROJECTS: Project[] = [
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
    status: "PRODUCTION LIVE"
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
    status: "PROPRIETARY PIPELINE"
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
    status: "PRODUCTION LIVE"
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
    status: "PRODUCTION LIVE"
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
    status: "OPEN SOURCE CONTENT"
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
    status: "PROPRIETARY PIPELINE"
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
    status: "PROPRIETARY PIPELINE"
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
    status: "PRODUCTION LIVE"
  },
  {
    id: "PROJ-09",
    slug: "carsparepartsdubai",
    ext: "live",
    perms: "-rwxr-xr-x",
    size: "2.9K",
    title: "CarSparePartsDubai.com",
    client: "Awamine FZC LLC",
    tags: ["Laravel", "MySQL", "Cart & Checkout"],
    description:
      "Supplier and product-management backend modules built alongside the storefront's cart and checkout logic.",
    link: "https://carsparepartsdubai.com",
    status: "PRODUCTION LIVE"
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
    status: "PRODUCTION LIVE"
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
    status: "FINAL YEAR PROJECT"
  }
];