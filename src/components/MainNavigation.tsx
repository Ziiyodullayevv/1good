import { NavLink, useNavigate } from 'react-router';
import { Button } from './ui/button';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';

export default function MainNavigation() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  return (
    <header className='section-container sticky top-0 bg-white z-999 border-b'>
      <div className='flex xl:text-sm justify-between py-3 items-center'>
        <nav className='flex gap-5 xl:gap-7 items-center'>
          <Logo />
          <div className='h-full hidden md:flex items-center xl:hidden'>
            <MobileMenu />
          </div>
          <ul className='hidden xl:flex items-center text-lg'>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 flex justify-center items-center rounded-lg h-12 px-3'
                    : 'h-12 px-3'
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
                    ? 'bg-v2 flex justify-center items-center rounded-lg h-12 px-3'
                    : 'h-12 px-3'
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
                    ? 'bg-v2 flex  justify-center items-center rounded-lg h-12 px-3'
                    : 'h-12 px-3'
                }
                to={'/usecases'}
              >
                {t('useCases')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className='hidden md:flex justify-start gap-3'>
          <Button
            onClick={() => navigate('auth')}
            className='h-12 rounded-xl bg-transparent text-black shadow-none hover:bg-transparent text-base px-2 cursor-pointer'
          >
            Log in
          </Button>

          <Button
            onClick={() => navigate('auth')}
            className='h-12 rounded-xl text-base px-5 cursor-pointer'
          >
            Sign up
          </Button>
          <LanguageSwitcher />
        </div>

        <div className='h-full gap-4 flex md:hidden items-center xl:hidden'>
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
