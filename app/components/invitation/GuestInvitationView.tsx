import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { AnimatedEnvelope } from './AnimatedEnvelope';
import { EventCards } from './EventCards';
import { HallInfoCard } from './HallInfoCard';
import { RSVPModal } from './RSVPModal';
import { LanguageSwitcher, TRANSLATIONS } from './LanguageSwitcher';
import { HeartIcon, MusicIcon, VolumeXIcon, SparklesIcon } from '../icons/Icons';

interface GuestInvitationViewProps {
  isPhoneMockup?: boolean;
  guestFamilyGreeting?: string;
}

export function GuestInvitationView({
  isPhoneMockup = false,
  guestFamilyGreeting = 'Morgan Family',
}: GuestInvitationViewProps) {
  const { weddingData, activeLanguage, audioPlaying, toggleAudio } = useWedding();
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

  return (
    <div
      className={`relative mx-auto transition-all ${
        isPhoneMockup
          ? 'w-full max-w-[420px] rounded-[42px] border-[10px] border-[#D8C7B5] shadow-[0_22px_60px_rgba(43,38,34,0.12)] overflow-hidden bg-[var(--bg-page)] min-h-[780px] max-h-[850px] flex flex-col'
          : 'w-full max-w-2xl bg-[var(--bg-page)] text-[var(--text-primary)] rounded-[var(--card-radius)] border border-[var(--border-card)] shadow-lg overflow-hidden flex flex-col'
      }`}
    >
      {/* Phone Notch (Speaker simulation) */}
      {isPhoneMockup && (
        <div className="h-5 w-36 mx-auto bg-[#D8C7B5] rounded-b-2xl flex items-center justify-center shrink-0 z-40">
          <div className="w-12 h-1 bg-[#BFB09F] rounded-full" />
        </div>
      )}

      {/* DEDICATED TOP HEADER BAR (Language Switcher, Hall Branding & Music - No Overlapping!) */}
      <div className="w-full px-3.5 pt-2 pb-2.5 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-card)] shrink-0 z-30 flex flex-col gap-1.5 font-sans shadow-xs">
        {/* Row 1: Language Switcher on Left, Audio on Right */}
        <div className="flex items-center justify-between gap-2">
          <LanguageSwitcher compact={true} />

          <button
            type="button"
            onClick={toggleAudio}
            className="p-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--accent)] hover:text-[var(--text-primary)] transition-all shadow-xs cursor-pointer shrink-0"
            title={audioPlaying ? 'Mute Music' : 'Play Background Music'}
          >
            {audioPlaying ? <MusicIcon size={13} className="animate-pulse" /> : <VolumeXIcon size={13} />}
          </button>
        </div>

        {/* Row 2: Hall Branding Title & Subtitle - Cleanly separated and fully readable */}
        <div className="text-center pt-0.5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold leading-tight truncate px-2">
            {weddingData.hallSettings.hallName}
          </p>
          <p className="text-[9px] text-[var(--text-secondary)]">
            Exclusive Digital Wedding Invitation
          </p>
        </div>
      </div>

      {/* MAIN INVITATION BODY (Scrollable area) */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {!hasOpenedEnvelope ? (
          <AnimatedEnvelope
            onOpen={() => setHasOpenedEnvelope(true)}
            guestFamilyGreeting={guestFamilyGreeting}
          />
        ) : (
          /* UNFOLDED WEDDING INVITATION PAGE */
          <div className="relative z-10 flex flex-col min-h-full pb-20 animate-in fade-in slide-in-from-bottom-2 duration-400 bg-[var(--bg-page)]">
            {/* Top Greeting & Reset Bar */}
            <div className="pt-3.5 px-6 flex justify-between items-center text-xs text-[var(--text-secondary)] font-sans border-b border-[var(--border-card)]/50 pb-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-primary)] font-medium bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-full border border-[var(--border-card)]">
                <SparklesIcon size={11} className="text-[var(--accent)]" />
                {t.dearFamily} {guestFamilyGreeting}
              </span>
              <button
                type="button"
                onClick={() => setHasOpenedEnvelope(false)}
                className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent)] underline cursor-pointer"
              >
                Replay Envelope Open
              </button>
            </div>

            {/* Hero Section / Cover page */}
            <div className="px-6 pt-4 pb-6 text-center space-y-3.5">
              <div className="relative mx-auto w-32 h-32 rounded-full p-1 border-2 border-[var(--accent)]/40 shadow-xs overflow-hidden group bg-[var(--bg-card)]">
                <img
                  src={weddingData.coverImage}
                  alt={weddingData.coupleNames}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-normal font-sans">
                  {t.cordiallyInvited}
                </p>
                <h1 className="text-3xl font-serif font-normal text-[var(--text-primary)] tracking-wide">
                  {weddingData.coupleNames}
                </h1>
                <div className="w-16 h-px bg-[var(--accent)] mx-auto my-2 opacity-50" />
                <p className="text-xs text-[var(--accent)] font-medium font-sans">
                  {weddingData.formattedDate}
                </p>
              </div>

              <blockquote className="text-xs italic text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed border-l-2 border-[var(--accent)] pl-3 text-left font-serif">
                {weddingData.storyQuote}
              </blockquote>
            </div>

            {/* Itinerary Events */}
            <div className="px-4 sm:px-6 space-y-6">
              <EventCards
                events={weddingData.events}
                onOpenRSVP={() => setIsRSVPOpen(true)}
              />

              {/* Hall Info Section */}
              <HallInfoCard />
            </div>

            {/* Bottom Sticky RSVP Call-to-action */}
            <div className="sticky bottom-3 px-4 sm:px-6 pt-3 mt-4 z-20">
              <button
                type="button"
                onClick={() => setIsRSVPOpen(true)}
                className="w-full py-2.5 px-5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-xs shadow-md shadow-[var(--accent)]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartIcon size={14} className="fill-white" />
                <span>{t.rsvpNow} — {t.completedInTwoMin}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RSVP 4-step wizard modal */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        initialFamilyName={guestFamilyGreeting}
      />
    </div>
  );
}
