"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "gui" | "api";

interface ViewModeContextValue {
  mode: ViewMode;
  toggle: () => void;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("gui");
  const toggle = () => setMode((m) => (m === "gui" ? "api" : "gui"));

  return (
    <ViewModeContext.Provider value={{ mode, toggle }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return ctx;
}