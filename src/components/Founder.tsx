import { useTranslation } from 'react-i18next';

export default function Founder() {
  const { t } = useTranslation('about');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-black relative flex justify-end text-white rounded-[45px] p-15'>
          <img
            className='absolute left-0 top-[-100px]'
            src='/about-us-focus.svg'
            alt='about-us focus image'
          />
          <div>
            <h2 className='font-semibold max-w-[529px] text-[41px]'>
              {t('founderComp.title')}
            </h2>
            <h5 className='text-2xl mt-24'>{t('founderComp.subTitle')}</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
