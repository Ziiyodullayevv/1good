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

        <div className='flex mt-20 gap-10 flex-col'>
          {weWorkData.map(({ id, title, description }) => (
            <div
              key={id}
              className='flex gap-10 items-center bg-v2 rounded-[45px] p-15'
            >
              <div className='shrink-0 relative w-[138px] h-[138px]'>
                <img
                  className='w-full'
                  src='/star-large.svg'
                  alt='large-star icon'
                />
                <span className='absolute text-6xl font-bold text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  {id}
                </span>
              </div>
              <div className='flex flex-col gap-5'>
                <h3 className='text-3xl font-semibold'>{title}</h3>
                <p className='mt-2'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
