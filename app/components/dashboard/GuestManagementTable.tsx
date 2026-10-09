import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import type { RSVPStatus, WeddingSide } from '../../types/wedding';
import {
  SearchIcon,
  BellIcon,
  CopyIcon,
  SparklesIcon,
} from '../icons/Icons';

export function GuestManagementTable() {
  const { weddingData, updateGuestStatus, sendReminder, sendRemindersToAllPending } = useWedding();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RSVPStatus>('all');
  const [sideFilter, setSideFilter] = useState<'all' | WeddingSide>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredGuests = weddingData.guests.filter((g) => {
    const matchesSearch =
      g.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    const matchesSide = sideFilter === 'all' || g.side === sideFilter;

    return matchesSearch && matchesStatus && matchesSide;
  });

  const handleCopyPersonalLink = (familyName: string, side: WeddingSide) => {
    const encoded = encodeURIComponent(familyName);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://grandhall.com';
    const link = `${origin}/?family=${encoded}&side=${side}`;

    navigator.clipboard?.writeText(link);
    showToast(`Copied personalized link for ${familyName}`);
  };

  const handleRemindSingle = (id: string, name: string) => {
    sendReminder(id);
    showToast(`Automated WhatsApp & Email reminder sent to ${name}!`);
  };

  const handleRemindAllPending = () => {
    const result = sendRemindersToAllPending();
    showToast(`Sent reminders to ${result.count} pending guest parties!`);
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4 p-5">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--bg-card)] border border-[var(--accent)] text-[var(--text-primary)] px-4 py-3 rounded-[var(--btn-radius)] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <SparklesIcon size={16} className="text-[var(--accent)]" />
          <span className="text-[12px] font-medium font-sans">{toastMessage}</span>
        </div>
      )}

      {/* Header & Bulk Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h4 className="text-[17px] font-normal text-[var(--text-primary)] font-serif">
            Guests & Live RSVP List
          </h4>
          <p className="text-[12px] text-[var(--text-secondary)] font-sans">
            Manage guest party responses, catering dietary needs, and invitations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRemindAllPending}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[12px] font-medium font-sans transition-all cursor-pointer"
        >
          <BellIcon size={14} />
          <span>Remind All Pending</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search family or guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 text-[12px] font-sans max-w-full overflow-x-auto pb-1 sm:pb-0">
          {/* Status Filter */}
          <div className="flex items-center bg-[#FAF6EE] p-0.5 rounded-[var(--btn-radius)] border border-[var(--border-card)] shrink-0">
            {(['all', 'confirmed', 'pending', 'declined'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-[6px] capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Side Filter */}
          <div className="flex items-center bg-[#FAF6EE] p-0.5 rounded-[var(--btn-radius)] border border-[var(--border-card)] shrink-0">
            {(['all', 'bride', 'groom'] as const).map((sd) => (
              <button
                key={sd}
                type="button"
                onClick={() => setSideFilter(sd)}
                className={`px-2.5 py-1 rounded-[6px] capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  sideFilter === sd
                    ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {sd === 'all' ? 'All Sides' : `${sd} Side`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[10px] border border-[var(--border-card)]">
        <table className="w-full text-left text-[12px] text-[var(--text-primary)] font-sans">
          <thead className="bg-[#F7EBDD] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider border-b border-[var(--border-card)]">
            <tr>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Party / Guest</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Side</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Status</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Attending Events</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Dietary & Bar</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Logistics</th>
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-card)] bg-[var(--bg-card)]">
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                  No guest responses matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => {
                const isConfirmed = guest.status === 'confirmed';
                const isPending = guest.status === 'pending';
                const isDeclined = guest.status === 'declined';

                return (
                  <tr key={guest.id} className="hover:bg-[#FAF4EA] transition-colors">
                    {/* Guest name */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-[var(--text-primary)]">{guest.familyName}</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        {guest.contactName} • {guest.guestCount} {guest.guestCount > 1 ? 'guests' : 'guest'}
                      </div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{guest.phone}</div>
                    </td>

                    {/* Side */}
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          guest.side === 'bride'
                            ? 'bg-[#FDF0EE] text-[#A64B3B] border-[#F1D0CB]'
                            : 'bg-[#EFF5FB] text-[#36689C] border-[#D1E3F5]'
                        }`}
                      >
                        {guest.side === 'bride' ? 'Bride Side' : 'Groom Side'}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="px-3 py-3">
                      <select
                        value={guest.status}
                        onChange={(e) => updateGuestStatus(guest.id, e.target.value as RSVPStatus)}
                        className={`text-[11px] font-semibold rounded-[6px] px-2 py-1 border bg-[var(--bg-card)] cursor-pointer focus:outline-none ${
                          isConfirmed
                            ? 'text-emerald-700 border-emerald-300'
                            : isDeclined
                            ? 'text-rose-700 border-rose-300'
                            : 'text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>

                    {/* Attending Events */}
                    <td className="px-3 py-3">
                      {isDeclined ? (
                        <span className="text-[var(--text-secondary)] italic text-[11px]">Cannot attend</span>
                      ) : guest.attendingEventIds.length === 0 ? (
                        <span className="text-[var(--text-secondary)] italic text-[11px]">Pending reply</span>
                      ) : (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {guest.attendingEventIds.map((eid) => {
                            const ev = weddingData.events.find((e) => e.id === eid);
                            return (
                              <span
                                key={eid}
                                className="px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[10px] text-[var(--text-primary)]"
                              >
                                {ev ? ev.title.split(' ')[0] : eid}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* Dietary */}
                    <td className="px-3 py-3">
                      {isConfirmed ? (
                        <div className="space-y-0.5 max-w-[180px]">
                          <div className="text-[11px] text-[var(--text-primary)]">
                            {guest.dietary.vegetarian > 0 && `${guest.dietary.vegetarian} Veg `}
                            {guest.dietary.halal > 0 && `${guest.dietary.halal} Halal `}
                            {guest.dietary.vegan > 0 && `${guest.dietary.vegan} Vegan `}
                            {guest.dietary.kosher > 0 && `${guest.dietary.kosher} Kosher `}
                            {guest.dietary.glutenFree > 0 && `${guest.dietary.glutenFree} GF`}
                          </div>
                          {guest.dietary.allergies && (
                            <div className="text-[10px] text-rose-700 font-mono truncate">
                              ⚠ {guest.dietary.allergies}
                            </div>
                          )}
                          <div className="text-[10px] text-[var(--text-secondary)] capitalize">
                            Bar: {guest.dietary.drinksPreference.replace('_', ' ')}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[var(--text-secondary)]">—</span>
                      )}
                    </td>

                    {/* Logistics */}
                    <td className="px-3 py-3">
                      {isConfirmed && guest.arrival.arrivalDate ? (
                        <div className="space-y-0.5 text-[11px]">
                          <span className="text-[var(--text-primary)]">
                            {guest.arrival.arrivalDate}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                            {guest.arrival.pickupNeeded && (
                              <span className="text-[var(--accent)] font-medium">Pickup</span>
                            )}
                            {guest.arrival.roomsNeeded > 0 && (
                              <span>• {guest.arrival.roomsNeeded} Room(s)</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[var(--text-secondary)]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {isPending && (
                          <button
                            type="button"
                            onClick={() => handleRemindSingle(guest.id, guest.contactName)}
                            className={`p-1.5 rounded-[6px] border text-xs transition-colors cursor-pointer ${
                              guest.reminderSent
                                ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] border-[var(--accent)]'
                                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-card)] hover:text-[var(--text-primary)]'
                            }`}
                            title={guest.reminderSent ? 'Reminder sent' : 'Send reminder'}
                          >
                            <BellIcon size={13} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleCopyPersonalLink(guest.familyName, guest.side)}
                          className="p-1.5 rounded-[6px] bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-card)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                          title="Copy personalized guest link"
                        >
                          <CopyIcon size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
