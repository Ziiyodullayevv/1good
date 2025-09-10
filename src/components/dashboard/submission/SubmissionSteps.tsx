import { ArrowLeft } from 'lucide-react';
import React, { cloneElement, useState } from 'react';
import { StepProps } from './types';

export default function SubmissionSteps({
  steps,
  sharedProps = {},
}: {
  steps: React.ReactElement<StepProps>[];
  sharedProps?: Omit<StepProps, 'goNext' | 'goBack'>;
}) {
  const [current, setCurrent] = useState(0);
  const lastIndex = steps.length - 1;

  function goNext() {
    if (current < lastIndex) setCurrent((s) => s + 1);
  }

  function goBack() {
    if (current > 0) setCurrent((s) => s - 1);
  }

  const currentStep =
    steps[current] && React.isValidElement(steps[current])
      ? cloneElement(steps[current], { goNext, goBack, ...sharedProps })
      : null;

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={goBack}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>
                Taklif tafsilotlari
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div>{currentStep}</div>
    </div>
  );
}
