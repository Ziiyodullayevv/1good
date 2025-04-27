import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className='py-10'>
      <div className='section-container'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <h1 className='text-4xl sm:text-5xl max-w-[450px] md:max-w-[1000px] xl:text-6xl font-semibold'>
              {t('heroComp.title')}
            </h1>
            <img className='md:hidden mt-9' src='hero.svg' alt='hero banner' />
            <p className='font-montserrat py-9 max-w-[768px]'>
              {t('heroComp.subTitle')}
            </p>
            <Button className='font-montserrat w-full md:w-auto h-[60px] px-8 rounded-xl cursor-pointer text-xl'>
              {t('heroComp.btnText')}
            </Button>
          </div>

          <div className='right hidden md:block'>
            <img src='hero.svg' alt='hero banner' />
          </div>
        </div>
      </div>
    </section>
  );
}
