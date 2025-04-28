import { Link } from 'react-router';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; // Pagination moduli

export default function Cases() {
  const { t } = useTranslation('home');
  const caseData = t('caseComp.caseData', { returnObjects: true }) as {
    description: string;
    url: string;
  }[];

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[580px]'
          title={t('caseComp.title')}
          description={t('caseComp.subTitle')}
        />

        {/* Swiper komponenti */}
        <div className='bg-black mt-20 py-10 rounded-[45px] relative'>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='text-white py-12 sm:text-lg'
          >
            {caseData.map(({ description, url }, index) => (
              <SwiperSlide
                key={index}
                className='flex min-h-[280px] mb-10 md:mb-0 flex-col items-start justify-start px-10 sm:px-15 xl:border-r border-white last:border-none'
              >
                <p className='max-w-[286px]'>{description}</p>
                <Link className='flex mt-10 items-start gap-4 text-xl' to={url}>
                  <span>{t('caseComp.btnText')}</span>
                  <img src='whiteArrow.svg' alt='arrow icon' />
                </Link>
              </SwiperSlide>
            ))}
            {/* Pagination dots */}
            <div className='swiper-pagination absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-2'></div>
          </Swiper>
        </div>
      </div>

      {/* Swiper dots style */}
      <style>{`
        .swiper-pagination-bullet {
          @apply w-3 h-3 rounded-full !bg-gray-300 transition-colors duration-300;
        }
        .swiper-pagination-bullet-active {
          @apply !bg-white;
        }
      `}</style>
    </section>
  );
}
