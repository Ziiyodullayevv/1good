import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const frameworks: Option[] = [
  { value: 'react', label: 'React' },
  { value: 'next.js', label: 'Next.js' },
  { value: 'vue.js', label: 'Vue.js' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'solidjs', label: 'SolidJS' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'ember.js', label: 'Ember.js' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'nestjs', label: 'NestJS' },
  { value: 'fastify', label: 'Fastify' },
];

// eslint-disable-next-line react-refresh/only-export-components
export const skills: Option[] = [
  // Dasturlash
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'c#', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },

  // Web texnologiyalar
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'tailwindcss', label: 'Tailwind CSS' },
  { value: 'sass', label: 'SASS' },

  // Frameworklar
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },

  // Backend va DevOps
  { value: 'nodejs', label: 'Node.js' },
  { value: 'express', label: 'Express' },
  { value: 'nestjs', label: 'NestJS' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' },
  { value: 'azure', label: 'Azure' },
  { value: 'linux', label: 'Linux' },

  // Dizayn va UI/UX
  { value: 'figma', label: 'Figma' },
  { value: 'adobe-xd', label: 'Adobe XD' },
  { value: 'photoshop', label: 'Photoshop' },
  { value: 'illustrator', label: 'Illustrator' },
  { value: 'canva', label: 'Canva' },

  // Video / Audio / Animatsiya
  { value: 'after-effects', label: 'After Effects' },
  { value: 'premiere-pro', label: 'Premiere Pro' },
  { value: 'davinci-resolve', label: 'DaVinci Resolve' },
  { value: 'blender', label: 'Blender' },
  { value: 'audacity', label: 'Audacity' },

  // Matn va tarjima
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'technical-writing', label: 'Technical Writing' },
  { value: 'seo-writing', label: 'SEO Writing' },
  { value: 'translation', label: 'Translation' },
  { value: 'proofreading', label: 'Proofreading' },

  // Marketing
  { value: 'seo', label: 'SEO' },
  { value: 'sem', label: 'SEM' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'social-media', label: 'Social Media Marketing' },
  { value: 'content-marketing', label: 'Content Marketing' },

  // Boshqa
  { value: 'data-entry', label: 'Data Entry' },
  { value: 'virtual-assistant', label: 'Virtual Assistant' },
  { value: 'customer-support', label: 'Customer Support' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'qa-testing', label: 'QA Testing' },
  { value: 'sales', label: 'Sales' },
  { value: 'business-analysis', label: 'Business Analysis' },
];

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      selected,
      onChange,
      placeholder = 'Select items...',
      className,
      disabled = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = React.useCallback(
      (item: string) => {
        onChange(selected.filter((i) => i !== item));
      },
      [onChange, selected]
    );

    const handleSelect = React.useCallback(
      (item: string) => {
        onChange(
          selected.includes(item)
            ? selected.filter((i) => i !== item)
            : [...selected, item]
        );
      },
      [onChange, selected]
    );

    const handleOpenChange = React.useCallback(
      (isOpen: boolean) => {
        if (!disabled) {
          setOpen(isOpen);
        }
      },
      [disabled]
    );

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger className='w-full'>
            <div
              role='combobox'
              aria-expanded={open}
              aria-disabled={disabled}
              className={cn(
                'flex w-full min-h-10 h-auto items-center justify-between rounded-md border border-input border-none px-3 py-2 text-sm bg-v2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled &&
                  'cursor-pointer hover:bg-accent hover:text-accent-foreground'
              )}
              onClick={() => !disabled && setOpen(!open)}
            >
              <div className='flex gap-1 flex-wrap flex-1'>
                {selected.length > 0 ? (
                  selected.map((item) => {
                    const option = options.find((opt) => opt.value === item);
                    return option ? (
                      <Badge
                        variant='secondary'
                        key={item}
                        className='mr-1 bg-white mb-1'
                      >
                        {option.label}
                        {!disabled && (
                          <button
                            className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUnselect(item);
                              }
                            }}
                            onMouseDown={handleMouseDown}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleUnselect(item);
                            }}
                            type='button'
                            aria-label={`Remove ${option.label}`}
                          >
                            <X className='h-2 w-2 text-muted-foreground hover:text-foreground' />
                          </button>
                        )}
                      </Badge>
                    ) : null;
                  })
                ) : (
                  <span className='text-muted-foreground'>{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className='w-[var(--radix-popover-trigger-width)] relative z-[9999] p-0'
            align='start'
          >
            <Command className='!w-full'>
              <CommandInput placeholder='Search...' />
              <CommandList className='!w-full'>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selected.includes(option.value);
                    return (
                      <CommandItem
                        className='bg-white'
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                      >
                        <div className='flex w-full flex-row-reverse justify-between items-center'>
                          <span
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center',
                              isSelected
                                ? 'text-primary-foreground'
                                : 'opacity-50'
                            )}
                          >
                            {isSelected && <Check className='h-3 w-3' />}
                          </span>
                          {option.label}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
