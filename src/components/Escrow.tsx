import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function Escrow() {
  const { t } = useTranslation('services');
  const navigate = useNavigate();
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex flex-col lg:flex-row gap-10 md:gap-20 bg-v1 p-8 md:p-15 rounded-[45px] box-shadow'>
          {/* Chap tomon */}
          <div className='flex shrink-0 items-start gap-3 md:gap-8'>
            <img
              className='w-[20px] sm:w-auto'
              src='/star.svg'
              alt='star icon'
            />
            <div>
              <h2 className='text-2xl sm:text-4xl py-1  inline bg-black text-white px-3 rounded-lg'>
                {t('escowComp.title1')}
              </h2>
              <br />
              <h2 className='text-2xl sm:text-4xl py-1  inline bg-black text-white px-3 rounded-lg'>
                {t('escowComp.title2')}
              </h2>
            </div>
          </div>

          {/* O'ng tomon */}
          <div className='flex flex-col gap-10 md:gap-20 justify-between'>
            <p className='max-w-full'>{t('escowComp.subTitle')}</p>
            <Button
              onClick={() => navigate('/coming-soon')}
              className='btn-v2 w-full md:w-auto'
            >
              {t('escowComp.btnText')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
