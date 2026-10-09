import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { XIcon, SparklesIcon, SettingsIcon } from '../icons/Icons';

interface HallCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HallCustomizerDrawer({ isOpen, onClose }: HallCustomizerDrawerProps) {
  const { weddingData, updateWeddingDetails, updateHallSettings } = useWedding();

  const [activeTab, setActiveTab] = useState<'invitation' | 'rsvp' | 'branding'>('invitation');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-[var(--bg-card)] border-l border-[var(--border-card)] text-[var(--text-primary)] h-full overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--border-card)] flex items-center justify-between sticky top-0 bg-[var(--bg-card)]/95 backdrop-blur z-20">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent)] font-semibold uppercase tracking-wider font-sans">
              <SettingsIcon size={14} />
              Hall Operations Control
            </div>
            <h3 className="text-[20px] font-normal font-serif text-[var(--text-primary)]">
              Live Customizer & Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#FAF6EE] cursor-pointer"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[var(--border-card)] bg-[#F7EBDD] p-1 text-[12px] font-medium font-sans">
          {[
            { id: 'invitation', label: '1. Invitation' },
            { id: 'rsvp', label: '2. Form Fields' },
            { id: 'branding', label: '3. Hall Branding' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 rounded-[var(--btn-radius)] transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-5 flex-1 font-sans">
          {/* TAB 1: INVITATION DESIGN */}
          {activeTab === 'invitation' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Couple Display Names
                </label>
                <input
                  type="text"
                  value={weddingData.coupleNames}
                  onChange={(e) => updateWeddingDetails({ coupleNames: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Wedding Date Text
                </label>
                <input
                  type="text"
                  value={weddingData.formattedDate}
                  onChange={(e) => updateWeddingDetails({ formattedDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Hero Headline Wording
                </label>
                <textarea
                  rows={2}
                  value={weddingData.heroHeadline}
                  onChange={(e) => updateWeddingDetails({ heroHeadline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Couple Romantic Quote
                </label>
                <textarea
                  rows={2}
                  value={weddingData.storyQuote}
                  onChange={(e) => updateWeddingDetails({ storyQuote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="p-3 bg-[var(--accent-soft)]/50 border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)] flex items-center gap-2">
                <SparklesIcon size={16} className="text-[var(--accent)]" />
                <span>Edits update live in real-time across your dashboard!</span>
              </div>
            </div>
          )}

          {/* TAB 2: RSVP FORM SETTINGS */}
          {activeTab === 'rsvp' && (
            <div className="space-y-4">
              <p className="text-[12px] text-[var(--text-secondary)]">
                Toggle RSVP questions on or off depending on the couple's package.
              </p>

              {[
                {
                  key: 'askDietary',
                  label: 'Ask Dietary Requirements',
                  desc: 'Vegetarian, Vegan, Halal, Kosher, GF & Allergy notes',
                  val: weddingData.rsvpFormSettings.askDietary,
                },
                {
                  key: 'askDrinks',
                  label: 'Ask Beverage & Bar Preference',
                  desc: 'Track Wine & Cocktails vs Non-alcoholic demand',
                  val: weddingData.rsvpFormSettings.askDrinks,
                },
                {
                  key: 'askArrival',
                  label: 'Ask Travel Arrival & Shuttles',
                  desc: 'Flight/train info and airport pickup requests',
                  val: weddingData.rsvpFormSettings.askArrival,
                },
                {
                  key: 'askRoomBlocks',
                  label: 'Ask Reserved Room Blocks',
                  desc: 'Enable guests to request suites booked at venue',
                  val: weddingData.rsvpFormSettings.askRoomBlocks,
                },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="p-3.5 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="text-[12px] font-medium text-[var(--text-primary)]">{setting.label}</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">{setting.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={setting.val}
                    onChange={(e) =>
                      updateWeddingDetails({
                        rsvpFormSettings: {
                          ...weddingData.rsvpFormSettings,
                          [setting.key]: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: HALL BRANDING */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Wedding Hall / Venue Name
                </label>
                <input
                  type="text"
                  value={weddingData.hallSettings.hallName}
                  onChange={(e) => updateHallSettings({ hallName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Custom Domain Link Preview
                </label>
                <input
                  type="text"
                  value={weddingData.hallSettings.customDomain}
                  onChange={(e) => updateHallSettings({ customDomain: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Concierge Desk Direct Phone
                </label>
                <input
                  type="text"
                  value={weddingData.hallSettings.contactPhone}
                  onChange={(e) => updateHallSettings({ contactPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1">
                  Valet & Parking Instructions
                </label>
                <textarea
                  rows={2}
                  value={weddingData.hallSettings.parkingInstructions}
                  onChange={(e) => updateHallSettings({ parkingInstructions: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[var(--border-card)] bg-[#F7EBDD] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[12px] font-medium font-sans transition-all cursor-pointer"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
