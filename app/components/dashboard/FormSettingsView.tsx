import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import {
  UtensilsIcon,
  WineIcon,
  PlaneIcon,
  HotelIcon,
  UsersIcon,
  CheckIcon,
  SparklesIcon,
} from '../icons/Icons';

export function FormSettingsView() {
  const { weddingData, updateWeddingDetails } = useWedding();
  const settings = weddingData.rsvpFormSettings;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggle = (key: keyof typeof settings) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };
    updateWeddingDetails({ rsvpFormSettings: updated });
    showToast(`Updated form setting: ${key} is now ${updated[key] ? 'Enabled' : 'Disabled'}`);
  };

  const toggles = [
    {
      key: 'askDietary' as const,
      label: 'Dietary Restrictions & Allergies',
      description:
        'Asks each guest for dietary choices (Vegetarian, Vegan, Halal, Kosher, Gluten Free, Allergies) to send exact counts to banquet chefs.',
      icon: UtensilsIcon,
      enabled: settings.askDietary,
    },
    {
      key: 'askDrinks' as const,
      label: 'Beverage & Bar Preferences',
      description:
        'Enables guests to choose between Wine & Cocktails, Non-Alcoholic, or Soft Drinks for bartending stock planning.',
      icon: WineIcon,
      enabled: settings.askDrinks,
    },
    {
      key: 'askArrival' as const,
      label: 'Arrival Itinerary & Airport Pickups',
      description:
        'Collects party arrival day, arrival time, transportation type (car, flight, train), and whether an airport shuttle pickup is requested.',
      icon: PlaneIcon,
      enabled: settings.askArrival,
    },
    {
      key: 'askRoomBlocks' as const,
      label: 'Hotel Room Blocks & Accommodations',
      description:
        'Asks families how many hotel rooms they require from the venue room block.',
      icon: HotelIcon,
      enabled: settings.askRoomBlocks,
    },
    {
      key: 'allowPlusOnes' as const,
      label: 'Plus-Ones & Additional Family Members',
      description:
        'Permits the invited family to specify extra attendees and plus-ones beyond the standard invitation allocation.',
      icon: UsersIcon,
      enabled: settings.allowPlusOnes,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--bg-card)] border border-[var(--accent)] text-[var(--text-primary)] px-4 py-3 rounded-[var(--btn-radius)] shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <SparklesIcon size={16} className="text-[var(--accent)]" />
          <span className="text-[12px] font-medium font-sans">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-2 border-b border-[var(--border-card)]">
        <h2 className="text-[28px] font-normal text-[var(--text-primary)] font-serif leading-tight">
          RSVP Form Settings
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] font-sans mt-0.5">
          Configure which questions and logistics requirements appear in the guest mobile RSVP wizard.
        </p>
      </div>

      {/* Toggle Cards List */}
      <div className="space-y-3">
        {toggles.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 flex items-start justify-between gap-4 hover:border-[var(--accent)]/60 transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                    item.enabled
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                      : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)]'
                  }`}
                >
                  <Icon size={20} />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {item.label}
                    </h4>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        item.enabled
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'bg-[#FAF6EE] text-[var(--text-secondary)]'
                      }`}
                    >
                      {item.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* iOS Style Switch */}
              <div className="shrink-0 pt-1">
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    item.enabled ? 'bg-[var(--accent)]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      item.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Form Summary Matrix */}
      <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 space-y-3">
        <h4 className="text-[15px] font-serif font-normal text-[var(--text-primary)]">
          Live Guest RSVP Flow Summary
        </h4>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Based on the toggles enabled above, guests will complete the following stages in under 2 minutes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-[12px]">
          <div className="p-3 bg-white rounded-[10px] border border-[var(--border-card)] space-y-1">
            <div className="font-bold text-[#B8975A]">Step 1: Events</div>
            <p className="text-[11px] text-[var(--text-secondary)]">Always active. Selects attending multi-day functions.</p>
          </div>

          <div
            className={`p-3 rounded-[10px] border space-y-1 transition-opacity ${
              settings.askDietary || settings.askDrinks
                ? 'bg-white border-[var(--border-card)]'
                : 'bg-transparent border-dashed border-[#D8D8D8] opacity-50'
            }`}
          >
            <div className="font-bold text-[#B8975A]">
              Step 2: Food & Drinks {!(settings.askDietary || settings.askDrinks) && '(Skipped)'}
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {settings.askDietary ? 'Dietary allergies' : ''}{' '}
              {settings.askDrinks ? '+ drink preferences' : ''}
            </p>
          </div>

          <div
            className={`p-3 rounded-[10px] border space-y-1 transition-opacity ${
              settings.askArrival || settings.askRoomBlocks
                ? 'bg-white border-[var(--border-card)]'
                : 'bg-transparent border-dashed border-[#D8D8D8] opacity-50'
            }`}
          >
            <div className="font-bold text-[#B8975A]">
              Step 3: Arrival {!(settings.askArrival || settings.askRoomBlocks) && '(Skipped)'}
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {settings.askArrival ? 'Date, flights, shuttles' : ''}{' '}
              {settings.askRoomBlocks ? '+ hotel rooms' : ''}
            </p>
          </div>

          <div className="p-3 bg-white rounded-[10px] border border-[var(--border-card)] space-y-1">
            <div className="font-bold text-[#B8975A]">Step 4: Review</div>
            <p className="text-[11px] text-[var(--text-secondary)]">Summary review & WhatsApp/Email confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

