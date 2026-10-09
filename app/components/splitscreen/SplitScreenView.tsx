import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { GuestInvitationView } from '../invitation/GuestInvitationView';
import { OverviewKPIs } from '../dashboard/OverviewKPIs';
import { EventAttendanceWidget } from '../dashboard/EventAttendanceWidget';
import { DietaryDrinksWidget } from '../dashboard/DietaryDrinksWidget';
import { ArrivalsLogisticsWidget } from '../dashboard/ArrivalsLogisticsWidget';
import { YourInvitationCard } from '../dashboard/YourInvitationCard';
import { GuestManagementTable } from '../dashboard/GuestManagementTable';
import { HallCustomizerDrawer } from '../dashboard/HallCustomizerDrawer';
import { SparklesIcon, SmartphoneIcon, LayoutDashboardIcon } from '../icons/Icons';

export function SplitScreenView() {
  const { weddingData, stats } = useWedding();
  const [guestPresetFamily, setGuestPresetFamily] = useState('Morgan Family');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <div className="w-full bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen py-6 px-4 sm:px-6">
      <div className="max-w-[1500px] mx-auto space-y-6">
        {/* Interactive Explanatory Banner */}
        <div className="p-4 rounded-[var(--card-radius)] bg-[var(--bg-card)] border border-[var(--border-card)] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[var(--btn-radius)] bg-[var(--accent-soft)] text-[var(--text-primary)]">
              <SparklesIcon size={18} className="text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-[15px] font-normal font-serif text-[var(--text-primary)]">
                Dual Live Sync Simulation
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] font-sans">
                Submit an RSVP on the phone (left) and watch the dashboard cards and counts instantly update (right).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-sans">
            <span className="text-[var(--text-secondary)]">Simulate Guest:</span>
            <select
              value={guestPresetFamily}
              onChange={(e) => setGuestPresetFamily(e.target.value)}
              className="bg-[#FAF6EE] border border-[var(--border-card)] text-[var(--text-primary)] text-[12px] rounded-[var(--btn-radius)] px-3 py-1.5 focus:outline-none focus:border-[var(--accent)] cursor-pointer"
            >
              <option value="Morgan Family">Morgan Family (Groom Side)</option>
              <option value="Farooq Family">Farooq Family (Bride Side)</option>
              <option value="Khan Relatives">Khan Relatives</option>
              <option value="Williams Family">Williams Family</option>
            </select>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Mobile Guest Experience (5 cols on xl) */}
          <div className="xl:col-span-5 flex flex-col items-center xl:sticky xl:top-14">
            <div className="w-full flex items-center justify-between px-2 mb-2.5 font-sans">
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--accent)] uppercase tracking-wider">
                <SmartphoneIcon size={15} />
                <span>Guest Phone Experience</span>
              </div>
              <span className="text-[11px] text-[var(--text-secondary)]">
                WhatsApp Link
              </span>
            </div>

            {/* Simulated Phone Shell */}
            <div className="w-full flex justify-center">
              <GuestInvitationView
                isPhoneMockup={true}
                guestFamilyGreeting={guestPresetFamily}
              />
            </div>
          </div>

          {/* Right Column: Live Hall Manager Dashboard (7 cols on xl) */}
          <div className="xl:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1 font-sans">
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--accent)] uppercase tracking-wider">
                <LayoutDashboardIcon size={15} />
                <span>Live Hall Dashboard</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                ● Live Sync Active
              </span>
            </div>

            {/* Overview KPIs */}
            <OverviewKPIs />

            {/* Attendance & Dietary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventAttendanceWidget />
              <DietaryDrinksWidget />
            </div>

            {/* Arrivals Logistics & Invitation Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArrivalsLogisticsWidget />
              <YourInvitationCard onEditInvitation={() => setIsCustomizerOpen(true)} />
            </div>

            {/* Guest Management Table */}
            <GuestManagementTable />
          </div>
        </div>
      </div>

      <HallCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
