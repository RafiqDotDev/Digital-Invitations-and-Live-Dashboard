import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { TRANSLATIONS } from './LanguageSwitcher';
import { SparklesIcon, HeartIcon } from '../icons/Icons';

interface AnimatedEnvelopeProps {
  onOpen: () => void;
  guestFamilyGreeting?: string;
}

export function AnimatedEnvelope({ onOpen, guestFamilyGreeting = 'Morgan Family' }: AnimatedEnvelopeProps) {
  const { weddingData, activeLanguage } = useWedding();
  const [isOpening, setIsOpening] = useState(false);
  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4 bg-[var(--bg-page)] overflow-hidden select-none min-h-[560px]">
      {/* Subtle warm glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(235,217,190,0.5),transparent_70%)] pointer-events-none" />

      {/* The Luxury Envelope Card Container */}
      <div 
        className={`relative w-full max-w-sm aspect-[4/5] rounded-[20px] shadow-[0_12px_32px_rgba(43,38,34,0.08)] transition-all duration-1000 transform cursor-pointer border border-[var(--border-card)] bg-[var(--bg-card)] ${
          isOpening ? 'scale-105 opacity-0 -translate-y-6 pointer-events-none' : 'hover:scale-[1.01]'
        }`}
        onClick={handleOpenClick}
      >
        {/* Inner double border filigree */}
        <div className="absolute inset-3 border border-[var(--accent-soft)] rounded-[14px] pointer-events-none flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-[var(--accent)]/50 text-xs">
            <span>✦</span>
            <span>✦</span>
          </div>
          <div className="flex justify-between items-center text-[var(--accent)]/50 text-xs">
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>

        {/* Envelope Top Flap Illusion */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#F7EBDD] to-[#F1E3D2] border-b border-[var(--border-card)] transition-transform duration-700 origin-top opacity-90"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 85%)',
          }}
        />

        {/* Content Inside Envelope Face */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 text-center font-sans">
          {/* Top greeting badge */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border-card)] text-[var(--text-primary)] text-[11px] font-medium tracking-wide">
              <SparklesIcon size={12} className="text-[var(--accent)]" />
              {t.dearFamily} {guestFamilyGreeting}
            </span>
          </div>

          {/* Couple Monogram & Names */}
          <div className="my-auto space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full border border-[var(--accent)] flex items-center justify-center bg-[#FAF3E7] shadow-xs">
              <span className="font-serif italic text-2xl text-[var(--accent)] tracking-tighter">
                {weddingData.partnerOne.charAt(0)} & {weddingData.partnerTwo.charAt(0)}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-normal">
                {t.cordiallyInvited}
              </p>
              <h2 className="text-3xl font-serif font-normal text-[var(--text-primary)] tracking-wide">
                {weddingData.coupleNames}
              </h2>
              <div className="w-12 h-px bg-[var(--accent)] mx-auto my-2 opacity-50" />
              <p className="text-xs text-[var(--accent)] font-medium">
                {weddingData.formattedDate}
              </p>
            </div>
          </div>

          {/* Wax Seal / Tap to Open Button */}
          <div className="pb-4 w-full flex flex-col items-center gap-3">
            <button
              type="button"
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C6A26E] via-[#B8935F] to-[#99733F] text-white shadow-lg shadow-[#B8935F]/35 border-2 border-[#EBD9BE] active:scale-95 transition-all transform hover:scale-105 cursor-pointer"
            >
              <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
              <HeartIcon size={22} className="fill-white text-white group-hover:scale-110 transition-transform" />
            </button>

            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[var(--text-primary)] tracking-wide flex items-center justify-center gap-1">
                <span>{t.tapToOpen}</span>
              </p>
              <p className="text-[10px] text-[var(--text-secondary)]">
                Click seal or card to unfold wedding page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
