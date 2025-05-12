import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Languages } from 'lucide-react';
import i18n from '@/i18n';
import { cn } from '../lib/utils';

const languages = [
  { code: 'uz', label: 'O‘zbekcha', emoji: 'UZ' },
  { code: 'ru', label: 'Русский', emoji: 'RU' },
  { code: 'en', label: 'English', emoji: 'US' },
];

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [open, setOpen] = useState(false); // Popover holati

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setOpen(false); // Til tanlangach, popover yopiladi
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className='h-12 flex justify-center items-center cursor-pointer bg-v5 shadow-none border-none rounded-xl w-[50px]'
          // size='icon'
        >
          <Languages className='size-6' />
        </button>
      </PopoverTrigger>
      <PopoverContent side='bottom' className='w-44 z-50 mt-2 p-2'>
        <div className='flex flex-col gap-1'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className={cn(
                'h-[50px] justify-start rounded-sm text-lg max-w-[200px] w-full',
                currentLang === lang.code ? 'bg-black text-white' : undefined
              )}
            >
              <span className='mr-2'>{lang.emoji}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
