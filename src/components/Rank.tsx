import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function Rank() {
  const { t } = useTranslation('services');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-10 sm:gap-5 box-shadow p-8 sm:p-15 rounded-[45px]'>
          <div className='text-center sm:text-left'>
            <h2 className='text-2xl sm:text-3xl font-semibold pb-5 sm:pb-7 border-b border-black inline-block'>
              {t('rankComp.title')}
            </h2>
            <p className='mt-5 sm:mt-7'>{t('rankComp.description')}</p>
            <h3 className='font-bold py-6 sm:py-8'>{t('rankComp.subTitle')}</h3>
            <Button className='btn-v1 w-full sm:w-auto'>
              {t('rankComp.btnText')}
            </Button>
          </div>

          <img
            className='w-full max-w-[400px] sm:max-w-[500px]'
            src='/rank.svg'
            alt='rank banner'
          />
        </div>
      </div>
    </section>
  );
}
