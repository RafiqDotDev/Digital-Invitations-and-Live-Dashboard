import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { DownloadIcon, XIcon, UtensilsIcon } from '../icons/Icons';

interface ExportBanquetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportBanquetModal({ isOpen, onClose }: ExportBanquetModalProps) {
  const { weddingData, stats } = useWedding();

  if (!isOpen) return null;

  const exportCSV = () => {
    const headers = [
      'Family Name',
      'Primary Contact',
      'Side',
      'Status',
      'Headcount',
      'Phone',
      'Email',
      'Events Attending',
      'Vegetarian',
      'Vegan',
      'Halal',
      'Kosher',
      'Gluten-Free',
      'Allergies',
      'Bar Preference',
      'Arrival Date',
      'Pickup Needed',
      'Rooms Needed',
    ];

    const rows = weddingData.guests.map((g) => [
      `"${g.familyName}"`,
      `"${g.contactName}"`,
      g.side,
      g.status,
      g.guestCount,
      `"${g.phone}"`,
      `"${g.email}"`,
      `"${g.attendingEventIds.join('; ')}"`,
      g.dietary.vegetarian,
      g.dietary.vegan,
      g.dietary.halal,
      g.dietary.kosher,
      g.dietary.glutenFree,
      `"${g.dietary.allergies || 'None'}"`,
      g.dietary.drinksPreference,
      g.arrival.arrivalDate || 'N/A',
      g.arrival.pickupNeeded ? 'YES' : 'NO',
      g.arrival.roomsNeeded,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${weddingData.coupleNames.replace(/\s+/g, '_')}_Banquet_Guest_List.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] max-w-2xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-8 shadow-xl text-[var(--text-primary)] space-y-6 my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#FAF6EE] cursor-pointer"
        >
          <XIcon size={20} />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--accent)] text-[11px] font-semibold uppercase tracking-wider font-sans">
            <UtensilsIcon size={14} />
            Banquet Event Order (BEO) Kitchen & Operations Export
          </div>
          <h3 className="text-[24px] font-normal font-serif text-[var(--text-primary)]">
            {weddingData.coupleNames} Banquet Summary Sheet
          </h3>
          <p className="text-[12px] text-[var(--text-secondary)] font-sans">
            {weddingData.hallSettings.hallName} • {weddingData.formattedDate}
          </p>
        </div>

        {/* Printable preview summary box */}
        <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[12px] p-4 sm:p-5 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[var(--border-card)] pb-3">
            <div>
              <span className="text-[var(--text-secondary)] block text-[10px]">TOTAL GUARANTEED</span>
              <span className="text-[16px] font-normal text-[var(--text-primary)] font-serif">{stats.confirmedCount} PAX</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)] block text-[10px]">PENDING RSVP</span>
              <span className="text-[16px] font-normal text-[var(--text-secondary)] font-serif">{stats.pendingCount} PAX</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)] block text-[10px]">BRIDE SIDE</span>
              <span className="text-[16px] font-normal text-[var(--text-secondary)] font-serif">{stats.brideCount} PAX</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)] block text-[10px]">GROOM SIDE</span>
              <span className="text-[16px] font-normal text-[var(--text-secondary)] font-serif">{stats.groomCount} PAX</span>
            </div>
          </div>

          {/* Kitchen plate counts */}
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block font-sans font-bold">
              KITCHEN MEAL BREAKDOWN:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans pt-1">
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Standard / Non-Restricted:</span>
                <span className="float-right font-bold text-[var(--text-primary)]">
                  {Math.max(0, stats.confirmedCount - (stats.dietaryCounts.vegetarian + stats.dietaryCounts.vegan + stats.dietaryCounts.halal + stats.dietaryCounts.kosher))}
                </span>
              </div>
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Halal Certified:</span>
                <span className="float-right font-bold text-[var(--accent)]">{stats.dietaryCounts.halal}</span>
              </div>
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Vegetarian:</span>
                <span className="float-right font-bold text-[var(--accent)]">{stats.dietaryCounts.vegetarian}</span>
              </div>
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Vegan:</span>
                <span className="float-right font-bold text-[var(--accent)]">{stats.dietaryCounts.vegan}</span>
              </div>
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Gluten-Free:</span>
                <span className="float-right font-bold text-[var(--accent)]">{stats.dietaryCounts.glutenFree}</span>
              </div>
              <div className="bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-card)]">
                <span className="text-[var(--text-secondary)] text-[11px]">Kosher Prepared:</span>
                <span className="float-right font-bold text-[var(--accent)]">{stats.dietaryCounts.kosher}</span>
              </div>
            </div>
          </div>

          {/* Bar counts */}
          <div className="space-y-1 pt-2 border-t border-[var(--border-card)] font-sans">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block font-bold">
              BAR SERVICE & LOGISTICS:
            </span>
            <div className="flex flex-wrap gap-4 text-[12px] text-[var(--text-secondary)] pt-1">
              <span>🍷 Bar Package: <strong className="text-[var(--text-primary)]">{stats.dietaryCounts.wineCocktails} guests</strong></span>
              <span>🥤 Non-Alcoholic: <strong className="text-[var(--text-primary)]">{stats.dietaryCounts.nonAlcoholic} guests</strong></span>
              <span>🚐 Shuttles: <strong className="text-[var(--text-primary)]">{stats.arrivalCounts.pickupsNeeded} pickups</strong></span>
              <span>🏨 Hotel Suites: <strong className="text-[var(--text-primary)]">{stats.arrivalCounts.roomsNeeded} rooms</strong></span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-[var(--btn-radius)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[12px] font-medium border border-[var(--border-card)] transition-colors cursor-pointer"
          >
            Print Banquet Sheet (PDF)
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-[12px] transition-all cursor-pointer"
          >
            <DownloadIcon size={14} />
            <span>Download CSV for Caterer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
