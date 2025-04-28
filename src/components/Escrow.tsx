import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function Escrow() {
  const { t } = useTranslation('services');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex flex-col md:flex-row gap-10 md:gap-20 bg-v1 p-8 md:p-15 rounded-[45px] box-shadow'>
          {/* Chap tomon */}
          <div className='flex items-start gap-3 md:gap-8'>
            <img
              className='w-[20px] sm:w-auto'
              src='/star.svg'
              alt='star icon'
            />
            <div>
              <h2 className='section-title text-xl sm:text-3xl'>
                {t('escowComp.title1')}
              </h2>
              <br />
              <h2 className='section-title text-xl sm:text-3xl'>
                {t('escowComp.title2')}
              </h2>
            </div>
          </div>

          {/* O'ng tomon */}
          <div className='flex flex-col gap-10 md:gap-20 justify-between'>
            <p className='max-w-full'>{t('escowComp.subTitle')}</p>
            <Button className='btn-v2 w-full md:w-auto'>
              {t('escowComp.btnText')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
