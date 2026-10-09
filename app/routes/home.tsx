import React, { useState } from "react";
import type { Route } from "./+types/home";
import { WeddingProvider, useWedding } from "../context/WeddingContext";
import { SplitScreenView } from "../components/splitscreen/SplitScreenView";
import { GuestInvitationView } from "../components/invitation/GuestInvitationView";
import { HallDashboardView } from "../components/dashboard/HallDashboardView";
import { PackagesShowcase } from "../components/packages/PackagesShowcase";
import {
  SmartphoneIcon,
  LayoutDashboardIcon,
  SplitSquareVerticalIcon,
  ShieldCheckIcon,
} from "../components/icons/Icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Digital Wedding Invitations & Live Guest Dashboard" },
    {
      name: "description",
      content:
        "A premium service wedding halls offer to every couple that books. Live guest headcount, catering numbers, and invitation system.",
    },
  ];
}

type AppMode = "dashboard" | "split" | "guest" | "packages";

function MainAppContent() {
  const [currentMode, setCurrentMode] = useState<AppMode>("dashboard");
  const { currentPreset, switchWeddingPreset, resetToSampleData } =
    useWedding();

  const navItems = [
    {
      id: "dashboard",
      label: "Hall Dashboard (Live)",
      icon: LayoutDashboardIcon,
    },
    {
      id: "split",
      label: "Dual Split Live Demo",
      icon: SplitSquareVerticalIcon,
    },
    {
      id: "guest",
      label: "Guest Mobile Invitation",
      icon: SmartphoneIcon,
    },
    {
      id: "packages",
      label: "Packages & Partnership",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent-soft)] selection:text-[var(--text-primary)]">
      {/* Top Demo Bar */}
      <header className="sticky top-0 z-50 bg-[#F7EBDD]/95 backdrop-blur-md border-b border-[var(--border-card)] px-4 sm:px-6 py-2 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* View switcher tabs */}
          <nav className="flex items-center bg-[#EDE0CF] p-0.5 rounded-[var(--btn-radius)] border border-[var(--border-card)] max-w-full overflow-x-auto">
            {navItems.map((item) => {
              const isActive = currentMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentMode(item.id as AppMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[12px] transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-medium shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <item.icon
                    size={13}
                    className={isActive ? "text-[var(--accent)]" : ""}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick wedding preset & reset */}
          <div className="flex items-center gap-2 text-[12px] flex-wrap justify-center">
            <span className="text-[var(--text-secondary)]">Couple:</span>
            <div className="flex items-center bg-[#EDE0CF] p-0.5 rounded-[var(--btn-radius)] border border-[var(--border-card)] shrink-0">
              <button
                type="button"
                onClick={() => switchWeddingPreset("zara-adam")}
                className={`px-2.5 py-0.5 rounded-[6px] transition-colors cursor-pointer text-[12px] whitespace-nowrap ${
                  currentPreset === "zara-adam"
                    ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-medium shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Zara & Adam
              </button>
              <button
                type="button"
                onClick={() => switchWeddingPreset("ayesha-bilal")}
                className={`px-2.5 py-0.5 rounded-[6px] transition-colors cursor-pointer text-[12px] whitespace-nowrap ${
                  currentPreset === "ayesha-bilal"
                    ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-medium shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Ayesha & Bilal
              </button>
            </div>

            <button
              type="button"
              onClick={resetToSampleData}
              className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent)] underline ml-1 cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {currentMode === "dashboard" && <HallDashboardView />}
        {currentMode === "split" && <SplitScreenView />}
        {currentMode === "guest" && (
          <div className="py-8 px-4 flex justify-center bg-[var(--bg-page)] min-h-screen">
            <GuestInvitationView isPhoneMockup={false} />
          </div>
        )}
        {currentMode === "packages" && <PackagesShowcase />}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <WeddingProvider>
      <MainAppContent />
    </WeddingProvider>
  );
}
