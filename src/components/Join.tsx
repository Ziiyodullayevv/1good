import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function Join() {
  const { t } = useTranslation('about');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v1 rounded-[45px] items-center p-15 gap-10 flex justify-between'>
          <div className='flex items-start gap-9 flex-col'>
            <h3 className='text-3xl font-semibold'>{t('joinComp.title')}</h3>
            <p className='max-w-[700px]'>{t('joinComp.subTitle')}</p>
            <Button className='btn-v2'>{t('joinComp.btnText')}</Button>
          </div>

          <img src='/public/join.svg' alt='join team image' />
        </div>
      </div>
    </section>
  );
}
