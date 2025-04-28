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

export default function MobileMenu() {
  const { t } = useTranslation('common');
  return (
    <Sheet>
      <SheetTrigger className='cursor-pointer'>
        <AlignLeft className='size-8 hidden md:block' />
        <AlignJustify className='size-8 hidden md:block' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='font-bold items-center font-montserrat'>
            <Logo />
          </SheetTitle>
          <SheetDescription asChild>
            <nav className='flex flex-col gap-3 !text-black !text-lg mt-5'>
              <Button className='btn-v2 md:hidden w-full !h-[55px]'>
                {t('auth')}
              </Button>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                    : 'items-center flex leading-[44px] rounded-lg h-[55px] px-3'
                }
                to={'/'}
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
