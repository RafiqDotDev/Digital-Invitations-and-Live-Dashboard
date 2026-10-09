import React from 'react';

export function BotanicalIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="var(--accent)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.85 }}
    >
      {/* Main graceful stem */}
      <path d="M40 215 C45 180, 52 140, 68 95 C78 68, 92 45, 102 25" />
      
      {/* Lower leaves */}
      <path d="M42 195 C30 188, 15 190, 10 200 C8 210, 25 212, 42 195 Z" />
      <path d="M10 200 C22 195, 35 196, 42 195" />
      
      <path d="M46 175 C60 170, 75 178, 82 188 C80 196, 62 192, 46 175 Z" />
      <path d="M46 175 C62 180, 72 185, 82 188" />

      {/* Mid stem leaves */}
      <path d="M53 148 C35 140, 22 145, 18 156 C16 166, 34 164, 53 148 Z" />
      <path d="M18 156 C32 150, 44 149, 53 148" />

      <path d="M58 128 C74 122, 88 128, 94 138 C90 146, 75 143, 58 128 Z" />
      <path d="M58 128 C74 130, 85 135, 94 138" />

      {/* Blooming flower petals */}
      <g transform="translate(68, 95)">
        <path d="M0 0 C-15 -8, -25 2, -20 12 C-14 20, 0 5, 0 0 Z" />
        <path d="M0 0 C-8 -18, 6 -24, 14 -16 C20 -10, 8 0, 0 0 Z" />
        <path d="M0 0 C18 -8, 26 5, 18 16 C12 22, 0 6, 0 0 Z" />
        <path d="M0 0 C-6 18, 8 24, 16 16 C20 10, 6 2, 0 0 Z" />
        <circle cx="0" cy="0" r="3.5" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" />
      </g>

      {/* Upper buds & delicate blossoms */}
      <path d="M85 58 C72 50, 64 54, 62 62 C60 70, 75 68, 85 58 Z" />
      <path d="M92 45 C104 38, 114 42, 118 48 C116 56, 102 54, 92 45 Z" />

      <g transform="translate(102, 25)">
        <path d="M0 0 C-10 -12, -4 -20, 4 -16 C10 -12, 4 -2, 0 0 Z" />
        <path d="M0 0 C10 -12, 16 -6, 12 2 C8 8, 2 2, 0 0 Z" />
        <circle cx="0" cy="0" r="2.5" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

