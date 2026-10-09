import React, { useState } from 'react';
import type { EventItem } from '../../types/wedding';
import { useWedding } from '../../context/WeddingContext';
import { TRANSLATIONS } from './LanguageSwitcher';
import { CalendarIcon, ClockIcon, MapPinIcon, SparklesIcon, XIcon, ExternalLinkIcon } from '../icons/Icons';

interface EventCardsProps {
  events: EventItem[];
  onOpenRSVP: () => void;
}

export function EventCards({ events, onOpenRSVP }: EventCardsProps) {
  const { activeLanguage } = useWedding();
  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;
  const [selectedMapEvent, setSelectedMapEvent] = useState<EventItem | null>(null);

  const generateGoogleCalendarUrl = (event: EventItem) => {
    const title = encodeURIComponent(`${event.title} - Wedding Celebration`);
    const details = encodeURIComponent(`Dress code: ${event.dressCode}\nLocation: ${event.venueName}, ${event.address}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);
    const dates = event.calendarTime ? `${event.calendarTime.start}/${event.calendarTime.end}` : '20261212T180000Z/20261212T230000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const downloadICSFile = (event: EventItem) => {
    const startTime = event.calendarTime?.start || '20261212T180000Z';
    const endTime = event.calendarTime?.end || '20261212T230000Z';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Digital Wedding Invitations//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.dressCode} at ${event.venueName}`,
      `LOCATION:${event.venueName}, ${event.address}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--accent)] font-sans">
          Wedding Schedule
        </span>
        <h3 className="text-2xl font-serif font-normal text-[var(--text-primary)]">{t.itineraryTitle}</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto font-sans">
          Each event has its own schedule, dress code, location map, and calendar reminder.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="group relative bg-[var(--bg-card)] rounded-[var(--card-radius)] border border-[var(--border-card)] hover:border-[var(--accent)] transition-all p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden"
          >
            {/* Top decorative accent ribbon */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[10px] font-bold flex items-center justify-center font-mono">
                    0{idx + 1}
                  </span>
                  <h4 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
                    {event.title}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] pt-1">
                  <div className="flex items-center gap-1.5 text-[var(--accent)] font-medium">
                    <CalendarIcon size={14} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                    <ClockIcon size={14} className="text-[var(--accent)]" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)] pt-1">
                  <MapPinIcon size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">{event.venueName}</span>
                    <span className="text-[var(--text-secondary)]"> • {event.address}</span>
                  </div>
                </div>

                {/* Dress code badge */}
                <div className="pt-2 flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-medium text-[var(--text-secondary)]">
                    {t.dressCode}:
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[var(--chip-radius)] text-[11px] font-medium bg-[var(--accent-soft)] text-[var(--text-primary)] border border-[var(--border-card)]">
                    <SparklesIcon size={10} className="text-[var(--accent)]" />
                    {event.dressCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Action Buttons */}
            <div className="mt-4 pt-3 border-t border-[var(--border-card)] flex flex-wrap items-center gap-2 justify-between font-sans">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMapEvent(event)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--btn-radius)] text-xs font-medium bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE] border border-[var(--border-card)] transition-colors cursor-pointer"
                >
                  <MapPinIcon size={13} className="text-[var(--accent)]" />
                  <span>{t.viewMap}</span>
                </button>

                {/* Add to Calendar button */}
                <div className="relative group/cal">
                  <button
                    type="button"
                    onClick={() => downloadICSFile(event)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--btn-radius)] text-xs font-medium bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE] border border-[var(--border-card)] transition-colors cursor-pointer"
                  >
                    <CalendarIcon size={13} className="text-[var(--accent)]" />
                    <span>{t.addToCalendar}</span>
                  </button>
                  {/* Calendar Quick Link flyout */}
                  <div className="hidden group-hover/cal:flex flex-col absolute left-0 bottom-full mb-1 w-44 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--btn-radius)] shadow-lg p-1 z-30">
                    <button
                      type="button"
                      onClick={() => downloadICSFile(event)}
                      className="text-left px-2 py-1.5 text-xs text-[var(--text-primary)] hover:bg-[#FAF6EE] rounded flex items-center justify-between cursor-pointer"
                    >
                      <span>Apple / iCal (.ics)</span>
                    </button>
                    <a
                      href={generateGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 text-xs text-[var(--text-primary)] hover:bg-[#FAF6EE] rounded flex items-center justify-between"
                    >
                      <span>Google Calendar</span>
                      <ExternalLinkIcon size={11} className="text-[var(--text-secondary)]" />
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenRSVP}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-[var(--btn-radius)] text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.rsvpNow}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {selectedMapEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-serif font-normal text-[var(--text-primary)]">
                  {selectedMapEvent.venueName}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans">{selectedMapEvent.address}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMapEvent(null)}
                className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#FAF6EE] cursor-pointer"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Map Canvas */}
            <div className="w-full h-56 rounded-[12px] bg-[#FAF6EE] border border-[var(--border-card)] relative overflow-hidden flex flex-col items-center justify-center text-center p-4 font-sans">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-md shadow-[var(--accent)]/30 mb-2 z-10">
                <MapPinIcon size={22} />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)] z-10">
                {selectedMapEvent.venueName}
              </p>
              <p className="text-xs text-[var(--text-secondary)] max-w-xs z-10">
                {selectedMapEvent.address}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 font-sans">
              <span className="text-xs text-[var(--text-secondary)]">
                Valet parking at North Entrance
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${selectedMapEvent.venueName} ${selectedMapEvent.address}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--btn-radius)] bg-[var(--accent)] text-white text-xs font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLinkIcon size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
