import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Reviews = {
  text: string;
  name: string;
  title: string;
}[];

export default function TestimonialCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true); // dom tayyor bo‘lgach navigation ishlasin
  }, []);

  const { t } = useTranslation();
  const reviewsData = t('reviewsComp.reviewsData', {
    returnObjects: true,
  }) as Reviews;

  return (
    <div className='bg-black relative mt-20 text-white rounded-[45px] py-20'>
      <div className='max-w-7xl mx-auto'>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1.6}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2.1,
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
                <div className='mb-13 text-lg bg-v4 font-thin p-[50px] rounded-[45px] text-white'>
                  <p className='relative leading-tight'>
                    {text}
                    <span className=' absolute bg-v4 rotate-45 bottom-[-70px] w-[40px] left-0 -z-[10] inline-block h-[40px]'></span>
                  </p>
                </div>
                <div className='px-[60px] text-xl'>
                  <p className='text-v4 font-medium'>{name}</p>
                  <p className='text-v2'>{title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom arrows + pagination pastda */}
        <div className='flex mx-auto max-w-[564px] justify-center items-center gap-2 mt-20'>
          {/* Left arrow */}
          <button ref={prevRef}>
            <ArrowLeft className='text-white size-8' />
          </button>

          {/* Pagination */}
          <div className='custom-pagination flex justify-center gap-3'></div>

          {/* Right arrow */}
          <button ref={nextRef}>
            <ArrowRight className='size-8 text-white' />
          </button>
        </div>
      </div>

      {/* Custom Pagination Styling */}
      <style>
        {`
          .custom-pagination .swiper-pagination-bullet {
            background: #888;
            opacity: 0.6;
            width: 10px;
            height: 10px;
            border-radius: 9999px;
            transition: all 0.3s ease;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background: white;
            opacity: 1;
            transform:scale(1.3);
          }
        `}
      </style>
    </div>
  );
}
