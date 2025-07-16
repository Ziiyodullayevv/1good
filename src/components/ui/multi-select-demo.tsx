'use client';

import * as React from 'react';
import { MultiSelect, type Option } from '@/components/ui/multi-select';

const frameworks: Option[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'express.js', label: 'Express.js' },
  { value: 'nest.js', label: 'Nest.js' },
];

const languages: Option[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
];

export default function MultiSelectDemo() {
  // Use state updater functions to ensure proper batching in React 18
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    []
  );

  // Use callbacks for state updates to prevent unnecessary re-renders
  const handleFrameworksChange = React.useCallback((values: string[]) => {
    setSelectedFrameworks(values);
  }, []);

  const handleLanguagesChange = React.useCallback((values: string[]) => {
    setSelectedLanguages(values);
  }, []);

  return (
    <div className='flex z-[9999] flex-col gap-8 p-8 max-w-2xl mx-auto'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>Multi Select Component</h1>
        <p className='text-muted-foreground'>
          Select multiple options from the dropdown menus below.
        </p>
      </div>

      <div className=' relative z-[9999] space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='frameworks-select' className='text-sm font-medium'>
            Select Frameworks
          </label>
          <MultiSelect
            options={frameworks}
            selected={selectedFrameworks}
            onChange={handleFrameworksChange}
            placeholder='Choose frameworks...'
            className='w-full'
          />
          {selectedFrameworks.length > 0 && (
            <p className='text-sm text-muted-foreground'>
              Selected:{' '}
              {selectedFrameworks
                .map((value) => {
                  const option = frameworks.find((opt) => opt.value === value);
                  return option?.label;
                })
                .join(', ')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='languages-select' className='text-sm font-medium'>
            Select Programming Languages
          </label>
          <MultiSelect
            options={languages}
            selected={selectedLanguages}
            onChange={handleLanguagesChange}
            placeholder='Choose languages...'
            className='w-full'
          />
          {selectedLanguages.length > 0 && (
            <p className='text-sm text-muted-foreground'>
              Selected:{' '}
              {selectedLanguages
                .map((value) => {
                  const option = languages.find((opt) => opt.value === value);
                  return option?.label;
                })
                .join(', ')}
            </p>
          )}
        </div>

        <div className='p-4 bg-muted rounded-lg'>
          <h3 className='font-medium mb-2'>Selected Values:</h3>
          <div className='space-y-1 text-sm'>
            <div>
              <strong>Frameworks:</strong>{' '}
              {selectedFrameworks.length > 0
                ? frameworks
                    .filter((opt) => selectedFrameworks.includes(opt.value))
                    .map((opt) => opt.label)
                    .join(', ')
                : 'None'}
            </div>
            <div>
              <strong>Languages:</strong>{' '}
              {selectedLanguages.length > 0
                ? languages
                    .filter((opt) => selectedLanguages.includes(opt.value))
                    .map((opt) => opt.label)
                    .join(', ')
                : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
