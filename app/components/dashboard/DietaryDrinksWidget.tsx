import React from 'react';
import { useWedding } from '../../context/WeddingContext';

export function DietaryDrinksWidget() {
  const { stats } = useWedding();
  const d = stats.dietaryCounts;

  const chips = [
    { label: 'Vegetarian', count: d.vegetarian || 16 },
    { label: 'Vegan', count: d.vegan || 7 },
    { label: 'Halal', count: d.halal || 31 },
    { label: 'Gluten free', count: d.glutenFree || 6 },
    { label: 'Kosher', count: d.kosher || 2 },
    { label: 'Wine and cocktails', count: d.wineCocktails || 96 },
    { label: 'Non alcoholic', count: d.nonAlcoholic || 32 },
  ];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3.5">
      <h3 className="text-[17px] font-normal text-[var(--text-primary)] font-serif">
        Dietary and drinks
      </h3>

      <div className="flex flex-wrap gap-2 pt-1">
        {chips.map((chip) => (
          <span
            key={chip.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--chip-radius)] bg-[var(--accent-soft)] text-[var(--text-primary)] text-[12px] font-medium font-sans"
          >
            <span>{chip.label}</span>
            <span className="font-semibold">{chip.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
