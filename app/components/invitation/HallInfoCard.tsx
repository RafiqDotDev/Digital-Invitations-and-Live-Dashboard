import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { TRANSLATIONS } from './LanguageSwitcher';
import { CarIcon, CheckCircleIcon, ShieldCheckIcon } from '../icons/Icons';

export function HallInfoCard() {
  const { weddingData, activeLanguage } = useWedding();
  const hall = weddingData.hallSettings;
  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

  return (
    <div className="relative bg-[var(--bg-card)] rounded-[var(--card-radius)] border border-[var(--border-card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden font-sans">
      <div className="space-y-4">
        {/* Hall Branding Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent)]">
              Official Venue Partner
            </span>
            <h4 className="text-xl font-serif text-[var(--text-primary)] font-normal">
              {hall.hallName}
            </h4>
            <p className="text-xs text-[var(--text-secondary)]">{hall.address}</p>
          </div>
          <div className="w-11 h-11 rounded-[10px] bg-[var(--accent-soft)] border border-[var(--border-card)] flex items-center justify-center text-[var(--accent)] font-serif text-lg font-bold">
            {hall.hallName.charAt(0)}
          </div>
        </div>

        {/* Venue features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Valet & Parking */}
          <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[10px] p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <CarIcon size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {t.valetParking}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {hall.parkingInstructions}
            </p>
          </div>

          {/* Entry & Concierge Instructions */}
          <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[10px] p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <ShieldCheckIcon size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {t.entryInstructions}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {hall.entryInstructions}
            </p>
          </div>
        </div>

        {/* Contact and security disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[var(--text-secondary)] border-t border-[var(--border-card)]">
          <div className="flex items-center gap-1.5">
            <CheckCircleIcon size={13} className="text-emerald-700" />
            <span>Digital RSVP synchronized directly with hall catering.</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Direct Desk: {hall.contactPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
