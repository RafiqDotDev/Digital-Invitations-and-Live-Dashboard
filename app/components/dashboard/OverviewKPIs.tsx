import React from 'react';
import { useWedding } from '../../context/WeddingContext';

export function OverviewKPIs() {
  const { stats } = useWedding();

  const cards = [
    { label: 'Invited', count: stats.totalInvited },
    { label: 'Confirmed', count: stats.confirmedCount },
    { label: 'Declined', count: stats.declinedCount },
    { label: 'Pending', count: stats.pendingCount },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-3.5 sm:p-5 text-center transition-shadow shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[95px] sm:min-h-[110px]"
        >
          <span className="text-[12px] sm:text-[13px] font-medium text-[var(--text-secondary)] font-sans">
            {card.label}
          </span>
          <span className="text-[28px] sm:text-[36px] font-normal text-[var(--text-primary)] font-serif leading-none mt-1.5 sm:mt-2">
            {card.count}
          </span>
        </div>
      ))}
    </div>
  );
}
