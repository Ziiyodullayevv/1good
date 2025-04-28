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
          title={t('coreComp.title')}
          description={t('coreComp.subTitle')}
          className='max-w-[320px]'
        />

        <div className='grid mt-10 sm:mt-20 grid-cols-1 xl:grid-cols-2 gap-10'>
          {coreData.map(({ id, title, description, image }) => (
            <div
              key={id}
              className='flex gap-8 flex-wrap sm:flex-nowrap min-h-[400px] sm:gap-2 box-shadow rounded-[45px] p-8 sm:p-12'
            >
              <div>
                <h3 className='text-2xl sm:text-3xl border-b border-black pb-6 font-bold'>
                  {title}
                </h3>
                <p className='mt-6 text-base sm:text-lg'>{description}</p>
              </div>
              {image && (
                <div className='flex sm:block shrink-0 justify-center sm:justify-start w-full sm:w-auto'>
                  <img
                    className='w-full'
                    src={image ?? ''}
                    alt='core values banner'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
