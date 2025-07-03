'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button'; // ShadCN'dagi button
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerDemoProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function DatePickerDemo({ value, onChange }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(value || undefined);

  React.useEffect(() => {
    setDate(value || undefined);
  }, [value]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onChange?.(newDate || null);
  };

  return (
    <Popover>
      <PopoverTrigger className='w-full' asChild>
        <Button
          variant='outline'
          data-empty={!date}
          className='data-[empty=true]:text-muted-foreground relative h-12 bg-v2 border-none shadow-none mt-3 w-full z-[9999] justify-start text-left font-normal'
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='min-w-full z-[9999]'>
        <Calendar
          mode='single'
          className='min-w-full'
          selected={date}
          onSelect={handleDateChange}
        />
      </PopoverContent>
    </Popover>
  );
}
