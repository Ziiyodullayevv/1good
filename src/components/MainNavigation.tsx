import { Link, NavLink } from 'react-router';
import { Button } from './ui/button';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';

export default function MainNavigation() {
  const { t } = useTranslation('common');
  return (
    <header className='section-container'>
      <div className='flex xl:text-sm justify-between py-5 items-center'>
        <nav className='flex gap-7 xl:gap-10 items-center'>
          <Logo />
          <div className='h-full hidden md:flex items-center xl:hidden'>
            <MobileMenu />
          </div>
          <ul className='hidden xl:flex items-center text-xl gap-8'>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
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
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
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
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
                }
                to={'/usecases'}
              >
                {t('useCases')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className='hidden md:flex justify-start gap-5'>
          <LanguageSwitcher />
          <Link to={'/auth'}>
            <Button className='h-[60px] rounded-xl text-xl px-5 cursor-pointer'>
              {t('auth')}
            </Button>
          </Link>
        </div>

        <div className='h-full gap-4 flex md:hidden items-center xl:hidden'>
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
