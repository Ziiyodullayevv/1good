import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignJustify, AlignLeft } from 'lucide-react';
import { NavLink } from 'react-router';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { useState } from 'react';

export default function MobileMenu() {
  const { t } = useTranslation('common');

  // Sheetning ochiq yoki yopiq holatini saqlash uchun state
  const [isOpen, setIsOpen] = useState(false);

  // Sheetni yopish uchun funksiya
  const handleLinkClick = () => {
    setIsOpen(false); // Sheetni yopish
  };

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
            <nav className='flex flex-col gap-3 !text-black !text-lg mt-5'>
              <Button
                className='btn-v2 md:hidden w-full !h-[55px]'
                onClick={handleLinkClick}
              >
                {t('auth')}
              </Button>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                    : 'items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                }
                to={'/'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('home')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                    : 'items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                }
                to={'/about'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('about')}
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                    : 'items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                }
                to={'/services'}
                onClick={handleLinkClick} // Sheetni yopish
              >
                {t('services')}
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                    : 'items-center flex leading-[44px] rounded-lg h-[55px] px-3'
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
