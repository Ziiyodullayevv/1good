import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function Escrow() {
  const { t } = useTranslation('services');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex gap-20 bg-v1 p-15 rounded-[45px] box-shadow'>
          <div className='flex items-start gap-8'>
            <img src='/star.svg' alt='start icon' />
            <div>
              <h2 className='section-title text-3xl'>
                {t('escowComp.title1')}
              </h2>
              <br />
              <h2 className='section-title text-3xl'>
                {t('escowComp.title2')}
              </h2>
            </div>
          </div>

          <div className='flex flex-col gap-20'>
            <p className='max-w-'>{t('escowComp.subTitle')}</p>
            <Button className='btn-v2 w-full'>{t('escowComp.btnText')}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
