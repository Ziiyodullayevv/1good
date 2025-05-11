import { NavLink, useNavigate } from 'react-router';
import { Button } from './ui/button';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export default function MainNavigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const { t } = useTranslation('common');
  return (
    <header
      className={cn(
        'h-18 sticky z-50 bg-white border-b top-0',
        scrolled
          ? 'border-b transition-all duration-300 border-black/10'
          : 'border-transparent'
      )}
    >
      <div className='section-container h-full'>
        <div className='flex xl:text-sm h-full justify-between items-center'>
          <nav className='flex gap-5 h-full xl:gap-8 items-center'>
            <Logo />
            <div className='hidden md:flex items-center xl:hidden'>
              <MobileMenu />
            </div>
            <ul className='hidden h-full xl:flex gap-4 items-center text-lg'>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center bg-v2 h-12 rounded-xl px-3'
                      : 'h-12 flex justify-center rounded-xl hover:text-v6 px-3 transition-colors duration-100 items-center'
                  }
                  to={'/about'}
                >
                  {t('about')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center bg-v2 h-12 rounded-xl px-3'
                      : 'h-12 flex justify-center rounded-xl hover:text-v6 px-3 transition-colors duration-100 items-center'
                  }
                  to={'/services'}
                >
                  {t('services')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center bg-v2 h-12 rounded-xl px-3'
                      : 'h-12 flex justify-center rounded-xl hover:text-v6 px-3 transition-colors duration-100 items-center'
                  }
                  to={'/usecases'}
                >
                  {t('useCases')}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className='hidden md:flex justify-start gap-3'>
            {/* <Button
              onClick={() => navigate('auth')}
              className='h-12 rounded-xl bg-transparent text-black shadow-none hover:bg-transparent text-base px-2 cursor-pointer'
            >
              Log in
            </Button> */}
            <LanguageSwitcher />
            <Button
              onClick={() => navigate('coming-soon')}
              className='h-12 rounded-xl text-base px-5 cursor-pointer'
            >
              {t('auth')}
            </Button>
          </div>

          <div className='h-full gap-4 flex md:hidden items-center xl:hidden'>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
