import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignJustify, AlignLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const { t } = useTranslation('common');

  // Sheetning ochiq yoki yopiq holatini saqlash uchun state
  const [isOpen, setIsOpen] = useState(false);

  // Sheetni yopish uchun funksiya
  const handleLinkClick = () => {
    setIsOpen(false); // Sheetni yopish
  };

  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className='cursor-pointer'>
        <AlignLeft className='size-8 hidden md:block' />
        <AlignJustify className='size-8 md:hidden' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='font-bold items-center font-montserrat'>
            <Logo />
          </SheetTitle>
          <SheetDescription asChild>
            <nav className='flex flex-col gap-3 !text-black mt-5'>
              <div className='flex w-full gap-2'>
                <div className='w-full'>
                  <Button
                    className='md:hidden rounded-2xl w-full h-12'
                    onClick={() => {
                      handleLinkClick();
                      navigate('coming-soon');
                    }}
                  >
                    {t('auth')}
                  </Button>
                </div>
                <div>
                  <LanguageSwitcher />
                </div>
              </div>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 w-full items-center flex leading-12 rounded-lg h-12 px-4'
                    : 'items-center flex leading-12 rounded-lg h-12 px-4'
                }
                to={'/'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('home')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-12 rounded-lg h-12 px-4'
                    : 'items-center flex leading-12 rounded-lg h-12 px-4'
                }
                to={'/about'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('about')}
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-12 rounded-lg h-12 px-4'
                    : 'items-center flex leading-12 rounded-lg h-12 px-4'
                }
                to={'/services'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('services')}
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-12 rounded-lg h-12 px-4'
                    : 'items-center flex leading-12 rounded-lg h-12 px-4'
                }
                to={'/usecases'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('useCases')}
              </NavLink>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
