'use client';

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
                'flex w-full min-h-12 h-auto items-center justify-between rounded-md border border-input border-none px-3 py-2 text-sm bg-v2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
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
