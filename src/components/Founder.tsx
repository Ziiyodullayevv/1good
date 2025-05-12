import { useTranslation } from 'react-i18next';

export default function Founder() {
  const { t } = useTranslation('about');
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-black relative flex xl:justify-end text-white rounded-[45px] p-8 sm:p-15'>
          <img
            className='absolute w-[150px] sm:w-[300px] lg:w-[400px] md:block -z-0 xl:left-0 bottom-0 right-0 sm:top-[-40px] lg:top-[-100px]'
            src='/about-us-focus.svg'
            alt='about-us focus image'
          />
          <div className='relative z-10'>
            <h2 className='font-semibold max-w-[529px] text-xl sm:text-2xl lg:text-[41px]'>
              {t('founderComp.title')}
            </h2>
            <h5 className=' sm:text-lg lg:text-2xl mt-24'>
              {t('founderComp.subTitle')}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
