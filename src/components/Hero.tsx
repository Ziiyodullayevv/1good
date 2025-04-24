import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className='py-10'>
      <div className='section-container'>
        <div className='grid items-center grid-cols-2'>
          <div>
            <h1 className='text-6xl font-semibold'>{t('heroComp.title')}</h1>
            <p className='text-xl font-montserrat py-9 max-w-[498px]'>
              {t('heroComp.subTitle')}
            </p>
            <Button className='font-montserrat h-[60px] px-8 rounded-xl cursor-pointer text-xl'>
              {t('heroComp.btnText')}
            </Button>
          </div>

          <div className='right'>
            <img src='hero.svg' alt='hero banner' />
          </div>
        </div>
      </div>
    </section>
  );
}
