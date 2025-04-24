import { NavLink } from 'react-router';
import { Button } from './ui/button';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function MainNavigation() {
  const { t } = useTranslation('common');
  return (
    <header className='section-container'>
      <div className='flex justify-between py-5 items-center'>
        <nav className='flex gap-20 items-center'>
          <Logo />
          <ul className='flex items-center text-xl gap-8'>
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

        <div className='flex justify-start gap-5'>
          <LanguageSwitcher />
          <Button className='h-[60px] rounded-xl text-xl px-5 cursor-pointer'>
            {t('auth')}
          </Button>
        </div>
      </div>
    </header>
  );
}
