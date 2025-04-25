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

        <div className='flex mt-20 flex-col gap-20'>
          {journeyData.map(({ id, year, title, description }) => (
            <div
              key={id}
              className={cn(
                'flex gap-10 min-h-[300px]',
                Number(id) % 2 === 0 ? 'justify-end' : undefined
              )}
            >
              <h3 className='text-6xl font-bold'>{year}</h3>
              <div className='flex gap-8 items-start max-w-[630px] rounded-[45px] bg-v1 p-14'>
                <img src='/star.svg' alt='icon' />
                <div>
                  <h3 className='font-bold text-3xl'>{title}</h3>
                  <p className='mt-8'>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
