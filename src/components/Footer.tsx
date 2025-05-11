import { Link, NavLink } from 'react-router';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className='pt-10 bg-black sm:bg-transparent text-lg text-white'>
      <div className='section-container'>
        <div className='bg-black sm:py-10 sm:px-15 rounded-t-[45px]'>
          <div className='flex flex-wrap items-center gap-10 lg:gap-20'>
            <Logo dark='dark' />
            <nav className='text-white flex-wrap flex gap-5 text-lg'>
              <NavLink className={'underline'} to={'/about'}>
                {t('about')}
              </NavLink>
              <NavLink className={'underline'} to={'/services'}>
                {t('services')}
              </NavLink>
              <NavLink className={'underline'} to={'/usecases'}>
                {t('useCases')}
              </NavLink>
            </nav>

            <div className='flex gap-3 items-center'>
              <img src='linkedin.svg' alt='linkiden icon' />
              <img src='facebook.svg' alt='facebook icon' />
              <img src='twitter.svg' alt='twitter icon' />
            </div>
          </div>

          <div className='grid lg:grid-cols-12 gap-10 mt-10 sm:mt-20 my-9'>
            <div className='flex col-span-5 flex-col gap-3 justify-center items-start'>
              <h2 className='text-2xl bg-v1 inline-block text-black rounded-lg px-3 py-1'>
                {t('contactUs')}:
              </h2>
              <p>{t('email')}: info@1good.com</p>
              <p>
                {t('phone')}:{' '}
                <span className='whitespace-nowrap'>+998 50 780 37 69</span>
              </p>
              <p>{t('address')}: IT Park</p>
            </div>

            <div className='grid sm:grid-cols-2 items-center col-span-7 gap-3 bg-v3 px-8 rounded-2xl py-10'>
              <Input
                className='!text-lg px-5 placeholder:text-lg h-[60px] rounded-lg'
                placeholder={t('email')}
              />
              <Button style={{ fontSize: 10 }} className='btn-v1'>
                {t('btnText')}
              </Button>
            </div>
          </div>

          <div className='flex flex-col text-center sm:text-start sm:flex-row items-center border-t py-10 sm:pb-0 border-white/30 border-solid gap-5 sm:gap-10'>
            <p>{t('reserved')}</p>
            <Link className='underline' to={'/'}>
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
