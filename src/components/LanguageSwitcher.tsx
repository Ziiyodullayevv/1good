import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import i18n from '@/i18n';

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
        <Button
          variant='outline'
          className='h-[60px] cursor-pointer shadow-none border-none rounded-xl w-[70px]'
          size='icon'
        >
          <Languages className='size-7' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-44 p-2'>
        <div className='flex flex-col gap-1'>
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={currentLang === lang.code ? 'default' : 'ghost'}
              onClick={() => handleChangeLanguage(lang.code)}
              className='h-[50px] justify-start text-lg max-w-[200px] w-full'
            >
              <span className='mr-2'>{lang.emoji}</span>
              {lang.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
