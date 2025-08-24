import * as React from 'react';

export default function PriceRangeSlider() {
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(1000);

  const handleMinChange = (value: number) => {
    if (value <= max) setMin(value);
  };

  const handleMaxChange = (value: number) => {
    if (value >= min) setMax(value);
  };

  return (
    <div className='w-full max-w-xl mx-auto p-4'>
      {/* Title */}
      <h2 className='text-lg font-semibold mb-4'>Price Range</h2>

      {/* Slider */}
      <div className='relative h-6 mb-4'>
        {/* Track */}
        <div className='absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2' />
        {/* Active range */}
        <div
          className='absolute top-1/2 h-2 bg-red-400 rounded-full -translate-y-1/2'
          style={{
            left: `${(min / 1000) * 100}%`,
            right: `${100 - (max / 1000) * 100}%`,
          }}
        />

        {/* Min handle */}
        <input
          type='range'
          min={0}
          max={1000}
          value={min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className='absolute w-full h-6 appearance-none bg-transparent pointer-events-none'
          style={{ zIndex: min > max - 100 ? 5 : 3 }}
        />
        {/* Max handle */}
        <input
          type='range'
          min={0}
          max={1000}
          value={max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className='absolute w-full h-6 appearance-none bg-transparent pointer-events-none'
        />

        <style>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #f87171;
            border: 3px solid white;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            pointer-events: auto;
          }
          input[type='range']::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #f87171;
            border: 3px solid white;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            pointer-events: auto;
          }
        `}</style>
      </div>

      {/* Price values */}
      <div className='flex justify-between text-sm font-medium text-gray-700'>
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
