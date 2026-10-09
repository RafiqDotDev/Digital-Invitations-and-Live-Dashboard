import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';

interface YourInvitationCardProps {
  onEditInvitation: () => void;
}

export function YourInvitationCard({ onEditInvitation }: YourInvitationCardProps) {
  const { weddingData } = useWedding();
  const [copied, setCopied] = useState(false);

  const inviteUrl = 'invite.example.com/zarandadam';

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
      <h3 className="text-[17px] font-normal text-[var(--text-primary)] font-serif">
        Your invitation
      </h3>

      {/* Framed Invitation Preview */}
      <div className="relative w-full aspect-[4/3] rounded-[10px] bg-[#FFFBF4] border border-[var(--border-card)] p-2.5 flex items-center justify-center overflow-hidden">
        {/* Inner thin gold double border */}
        <div className="w-full h-full border border-[var(--accent-soft)] rounded-[6px] relative p-3 flex flex-col items-center justify-center text-center">
          {/* Subtle botanical line-art corners */}
          <div className="absolute top-1.5 right-1.5 text-[var(--accent)] opacity-60">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2 C16 6, 20 10, 22 14 M12 2 C10 8, 14 14, 18 18 M16 4 C14 8, 10 10, 8 12" />
            </svg>
          </div>
          <div className="absolute bottom-1.5 left-1.5 text-[var(--accent)] opacity-60">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 22 C8 18, 4 14, 2 10 M12 22 C14 16, 10 10, 6 6 M8 20 C10 16, 14 14, 16 12" />
            </svg>
          </div>

          {/* Script calligraphy names */}
          <div className="space-y-0.5 select-none">
            <p className="text-[26px] font-normal text-[var(--text-primary)] font-script leading-tight">
              Zara
            </p>
            <p className="text-[12px] font-normal italic text-[var(--text-secondary)] font-serif">
              and
            </p>
            <p className="text-[26px] font-normal text-[var(--text-primary)] font-script leading-tight">
              Adam
            </p>
          </div>
        </div>
      </div>

      {/* URL text below preview */}
      <div className="text-center">
        <p className="text-[12px] text-[var(--text-primary)] font-sans truncate">
          {inviteUrl}
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onEditInvitation}
          className="w-full py-2.5 px-4 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium font-sans transition-colors cursor-pointer text-center"
        >
          Edit invitation
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-[var(--btn-radius)] border border-[var(--border-card)] bg-[var(--bg-card)] hover:bg-[#F9F3EA] text-[var(--accent)] text-[13px] font-medium font-sans transition-colors cursor-pointer text-center"
        >
          {copied ? 'Copied to clipboard!' : 'Copy link'}
        </button>

        <p className="text-[11px] text-[var(--text-secondary)] text-center font-sans">
          Last edited today
        </p>
      </div>
    </div>
  );
}

