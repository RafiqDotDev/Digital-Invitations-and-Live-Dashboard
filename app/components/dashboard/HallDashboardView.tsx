import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { OverviewKPIs } from './OverviewKPIs';
import { EventAttendanceWidget } from './EventAttendanceWidget';
import { DietaryDrinksWidget } from './DietaryDrinksWidget';
import { ArrivalsLogisticsWidget } from './ArrivalsLogisticsWidget';
import { YourInvitationCard } from './YourInvitationCard';
import { GuestManagementTable } from './GuestManagementTable';
import { InvitationEditorView } from './InvitationEditorView';
import { FormSettingsView } from './FormSettingsView';
import { HallSettingsView } from './HallSettingsView';
import { ExportBanquetModal } from './ExportBanquetModal';
import { HallCustomizerDrawer } from './HallCustomizerDrawer';
import { BotanicalIllustration } from './BotanicalIllustration';
import {
  SparklesIcon,
  LayoutDashboardIcon,
  UsersIcon,
  EnvelopeIcon,
  SettingsIcon,
} from '../icons/Icons';

type SidebarTab = 'overview' | 'guests' | 'invitation' | 'form-settings' | 'settings';

export function HallDashboardView() {
  const { weddingData, sendRemindersToAllPending } = useWedding();
  const [activeTab, setActiveTab] = useState<SidebarTab>('overview');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemindPending = () => {
    const res = sendRemindersToAllPending();
    showToast(`Reminders successfully sent to ${res.count} pending guest parties!`);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboardIcon },
    { id: 'guests', label: 'Guests', icon: UsersIcon },
    { id: 'invitation', label: 'Invitation', icon: EnvelopeIcon },
    { id: 'form-settings', label: 'Form settings', icon: SparklesIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as SidebarTab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans flex flex-col md:flex-row relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--bg-card)] border border-[var(--accent)] text-[var(--text-primary)] px-4 py-3 rounded-[var(--btn-radius)] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <SparklesIcon size={16} className="text-[var(--accent)]" />
          <span className="text-[12px] font-medium font-sans">{toastMessage}</span>
        </div>
      )}

      {/* MOBILE TOP BAR (below 768px: sidebar collapses to top bar/drawer) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--bg-sidebar)] border-b border-[var(--border-card)] sticky top-[48px] z-40">
        <div className="w-[84px] h-[32px] bg-[#D8D8D8] rounded-[10px] flex items-center justify-center text-[#4A4A4A] text-[12px] font-normal select-none">
          Logo
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3.5 py-1.5 rounded-[var(--btn-radius)] bg-[var(--bg-card)] border border-[var(--border-card)] text-[12px] font-medium text-[var(--text-primary)] cursor-pointer hover:bg-[#FAF6EE] transition-colors"
        >
          {mobileMenuOpen ? 'Close Menu' : 'Menu'}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-sidebar)] border-b border-[var(--border-card)] p-4 space-y-2 z-30 sticky top-[104px] shadow-md animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-[8px] text-[14px] flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <item.icon size={16} className={activeTab === item.id ? 'text-[var(--accent)]' : ''} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* SIDEBAR (Desktop: Collapses on mouse leave, expands on hover, sticky on scroll) */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`hidden md:flex flex-col shrink-0 sticky top-[48px] self-start h-[calc(100dvh-48px)] bg-[var(--bg-sidebar)] border-r border-[var(--border-card)] select-none transition-all duration-300 ease-in-out z-30 overflow-y-auto ${
          isSidebarHovered ? 'w-[185px] p-5' : 'w-[64px] p-3'
        }`}
      >
        {/* Top: gray rounded rectangle "Logo" placeholder */}
        <div className="mb-8 flex justify-center">
          <div
            className={`bg-[#D8D8D8] flex items-center justify-center text-[#4A4A4A] font-normal transition-all duration-300 ${
              isSidebarHovered
                ? 'w-[100px] h-[36px] rounded-[12px] text-[13px]'
                : 'w-[36px] h-[36px] rounded-[10px] text-[11px] font-semibold'
            }`}
            title="Logo"
          >
            {isSidebarHovered ? 'Logo' : 'L'}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                title={!isSidebarHovered ? item.label : undefined}
                className={`w-full rounded-[8px] text-[14px] transition-all cursor-pointer flex items-center ${
                  isSidebarHovered ? 'px-3 py-1.5 gap-2.5 text-left' : 'p-2 justify-center'
                } ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] font-medium'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#F2E4D4]'
                }`}
              >
                <item.icon
                  size={16}
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                  }`}
                />
                {isSidebarHovered && (
                  <span className="whitespace-nowrap overflow-hidden transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom-left: Decorative botanical illustration */}
        <div
          className={`mt-auto pointer-events-none transition-all duration-300 overflow-hidden ${
            isSidebarHovered
              ? 'opacity-85 translate-y-0 w-[110px] -ml-1 pt-6'
              : 'opacity-30 scale-75 -ml-3 translate-y-2'
          }`}
        >
          <BotanicalIllustration className="w-full h-auto text-[var(--accent)]" />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full space-y-5 transition-all duration-300">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-in fade-in">
            {/* HEADER */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
              {/* Left: Page Title & Subtitle */}
              <div>
                <h1 className="text-[32px] font-normal text-[var(--text-primary)] font-serif leading-tight">
                  Overview
                </h1>
                <p className="text-[13px] text-[var(--text-secondary)] font-sans mt-0.5">
                  {weddingData.coupleNames}, {weddingData.formattedDate}
                </p>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2.5">
                {/* Outlined Export Button */}
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="px-4 py-1.5 rounded-[var(--btn-radius)] border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--bg-card)] text-[13px] font-medium font-sans transition-colors cursor-pointer"
                >
                  Export
                </button>

                {/* Filled Remind Pending Guests Button */}
                <button
                  type="button"
                  onClick={handleRemindPending}
                  className="px-4 py-1.5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium font-sans transition-colors cursor-pointer shadow-none"
                >
                  Remind pending guests
                </button>
              </div>
            </header>

            {/* STAT ROW (4 Equal Cards) */}
            <OverviewKPIs />

            {/* MAIN GRID (3 Columns: Column 1, Column 2, Column 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {/* COLUMN 1: Attendance by event (Stacked) */}
              <div className="space-y-4">
                {/* Card 1 */}
                <EventAttendanceWidget
                  title="Attendance by event"
                  customEvents={[
                    { title: 'Welcome Dinner', count: 58 },
                    { title: 'Ceremony', count: 126 },
                    { title: 'Reception', count: 118 },
                  ]}
                />

                {/* Card 2 (Identical stacked card matching the screenshot) */}
                <EventAttendanceWidget
                  title="Attendance by event"
                  customEvents={[
                    { title: 'Welcome Dinner', count: 58 },
                    { title: 'Ceremony', count: 125 },
                    { title: 'Reception', count: 110 },
                  ]}
                />
              </div>

              {/* COLUMN 2: Dietary & Drinks + Arrivals */}
              <div className="space-y-4">
                <DietaryDrinksWidget />
                <ArrivalsLogisticsWidget />
              </div>

              {/* COLUMN 3: Your Invitation */}
              <div className="md:col-span-2 lg:col-span-1">
                <YourInvitationCard
                  onEditInvitation={() => setActiveTab('invitation')}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GUESTS */}
        {activeTab === 'guests' && (
          <div className="space-y-5 animate-in fade-in">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
              <div>
                <h1 className="text-[32px] font-normal text-[var(--text-primary)] font-serif leading-tight">
                  Guest Management & RSVPs
                </h1>
                <p className="text-[13px] text-[var(--text-secondary)] font-sans mt-0.5">
                  Live headcount and dietary details for {weddingData.coupleNames}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="px-4 py-1.5 rounded-[var(--btn-radius)] border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--bg-card)] text-[13px] font-medium font-sans transition-colors cursor-pointer"
                >
                  Export Banquet Report
                </button>
              </div>
            </header>

            <GuestManagementTable />
          </div>
        )}

        {/* TAB 3: INVITATION */}
        {activeTab === 'invitation' && (
          <InvitationEditorView />
        )}

        {/* TAB 4: FORM SETTINGS */}
        {activeTab === 'form-settings' && (
          <FormSettingsView />
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <HallSettingsView />
        )}
      </main>

      {/* Modals & Drawers */}
      <ExportBanquetModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <HallCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
