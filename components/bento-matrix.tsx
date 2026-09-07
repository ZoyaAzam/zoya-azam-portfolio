"use client";

import {
  Database,
  Server,
  Zap,
  Globe,
  Radio,
  RefreshCw,
  Lock
} from "lucide-react";
import TiltCard, { TiltCol } from "./tilt-card";
import QueueSimulator from "./queue-simulator";
import Reveal from "./reveal";

export default function BentoMatrix() {
  return (
    <section className="border-t border-neutral-800 bg-[#0d0d0d] py-16 px-4 md:px-8 text-[#f4f4f0]">
      {/* Header */}
      <Reveal className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-mono text-[#00ff66] tracking-widest uppercase">
            // SECTION 02 :: ARCHITECTURE MATRIX
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 uppercase font-mono">
            System Engineering & Capabilities
          </h2>
        </div>
        <p className="text-xs font-mono text-neutral-400 max-w-md">
          High-concurrency backend pipelines, automated queue workers, and multi-tenant e-commerce APIs.
        </p>
      </Reveal>

      {/* Grid Matrix — a real CSS Grid so subgrid children can inherit its column tracks */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card 1: Redis Queue Cluster + live simulator (2 cols, subgrid) */}
        <TiltCard
          subgrid
          className="md:col-span-2 bg-[#121212] border border-neutral-800 p-6 hover:border-neutral-700"
        >
          <TiltCol span={2}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00ff66]" />
                <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,3.4cqw,0.875rem)]">
                  Redis Queue & Worker Cluster
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[#00ff66]/30 bg-[#00ff66]/10 text-[#00ff66] whitespace-nowrap">
                HORIZON ACTIVE
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-6 font-sans">
              Click dispatch to trace a real payload through the same hops production jobs take: ingress, Redis queue, worker execution, and a Pusher WebSocket broadcast back to the client.
            </p>
          </TiltCol>
          <TiltCol span={2}>
            <QueueSimulator />
          </TiltCol>
        </TiltCard>

        {/* Card 2: API Integrations & Gateways (2 cols, subgrid) */}
        <TiltCard
          subgrid
          className="md:col-span-1 lg:col-span-2 bg-[#121212] border border-neutral-800 p-6 hover:border-neutral-700"
        >
          <TiltCol span={2}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-neutral-400" />
                <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,3.4cqw,0.875rem)]">
                  API Integrations & Gateways
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">REST / SOAP</span>
            </div>
            <p className="text-sm text-neutral-400 mb-6 font-sans">
              OAuth2-authenticated integrations across Amazon SP-API, eBay, and Google Merchant Center for marketplace sync; Stripe, Telr, and JazzCash for payments; Twilio, SMSala, and Zoom for communications — each rate-limited and retry-safe.
            </p>
          </TiltCol>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono [grid-column:1/-1]">
            <div className="bg-[#0a0a0a] border border-neutral-800 p-3">
              <div className="text-neutral-500 text-[10px] uppercase">Marketplaces</div>
              <div className="text-neutral-200 font-semibold mt-1">Amazon SP-API & eBay</div>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-800 p-3">
              <div className="text-neutral-500 text-[10px] uppercase">Payments</div>
              <div className="text-neutral-200 font-semibold mt-1">Stripe · Telr · JazzCash</div>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-800 p-3">
              <div className="text-neutral-500 text-[10px] uppercase">Comms & Auth</div>
              <div className="text-neutral-200 font-semibold mt-1">Twilio · SMSala · Zoom · OAuth2</div>
            </div>
          </div>
        </TiltCard>

        {/* Card 3: Cloud & Object Storage (1 col) */}
        <TiltCard className="bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-neutral-400" />
              <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,4cqw,0.875rem)]">
                Cloud Pipeline
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-4 font-sans">
              Edge CDN assets, Cloudflare R2 object storage buckets, and automated server backup scripts.
            </p>
          </div>
          <div className="font-mono text-xs border-t border-neutral-800 pt-3 text-neutral-400 space-y-1">
            <div>• Cloudflare R2 / Pages</div>
            <div>• S3 Object Storage</div>
            <div>• Local SSL & Docker</div>
          </div>
        </TiltCard>

        {/* Card 4: WebSockets & Extension Scraping (2 cols) */}
        <TiltCard className="md:col-span-2 bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#00ff66]" />
                <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,3.4cqw,0.875rem)]">
                  Real-Time WebSockets & Scrapers
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00ff66] border border-[#00ff66]/30 bg-[#00ff66]/10 px-2 py-0.5 whitespace-nowrap">
                PUSHER / WS
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-4 font-sans">
              Browser-extension scrapers communicating via WebSockets and Pusher channels to extract automotive catalog chassis data into live database pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0a0a0a] border border-neutral-800 p-3 font-mono text-xs">
            <RefreshCw className="w-4 h-4 text-[#00ff66] animate-spin" />
            <div className="text-neutral-300">
              <span className="text-neutral-500">Live Socket Event:</span>{" "}
              <span className="text-[#00ff66]">catalog.chassis.scraped</span>
            </div>
          </div>
        </TiltCard>

        {/* Card 5: Database Optimization (1 col) */}
        <TiltCard className="bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-neutral-400" />
              <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,4cqw,0.875rem)]">
                Database Engine
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-4 font-sans">
              Relational database schema design, index optimization, and custom migration pipelines.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-400 border-t border-neutral-800 pt-3">
            <div className="text-neutral-200 font-semibold">MySQL 8.x / MariaDB</div>
            <div className="text-[11px] text-neutral-500 mt-1">Indexed queries & Eloquent ORM</div>
          </div>
        </TiltCard>

        {/* Card 6: Security & Access Control (1 col) */}
        <TiltCard className="bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[#ff3b30]" />
              <span className="font-mono text-sm uppercase font-semibold text-neutral-200 [font-size:clamp(0.7rem,4cqw,0.875rem)]">
                Security & Access Control
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-4 font-sans">
              RBAC scoped across 5 distinct roles, OAuth2/token auth on every integration, and server-side validation gates that make publishing non-compliant data structurally impossible.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-400 border-t border-neutral-800 pt-3 space-y-1">
            <div>• 5-role scoped RBAC</div>
            <div>• DB reconnection for high availability</div>
            <div>• Sole/lead ownership of 6 production platforms</div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}