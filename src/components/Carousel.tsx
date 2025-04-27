import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

type Reviews = {
  text: string;
  name: string;
  title: string;
}[];

export default function TestimonialCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [, setSwiperReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  const { t } = useTranslation();
  const reviewsData = t('reviewsComp.reviewsData', {
    returnObjects: true,
  }) as Reviews;

  // Instagram-style pagination rendering
  const renderPagination = () => {
    const totalSlides = reviewsData.length;
    const maxVisibleDots = 5;

    // If we have few slides, show all dots
    if (totalSlides <= maxVisibleDots) {
      return reviewsData.map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: idx === activeIndex ? 1 : 0.6,
            width: idx === activeIndex ? 10 : 8,
            height: idx === activeIndex ? 10 : 8,
          }}
          transition={{ duration: 0.3 }}
          className={`rounded-full transition-all duration-300 ${
            idx === activeIndex ? 'bg-white' : 'bg-gray-500 opacity-60'
          }`}
        ></motion.div>
      ));
    }

    // For many slides, implement true Instagram-style pagination
    const dots = [];
    const showDots = maxVisibleDots - 2; // Regular dots to show (minus indicators)

    // Calculate visible range based on active index
    let start = 0;
    let end = 0;
    let showStartIndicator = false;
    let showEndIndicator = false;

    // If at beginning of carousel
    if (activeIndex < showDots - 1) {
      start = 0;
      end = showDots;
      showEndIndicator = true;
    }
    // If at end of carousel
    else if (activeIndex >= totalSlides - showDots + 1) {
      start = totalSlides - showDots;
      end = totalSlides;
      showStartIndicator = true;
    }
    // If in middle of carousel (true Instagram behavior)
    else {
      start = activeIndex - 1;
      end = activeIndex + 2;
      showStartIndicator = true;
      showEndIndicator = true;
    }

    // Add start indicator if needed (small dot at beginning)
    if (showStartIndicator) {
      dots.push(
        <motion.div
          key='start-indicator'
          className='bg-gray-500 rounded-full opacity-60 mx-0.5'
          initial={{ width: 4, height: 4 }}
          animate={{ width: 4, height: 4 }}
        ></motion.div>
      );
    }

    // Add visible dots
    for (let i = start; i < end; i++) {
      dots.push(
        <motion.div
          key={i}
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: i === activeIndex ? 1 : 0.6,
            width:
              i === activeIndex
                ? 'calc(0.625rem + 0.125rem)' // w-2.5 on desktop
                : 'calc(0.5rem)', // w-2 on desktop
            height:
              i === activeIndex
                ? 'calc(0.625rem + 0.125rem)' // h-2.5 on desktop
                : 'calc(0.5rem)', // h-2 on desktop
          }}
          transition={{ duration: 0.3 }}
          className={`rounded-full ${
            i === activeIndex ? 'bg-white' : 'bg-gray-500'
          }`}
        ></motion.div>
      );
    }

    // Add end indicator if needed (small dot at end)
    if (showEndIndicator) {
      dots.push(
        <motion.div
          key='end-indicator'
          className='bg-gray-500 rounded-full opacity-60 mx-0.5'
          initial={{ width: 4, height: 4 }}
          animate={{ width: 4, height: 4 }}
        ></motion.div>
      );
    }

    return dots;
  };

  return (
    <div className='bg-black relative mt-10 sm:mt-20 text-white rounded-[45px] py-10 sm:py-20'>
      <div className='max-w-7xl mx-auto'>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1.6}
          centeredSlides={true}
          spaceBetween={20}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onActiveIndexChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            576: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2.1,
            },
          }}
          className='testimonial-swiper'
        >
          {reviewsData.map(({ text, name, title }, idx) => (
            <SwiperSlide key={idx}>
              <div className='relative min-h-[280px] flex flex-col justify-between'>
                <div className='mb-10 relative bg-v4 font-thin p-8 md:p-[50px] rounded-[45px] text-white'>
                  <p className='leading-tight'>
                    {text}
                    <span className='absolute bg-v4 rotate-45 bottom-[-20px] w-[40px] left-[50px] -z-[10] inline-block h-[40px]'></span>
                  </p>
                </div>
                <div className='px-[60px] text-base sm:text-xl'>
                  <p className='text-v4 font-medium'>{name}</p>
                  <p className='text-v2 whitespace-nowrap'>{title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom arrows + Instagram-style pagination */}
        <div className='flex mx-auto px-5 max-w-[564px] justify-center items-center gap-10 mt-4 md:mt-16'>
          {/* Left arrow with opacity based on position and hidden on mobile */}
          <button
            ref={prevRef}
            className={`transition-opacity duration-300 hidden sm:block ${
              isBeginning ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <ArrowLeft className='text-white size-8' />
          </button>

          {/* Instagram-style pagination with animated dots */}
          <div className='flex justify-center w-[100px] items-center gap-1 sm:gap-2'>
            <AnimatePresence>{renderPagination()}</AnimatePresence>
          </div>

          {/* Right arrow with opacity based on position and hidden on mobile */}
          <button
            ref={nextRef}
            className={`transition-opacity duration-300 hidden sm:block ${
              isEnd ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <ArrowRight className='size-8 text-white' />
          </button>
        </div>
      </div>
    </div>
  );
}
