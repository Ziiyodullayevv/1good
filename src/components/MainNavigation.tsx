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
    <header className='h-18 sticky bg-white top-0 z-50 border-b'>
      <div className='section-container h-full'>
        <div className='flex xl:text-sm h-full justify-between items-center'>
          <nav className='flex gap-5 h-full xl:gap-7 items-center'>
            <Logo />
            <div className='hidden md:flex items-center xl:hidden'>
              <MobileMenu />
            </div>
            <ul className='hidden h-full xl:flex gap-4 items-center text-lg'>
              <li className='h-full'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center border-b border-black h-full'
                      : 'h-full flex justify-center hover:text-v6 transition-colors duration-100 items-center'
                  }
                  to={'/about'}
                >
                  {t('about')}
                </NavLink>
              </li>
              <li className='h-full'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center border-b border-black h-full'
                      : 'h-full flex justify-center items-center transition-colors duration-100 hover:text-v6'
                  }
                  to={'/services'}
                >
                  {t('services')}
                </NavLink>
              </li>
              <li className='h-full'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex justify-center items-center border-b border-black h-full'
                      : 'h-full flex justify-center hover:text-v6 transition-colors duration-100 items-center'
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
      </div>
    </header>
  );
}
