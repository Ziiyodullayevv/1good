import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import SectionTitle from './SectionTitle';

type Journey = {
  id: string;
  year: number;
  title: string;
  description: string;
}[];

export default function Journey() {
  const { t } = useTranslation('about');
  const journeyData = t('journeyComp.journeyData', {
    returnObjects: true,
  }) as Journey;

  if (!Array.isArray(journeyData)) {
    console.warn('journeyData is not an array:', journeyData);
    return null;
  }

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title={t('journeyComp.title')}
          description={t('journeyComp.subTitle')}
          className='max-w-[660px]'
        />

        <div className='flex mt-10 sm:mt-20 flex-col gap-10 lg:gap-20'>
          {journeyData.map(({ id, year, title, description }) => (
            <div
              key={id}
              className={cn(
                // Katta ekranda flex-row, kichik ekranda flex-col
                'flex flex-col lg:flex-row gap-10 min-h-[300px]',
                Number(id) % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
              )}
            >
              {/* Year */}
              <div className='flex gap-2'>
                <img src='/star.svg' alt='icon' className='w-8 md:hidden h-8' />
                <h3 className='text-4xl lg:py-[45px] md:text-6xl font-bold text-center md:text-start'>
                  {year}
                </h3>
              </div>

              {/* Card */}
              <div className='flex gap-8 w-full lg:w-auto items-start lg:max-w-[640px] rounded-[45px] bg-v1 p-10 sm:p-14'>
                <img
                  src='/star.svg'
                  alt='icon'
                  className='w-10 hidden md:block h-10'
                />
                <div>
                  <h3 className='font-bold text-2xl sm:text-3xl'>{title}</h3>
                  <p className='mt-6 sm:mt-8'>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
