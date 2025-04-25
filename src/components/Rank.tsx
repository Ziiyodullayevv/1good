import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function Rank() {
  const { t } = useTranslation('services');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex justify-between gap-5 items-center box-shadow p-15 rounded-[45px]'>
          <div className=''>
            <h2 className='text-3xl font-semibold pb-7 border-b border-black'>
              {t('rankComp.title')}
            </h2>
            <p className='mt-7'>{t('rankComp.description')}</p>
            <h3 className='font-bold py-8'>{t('rankComp.subTitle')}</h3>
            <Button className='btn-v1'>{t('rankComp.btnText')}</Button>
          </div>

          <img src='/rank.svg' alt='rank banner' />
        </div>
      </div>
    </section>
  );
}
