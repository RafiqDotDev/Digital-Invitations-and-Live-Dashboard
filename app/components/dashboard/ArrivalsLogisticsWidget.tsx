import React from 'react';
import { useWedding } from '../../context/WeddingContext';

export function ArrivalsLogisticsWidget() {
  const { stats } = useWedding();
  const arr = stats.arrivalCounts;

  const arrivalRows = [
    { date: 'Thu 10 Dec', count: arr.byDate['Thu 10 Dec'] || 14 },
    { date: 'Fri 11 Dec', count: arr.byDate['Fri 11 Dec'] || 52 },
    { date: 'Sat 12 Dec', count: arr.byDate['Sat 12 Dec'] || 60 },
  ];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3.5">
      <h3 className="text-[17px] font-normal text-[var(--text-primary)] font-serif">
        Arrivals
      </h3>

      <div className="space-y-2.5 pt-1">
        {arrivalRows.map((row) => (
          <div
            key={row.date}
            className="flex justify-between items-center text-[13px] font-sans"
          >
            <span className="text-[var(--text-primary)] font-normal">{row.date}</span>
            <span className="text-[var(--text-primary)] font-normal">{row.count} guests</span>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[12px] text-[var(--text-secondary)] font-sans border-t border-[var(--border-card)]">
        {arr.pickupsNeeded || 17} pickups needed. {arr.roomsNeeded || 23} rooms reserved.
      </div>
    </div>
  );
}
