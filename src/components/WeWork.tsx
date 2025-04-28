import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';

type WeWork = {
  id: string;
  title: string;
  description: string;
};

export default function WeWork() {
  const { t } = useTranslation('services');
  const weWorkData = t('weWorkComp.weWorkData', {
    returnObjects: true,
  }) as WeWork[];

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title={t('weWorkComp.title')}
          description={t('weWorkComp.subTitle')}
          className='max-w-[550px]'
        />

        <div className='flex flex-col gap-10 mt-20'>
          {weWorkData.map(({ id, title, description }) => (
            <div
              key={id}
              className='flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center bg-v2 rounded-[45px] p-8 sm:p-15'
            >
              <div className='relative md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] w-[40px] h-[40px] shrink-0'>
                <img
                  className='w-full h-full'
                  src='/star-large.svg'
                  alt='large-star icon'
                />
                <span className='absolute text-xl md:text-4xl font-bold text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  {id}
                </span>
              </div>

              <div className='flex flex-col gap-4 sm:gap-5 text-left'>
                <h3 className='text-2xl sm:text-3xl font-semibold'>{title}</h3>
                <p className='mt-2'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
