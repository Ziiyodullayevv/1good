import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { cn } from '../lib/utils';
import { Link } from 'react-router';

export default function Solve() {
  const { t } = useTranslation('cases');
  const chellangeData = t('chellangesComp.chellangesCompData', {
    returnObjects: true,
  }) as { title: string; description: string }[];

  return (
    <section className='py-10 text-lg sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title={t('chellangesComp.title')}
          description={t('chellangesComp.subTitle')}
          className='max-w-[550px]'
        />

        <div className='grid grid-cols-1 p-15 mt-20 box-shadow rounded-[45px] md:grid-cols-2 lg:grid-cols-3'>
          {chellangeData.map((item, idx) => {
            const isLastColumn = (idx + 1) % 3 === 0;
            const isFirstColumn = idx % 3 === 0;
            const isTopRow = idx < 3;
            const isBottomRow = idx >= chellangeData.length - 3;

            // Borderlar
            const borderClasses = cn(
              'border-black',
              !isLastColumn && 'border-r',
              !isBottomRow && 'border-b'
            );

            // Paddinglar
            const paddingClasses = cn(
              isTopRow ? 'pb-10' : 'pt-10',
              isFirstColumn ? 'pr-10' : isLastColumn ? 'pl-10' : 'px-10'
            );

            return (
              <div
                key={idx}
                className={cn(
                  'flex flex-col justify-between',
                  borderClasses,
                  paddingClasses
                )}
              >
                <div>
                  <h3 className='text-3xl font-semibold'>{item.title}</h3>
                  <p className='my-5'>{item.description}</p>
                </div>
                <div>
                  <Link to='/' className='flex gap-3 items-center text-black'>
                    <img src='arrow.svg' alt='arrow icon' />
                    Learn more
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
