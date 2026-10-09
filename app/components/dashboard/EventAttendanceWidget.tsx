import React from 'react';
import { useWedding } from '../../context/WeddingContext';

interface EventAttendanceWidgetProps {
  customEvents?: { title: string; count: number; total?: number }[];
  title?: string;
}

export function EventAttendanceWidget({ customEvents, title = 'Attendance by event' }: EventAttendanceWidgetProps) {
  const { weddingData, stats } = useWedding();

  const events = customEvents || [
    { title: 'Welcome Dinner', count: stats.eventCounts['welcome-dinner'] || 58, total: stats.totalInvited },
    { title: 'Ceremony', count: stats.eventCounts['ceremony'] || 126, total: stats.totalInvited },
    { title: 'Reception', count: stats.eventCounts['reception'] || 118, total: stats.totalInvited },
  ];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
      <h3 className="text-[17px] font-normal text-[var(--text-primary)] font-serif">
        {title}
      </h3>

      <div className="space-y-3.5 pt-1">
        {events.map((ev) => {
          const total = ev.total || stats.totalInvited || 180;
          const percentage = Math.min(100, Math.round((ev.count / total) * 100));

          return (
            <div key={ev.title} className="space-y-1.5">
              <div className="flex justify-between items-center text-[13px] font-sans">
                <span className="text-[var(--text-primary)] font-medium">{ev.title}</span>
                <span className="text-[var(--text-primary)] font-medium font-sans">{ev.count}</span>
              </div>

              {/* Progress bar: 6px height, fully rounded, accent fill on --progress-track */}
              <div className="w-full bg-[var(--progress-track)] h-[6px] rounded-full overflow-hidden">
                <div
                  className="bg-[var(--accent)] h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
