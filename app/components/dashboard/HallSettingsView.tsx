import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import {
  SettingsIcon,
  ShieldCheckIcon,
  DownloadIcon,
  CheckCircleIcon,
  SparklesIcon,
  MapPinIcon,
  GlobeIcon,
  XIcon,
} from '../icons/Icons';

export function HallSettingsView() {
  const { weddingData, updateHallSettings, resetToSampleData } = useWedding();
  const hall = weddingData.hallSettings;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'HALL_MANAGER' | 'SUPER_ADMIN' | 'HALL_STAFF'>('HALL_MANAGER');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(weddingData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${weddingData.id}-export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported complete wedding and guest dataset as JSON!');
  };

  const handleDeleteData = () => {
    resetToSampleData();
    setIsDeleteModalOpen(false);
    showToast('Wedding records safely wiped and reset per data privacy policy.');
  };

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
          Hall Venue & Operations Settings
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] font-sans mt-0.5">
          Manage venue white-label branding, parking instructions, staff permissions, and data privacy.
        </p>
      </div>

      {/* Section 1: Venue Branding */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-card)]">
          <ShieldCheckIcon size={18} className="text-[var(--accent)]" />
          <h3 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
            Venue White-Label Branding
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Hall / Venue Display Name
            </label>
            <input
              type="text"
              value={hall.hallName}
              onChange={(e) => updateHallSettings({ hallName: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Custom White-Label Domain
            </label>
            <input
              type="text"
              value={hall.customDomain}
              onChange={(e) => updateHallSettings({ customDomain: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Banquet Contact Email
            </label>
            <input
              type="email"
              value={hall.contactEmail}
              onChange={(e) => updateHallSettings({ contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Banquet Phone / WhatsApp
            </label>
            <input
              type="text"
              value={hall.contactPhone}
              onChange={(e) => updateHallSettings({ contactPhone: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Hall Directions & Logistics */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-card)]">
          <MapPinIcon size={18} className="text-[var(--accent)]" />
          <h3 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
            Guest Arrival & Entry Instructions (Shown Inside Invitation)
          </h3>
        </div>

        <div className="space-y-4 text-[13px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-1">
                Venue Physical Street Address
              </label>
              <input
                type="text"
                value={hall.address}
                onChange={(e) => updateHallSettings({ address: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-1">
                City, State / Region
              </label>
              <input
                type="text"
                value={hall.city}
                onChange={(e) => updateHallSettings({ city: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Valet & Parking Instructions
            </label>
            <textarea
              rows={2}
              value={hall.parkingInstructions}
              onChange={(e) => updateHallSettings({ parkingInstructions: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block font-medium text-[var(--text-secondary)] mb-1">
              Entry Concierge & Check-in Directions
            </label>
            <textarea
              rows={2}
              value={hall.entryInstructions}
              onChange={(e) => updateHallSettings({ entryInstructions: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Multi-Tenancy Roles & Permissions */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-card)]">
          <div className="flex items-center gap-2">
            <GlobeIcon size={18} className="text-[var(--accent)]" />
            <h3 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
              Multi-Tenant Access Roles
            </h3>
          </div>
          <span className="text-[11px] text-[var(--text-secondary)] font-mono">
            Active: {selectedRole}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
          {[
            {
              role: 'HALL_MANAGER' as const,
              title: 'Hall Manager',
              desc: 'Full control over the hall’s weddings, RSVPs, settings, and reminders.',
            },
            {
              role: 'HALL_STAFF' as const,
              title: 'Hall Staff (Kitchen / Ops)',
              desc: 'Read-only view of guest headcounts, dietary allergies, and BEO exports.',
            },
            {
              role: 'SUPER_ADMIN' as const,
              title: 'Super Admin',
              desc: 'Manages all wedding venues, wholesale packages, and global billing.',
            },
          ].map((r) => (
            <div
              key={r.role}
              onClick={() => setSelectedRole(r.role)}
              className={`p-3.5 rounded-[10px] border transition-all cursor-pointer space-y-1 ${
                selectedRole === r.role
                  ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text-primary)] font-medium shadow-xs'
                  : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px]">{r.title}</span>
                {selectedRole === r.role && <CheckCircleIcon size={14} className="text-[var(--accent)]" />}
              </div>
              <p className="text-[11px] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Data & Privacy Policy Management */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-card)]">
          <ShieldCheckIcon size={18} className="text-[var(--accent)]" />
          <h3 className="text-[17px] font-serif font-normal text-[var(--text-primary)]">
            Data Ownership & Privacy Management
          </h3>
        </div>

        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          Guest data strictly belongs to the couple and your venue. In accordance with data privacy guidelines,
          you can export complete records for catering archives or wipe wedding data upon event conclusion.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-[var(--btn-radius)] bg-[var(--bg-card)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[#FAF6EE] text-[12px] font-medium transition-colors cursor-pointer w-full sm:w-auto"
          >
            <DownloadIcon size={14} />
            <span>Export Complete Dataset (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-[var(--btn-radius)] border border-[#B5524A] text-[#B5524A] hover:bg-[#FAF6EE] text-[12px] font-medium transition-colors cursor-pointer w-full sm:w-auto"
          >
            <span>Delete Wedding Data Post-Event</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[var(--bg-card)] rounded-[var(--card-radius)] border border-[var(--border-card)] p-6 space-y-4 shadow-2xl text-[var(--text-primary)]">
            <div className="flex items-center justify-between">
              <h4 className="text-[18px] font-serif font-normal text-[#B5524A]">
                Confirm Wedding Data Wipe
              </h4>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <XIcon size={18} />
              </button>
            </div>

            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              Are you sure you want to delete and reset guest and RSVP data for{' '}
              <strong>{weddingData.coupleNames}</strong>? This action simulates post-wedding archive deletion.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3 py-1.5 rounded-[var(--btn-radius)] border border-[var(--border-card)] text-[12px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteData}
                className="px-4 py-1.5 rounded-[var(--btn-radius)] bg-[#B5524A] hover:bg-[#A1443D] text-white text-[12px] font-medium"
              >
                Confirm & Wipe Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

