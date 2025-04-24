import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';

type Core = {
  id: string;
  title: string;
  description: string;
  image: string | undefined | null;
}[];

export default function Core() {
  const { t } = useTranslation('about');
  const coreData = t('coreComp.coreData', {
    returnObjects: true,
  }) as Core;

  if (!Array.isArray(coreData)) {
    console.warn('coreData is not an array:', coreData);
    return null;
  }
  return (
    <section className='py-10 text-lg sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title='Core Values'
          description='At the heart of everything we do are our core values:'
          className='max-w-[320px]'
        />

        <div className='grid mt-20 grid-cols-2 gap-10'>
          {coreData.map(({ id, title, description, image }) => (
            <div
              key={id}
              className='flex min-h-[400px] gap-2 box-shadow rounded-[45px] p-12 '
            >
              <div>
                <h3 className='text-3xl border-b border-black pb-6 font-bold'>
                  {title}
                </h3>
                <p className='mt-6'>{description}</p>
              </div>
              {image && <img src={image} alt='core values banner' />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
