import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Languages } from 'lucide-react';
import i18n from '@/i18n';
import { cn } from '../lib/utils';

const languages = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

  return (
    <Popover className='relative'>
      <PopoverButton className='h-10 w-[50px] flex justify-center items-center cursor-pointer bg-v5 border-none rounded-lg'>
        <Languages className='size-5' />
      </PopoverButton>

      <PopoverPanel className='absolute z-50 mt-2 w-44 right-0 bg-white rounded-lg shadow-lg p-2'>
        <div className='flex flex-col gap-1'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className={cn(
                'h-[50px] flex items-center px-4 justify-start rounded-sm text-lg w-full',
                currentLang === lang.code
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              )}
            >
              <span className='mr-2'>{lang.code}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default LanguageSwitcher;
