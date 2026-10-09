import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { GuestInvitationView } from '../invitation/GuestInvitationView';
import type { EventItem } from '../../types/wedding';
import {
  SparklesIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  MusicIcon,
  VolumeXIcon,
  CheckIcon,
} from '../icons/Icons';

export function InvitationEditorView() {
  const { weddingData, updateWeddingDetails, audioPlaying, toggleAudio } = useWedding();
  const [activeSection, setActiveSection] = useState<'details' | 'events' | 'theme'>('details');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddEvent = (presetTitle = 'New Event') => {
    const newEvent: EventItem = {
      id: `ev-${Date.now()}`,
      title: presetTitle,
      date: 'Saturday, 12 December 2026',
      time: '6:00 PM - 10:00 PM',
      venueName: weddingData.hallSettings.hallName || 'The Grand Ballroom',
      address: weddingData.hallSettings.address || 'Grand Estate',
      dressCode: 'Formal / Evening Attire',
      mapEmbedUrl: 'https://maps.google.com',
    };

    updateWeddingDetails({
      events: [...weddingData.events, newEvent],
    });
    showToast(`Added event: ${presetTitle}`);
  };

  const handleUpdateEvent = (id: string, updates: Partial<EventItem>) => {
    const updatedEvents = weddingData.events.map((ev) =>
      ev.id === id ? { ...ev, ...updates } : ev
    );
    updateWeddingDetails({ events: updatedEvents });
  };

  const handleRemoveEvent = (id: string, title: string) => {
    if (weddingData.events.length <= 1) {
      showToast('You must have at least one event in the invitation.');
      return;
    }
    const updatedEvents = weddingData.events.filter((ev) => ev.id !== id);
    updateWeddingDetails({ events: updatedEvents });
    showToast(`Removed event: ${title}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--bg-card)] border border-[var(--accent)] text-[var(--text-primary)] px-4 py-3 rounded-[var(--btn-radius)] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <SparklesIcon size={16} className="text-[var(--accent)]" />
          <span className="text-[12px] font-medium font-sans">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border-card)]">
        <div>
          <h2 className="text-[28px] font-normal text-[var(--text-primary)] font-serif leading-tight">
            Invitation Design & Event Cards
          </h2>
          <p className="text-[13px] text-[var(--text-secondary)] font-sans mt-0.5">
            Changes save instantly to the live invitation link shared with wedding guests.
          </p>
        </div>

        {/* Section switcher pills */}
        <div className="flex items-center bg-[#EDE0CF] p-1 rounded-[var(--btn-radius)] border border-[var(--border-card)] text-[12px] max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveSection('details')}
            className={`px-3 py-1.5 rounded-[6px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'details'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Couple & Story
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('events')}
            className={`px-3 py-1.5 rounded-[6px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'events'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Events ({weddingData.events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('theme')}
            className={`px-3 py-1.5 rounded-[6px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'theme'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Music & Theme
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid: Left Editor (60%) | Right Live Mobile Preview (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls Editor */}
        <div className="lg:col-span-7 space-y-5">
          {/* SECTION 1: Couple & Story */}
          {activeSection === 'details' && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-5 shadow-xs">
              <h3 className="text-[18px] font-serif font-normal text-[var(--text-primary)]">
                Couple Information & Headings
              </h3>

              <div className="space-y-4 text-[13px]">
                <div>
                  <label className="block font-medium text-[var(--text-secondary)] mb-1">
                    Couple Display Names
                  </label>
                  <input
                    type="text"
                    value={weddingData.coupleNames}
                    onChange={(e) => updateWeddingDetails({ coupleNames: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="e.g. Zara & Adam"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[var(--text-secondary)] mb-1">
                      Partner 1 Full Name
                    </label>
                    <input
                      type="text"
                      value={weddingData.partnerOne}
                      onChange={(e) => updateWeddingDetails({ partnerOne: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[var(--text-secondary)] mb-1">
                      Partner 2 Full Name
                    </label>
                    <input
                      type="text"
                      value={weddingData.partnerTwo}
                      onChange={(e) => updateWeddingDetails({ partnerTwo: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[var(--text-secondary)] mb-1">
                    Wedding Date String
                  </label>
                  <input
                    type="text"
                    value={weddingData.formattedDate}
                    onChange={(e) => updateWeddingDetails({ formattedDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="e.g. Saturday, 12 December 2026"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[var(--text-secondary)] mb-1">
                    Invitation Headline & Salutation
                  </label>
                  <textarea
                    rows={2}
                    value={weddingData.heroHeadline}
                    onChange={(e) => updateWeddingDetails({ heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[var(--text-secondary)] mb-1">
                    Story Quote / Verse
                  </label>
                  <textarea
                    rows={2}
                    value={weddingData.storyQuote}
                    onChange={(e) => updateWeddingDetails({ storyQuote: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] italic"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[var(--text-secondary)] mb-1">
                    Cover Photo Image URL
                  </label>
                  <input
                    type="url"
                    value={weddingData.coverImage}
                    onChange={(e) => updateWeddingDetails({ coverImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: Events Management */}
          {activeSection === 'events' && (
            <div className="space-y-4">
              {/* Event Presets Bar */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-4 flex flex-wrap items-center justify-between gap-2 text-[12px]">
                <span className="text-[var(--text-secondary)] font-medium">Add Quick Event Preset:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Welcome Dinner', 'Ceremony', 'Reception', 'Mehndi', 'Barat', 'Valima'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddEvent(preset)}
                      className="px-2.5 py-1 rounded-[6px] bg-[#FAF6EE] border border-[var(--border-card)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer text-[11px]"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Cards List */}
              {weddingData.events.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-card)]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[11px] font-bold flex items-center justify-center font-sans">
                        {index + 1}
                      </span>
                      <h4 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
                        {event.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveEvent(event.id, event.title)}
                      className="text-[11px] text-[#B5524A] hover:underline cursor-pointer"
                    >
                      Remove Event
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                    <div>
                      <label className="block text-[var(--text-secondary)] font-medium mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => handleUpdateEvent(event.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--text-secondary)] font-medium mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={event.date}
                        onChange={(e) => handleUpdateEvent(event.id, { date: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--text-secondary)] font-medium mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => handleUpdateEvent(event.id, { time: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--text-secondary)] font-medium mb-1">
                        Dress Code
                      </label>
                      <input
                        type="text"
                        value={event.dressCode}
                        onChange={(e) => handleUpdateEvent(event.id, { dressCode: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[var(--text-secondary)] font-medium mb-1">
                        Venue / Room Name
                      </label>
                      <input
                        type="text"
                        value={event.venueName}
                        onChange={(e) => handleUpdateEvent(event.id, { venueName: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 3: Music & Atmosphere */}
          {activeSection === 'theme' && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-5 shadow-xs">
              <h3 className="text-[18px] font-serif font-normal text-[var(--text-primary)]">
                Music & Atmosphere
              </h3>

              <div className="p-4 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--card-radius)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white border border-[var(--border-card)] text-[var(--accent)]">
                    {audioPlaying ? <MusicIcon size={18} className="animate-pulse" /> : <VolumeXIcon size={18} />}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)]">
                      Background Wedding Melody
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {audioPlaying ? 'Currently playing soothing romantic acoustic harmony' : 'Music muted'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className="px-3.5 py-1.5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[12px] font-medium transition-colors cursor-pointer"
                >
                  {audioPlaying ? 'Mute' : 'Play Preview'}
                </button>
              </div>

              <div className="space-y-2 text-[12px]">
                <label className="block font-medium text-[var(--text-secondary)]">
                  Shared Live URL
                </label>
                <div className="p-2.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] font-mono text-[11px] text-[var(--text-primary)] truncate">
                  {weddingData.hallSettings.customDomain || 'invitations.grandhall.com/zara-adam'}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Updates made in this dashboard reflect across all guest phones immediately without needing to resend invitation links.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Interactive Invitation Preview (Sticky on desktop only) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] px-1">
              <span className="font-medium text-[var(--accent)] uppercase tracking-wider text-[10px]">
                Live Guest Phone Preview
              </span>
              <span>Syncs automatically</span>
            </div>

            <div className="flex justify-center">
              <GuestInvitationView isPhoneMockup={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

