"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Server, Layers, Cpu, Radio, Send } from "lucide-react";

interface Stage {
  key: string;
  label: string;
  icon: typeof Server;
  minMs: number;
  maxMs: number;
}

const STAGES: Stage[] = [
  { key: "router", label: "Router / Ingress", icon: Server, minMs: 2, maxMs: 6 },
  { key: "queue", label: "Redis Queue (Horizon)", icon: Layers, minMs: 8, maxMs: 18 },
  { key: "worker", label: "Worker Process", icon: Cpu, minMs: 20, maxMs: 55 },
  { key: "socket", label: "Pusher WS Broadcast", icon: Radio, minMs: 4, maxMs: 10 }
];

const STAGE_POSITIONS = [0, 33.333, 66.666, 100];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const randomHop = (stage: Stage) =>
  Math.floor(Math.random() * (stage.maxMs - stage.minMs + 1)) + stage.minMs;
const genId = () => Math.random().toString(16).slice(2, 7);

interface ActivePayload {
  id: string;
  stage: number; // -1 = not yet at a node, 0-3 = at/traveling to that node index
}

export default function QueueSimulator() {
  const [active, setActive] = useState<ActivePayload | null>(null);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [lastRoundTrip, setLastRoundTrip] = useState<number | null>(null);
  const [latencies, setLatencies] = useState<Record<string, number>>({});
  const [log, setLog] = useState<{ id: number; text: string; tone: string }[]>([
    { id: 0, text: "simulator idle — awaiting dispatch", tone: "text-neutral-500" }
  ]);

  const queueRef = useRef<string[]>([]);
  const processingRef = useRef(false);
  const logIdRef = useRef(1);
  const logBoxRef = useRef<HTMLDivElement>(null);

  const pushLog = (text: string, tone = "text-neutral-400") => {
    setLog((prev) => {
      const next = [...prev, { id: logIdRef.current++, text, tone }];
      return next.length > 40 ? next.slice(next.length - 40) : next;
    });
  };

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [log]);

  const runPayload = async (id: string) => {
    setActive({ id, stage: -1 });
    pushLog(`▸ payload #${id} accepted at edge`, "text-neutral-300");
    await sleep(120);

    let total = 0;
    for (let i = 0; i < STAGES.length; i++) {
      const stage = STAGES[i];
      const hopMs = randomHop(stage);
      total += hopMs;
      setActive({ id, stage: i });
      pushLog(`→ ${stage.label} — dispatching`, "text-neutral-400");
      // eslint-disable-next-line no-await-in-loop
      await sleep(hopMs);
      setLatencies((prev) => ({ ...prev, [stage.key]: hopMs }));
      pushLog(`✓ ${stage.label} — ${hopMs}ms`, "text-[#00ff66]");
    }

    pushLog(`● payload #${id} delivered — round trip ${total}ms`, "text-cyan-400");
    setLastRoundTrip(total);
    setActive(null);
    setCompleted((c) => c + 1);
  };

  const processQueue = async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    while (queueRef.current.length > 0) {
      const id = queueRef.current.shift() as string;
      setPending(queueRef.current.length);
      // eslint-disable-next-line no-await-in-loop
      await runPayload(id);
    }
    processingRef.current = false;
  };

  const dispatch = () => {
    const id = genId();
    queueRef.current.push(id);
    setPending(queueRef.current.length);
    pushLog(`+ payload #${id} enqueued by client`, "text-neutral-500");
    processQueue();
  };

  const markerPercent =
    active && active.stage >= 0 ? STAGE_POSITIONS[active.stage] : -6;
  const markerVisible = !!active;

  return (
    <div className="flex flex-col gap-5">
      {/* Stage track */}
      <div className="relative pt-2 pb-6">
        <div className="absolute left-0 right-0 top-[26px] h-px bg-neutral-800" />
        <motion.div
          className="absolute top-[20px] h-3 w-3 rounded-full bg-[#00ff66] shadow-[0_0_10px_2px_rgba(0,255,102,0.6)]"
          animate={{
            left: `${markerPercent}%`,
            opacity: markerVisible ? 1 : 0
          }}
          transition={{ duration: 0.35, ease: "linear" }}
          style={{ translateX: "-50%" }}
        />
        <div className="relative flex justify-between">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = !!active && active.stage === i;
            const isPast = !!active && active.stage > i;
            return (
              <div key={stage.key} className="flex flex-col items-center gap-2 w-1/4">
                <div
                  className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                    isActive
                      ? "border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10"
                      : isPast
                      ? "border-neutral-600 text-neutral-300"
                      : "border-neutral-800 text-neutral-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 text-center leading-tight [font-size:clamp(0.55rem,2.6cqw,0.65rem)]">
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls + stats */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={dispatch}
          className="inline-flex items-center gap-2 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] px-3 py-1.5 text-xs font-mono hover:bg-[#00ff66]/20 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          DISPATCH PAYLOAD
        </button>
        <div className="flex gap-4 text-[11px] font-mono text-neutral-500">
          <span>
            QUEUED <span className="text-neutral-200">{pending}</span>
          </span>
          <span>
            DELIVERED <span className="text-neutral-200">{completed}</span>
          </span>
          <span>
            LAST RTT{" "}
            <span className="text-[#00ff66]">
              {lastRoundTrip !== null ? `${lastRoundTrip}ms` : "—"}
            </span>
          </span>
        </div>
      </div>

      {/* Per-hop latency readout */}
      <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
        {STAGES.map((stage) => (
          <div key={stage.key} className="bg-[#0a0a0a] border border-neutral-800 p-2 text-center">
            <div className="text-neutral-600 uppercase [font-size:clamp(0.5rem,2.2cqw,0.6rem)]">
              {stage.key}
            </div>
            <div className="text-neutral-200 mt-0.5">
              {latencies[stage.key] !== undefined ? `${latencies[stage.key]}ms` : "—"}
            </div>
          </div>
        ))}
      </div>

      {/* Live log */}
      <div
        ref={logBoxRef}
        className="bg-[#080808] border border-neutral-800/80 p-3 font-mono text-[11px] h-28 overflow-y-auto space-y-1"
      >
        {log.map((line) => (
          <div key={line.id} className={line.tone}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}