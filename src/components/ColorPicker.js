import React, { useState } from 'react';

export const AVAILABLE_COLORS = [
  'Black', 'White', 'Grey', 'Red', 'Orange', 'Yellow',
  'Green', 'Blue', 'Navy', 'Purple', 'Pink', 'Brown', 'Beige', 'Gold', 'Silver'
];

export const COLOR_SWATCHES = {
  Black: '#000000', White: '#FFFFFF', Grey: '#808080', Red: '#DC2626',
  Orange: '#EA580C', Yellow: '#EAB308', Green: '#16A34A', Blue: '#2563EB',
  Navy: '#1E3A8A', Purple: '#9333EA', Pink: '#EC4899', Brown: '#78350F',
  Beige: '#D8C3A5', Gold: '#D4AF37', Silver: '#C0C0C0'
};

function ColorPicker({ colors, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <div className="font-bold">
        Colors <span className="text-gray-400 font-normal normal-case">(optional)</span>
      </div>
      <div className="relative mt-1">
        <div
          className="flex items-center justify-between w-full border border-gray-400 rounded-lg px-3 py-2 cursor-pointer bg-white"
          onClick={() => setOpen(!open)}
        >
          <span className="normal-case text-gray-600">
            {colors.length > 0 ? `${colors.length} selected` : 'Select colors'}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {open && (
          <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto border rounded-lg bg-white shadow-lg">
            {AVAILABLE_COLORS.map((color) => (
              <label key={color} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer normal-case">
                <input type="checkbox" checked={colors.includes(color)} onChange={() => onToggle(color)} />
                <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: COLOR_SWATCHES[color] }} />
                <span>{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full border normal-case">
              <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: COLOR_SWATCHES[color] }} />
              <span>{color}</span>
              <button type="button" className="text-gray-400 hover:text-red-500 ml-1" onClick={() => onToggle(color)}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;