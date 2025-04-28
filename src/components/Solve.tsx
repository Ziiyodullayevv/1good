import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { cn } from '../lib/utils';
import { Link } from 'react-router'; // to'g'riladim

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

        <div className='grid grid-cols-1 gap-10 xl:gap-0 xl:p-10 md:grid-cols-2 xl:grid-cols-3 mt-10 sm:mt-20 rounded-[45px] custom-shadow'>
          {chellangeData.map((item, idx) => {
            const isLastColumn = (idx + 1) % 3 === 0;
            const isFirstColumn = idx % 3 === 0;
            const isTopRow = idx < 3;
            const isBottomRow = idx >= chellangeData.length - 3;

            // Borderlar: faqat xl va undan katta ekranlarda ko'rinadi
            const borderClasses = cn(
              'border border-black', // default: kichik ekranlarda har doim border
              'xl:border-0', // xl dan katta ekranlarda umumiy border o'chadi
              'xl:border-black', // xl ekranlarda chet borderlar beriladi
              !isLastColumn && 'xl:border-r',
              !isBottomRow && 'xl:border-b'
            );

            // Paddinglar: faqat xl va katta ekranlarda ishlaydi
            const paddingClasses = cn(
              'xl:flex xl:flex-col xl:justify-between',
              isTopRow ? 'xl:pb-10' : 'xl:pt-10',
              isFirstColumn
                ? 'xl:pr-10'
                : isLastColumn
                ? 'xl:pl-10'
                : 'xl:px-10'
            );

            return (
              <div
                key={idx}
                className={cn(
                  'flex flex-col justify-between', // default
                  borderClasses,
                  paddingClasses,
                  'p-8 rounded-[45px] xl:rounded-none custom-shadow-reverse bg-white', // kichik ekranlar uchun style
                  'transition-all duration-300 hover:shadow-lg' // hover effekti
                )}
              >
                <div>
                  <h3 className='text-2xl sm:text-3xl font-semibold'>
                    {item.title}
                  </h3>
                  <p className='my-4 sm:my-5 text-base sm:text-lg'>
                    {item.description}
                  </p>
                </div>
                <div className='mt-5'>
                  <Link
                    to='/'
                    className='flex gap-2 sm:gap-3 items-center text-black'
                  >
                    <img src='/arrow.svg' alt='arrow icon' className='w-5' />
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
