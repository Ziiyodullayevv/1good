import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router';

export default function Services() {
  const { t } = useTranslation();

  // 👇 Arrayni olish
  const services = t('servicesComp.servicesData', { returnObjects: true }) as {
    title1: string;
    title2: string;
    image: string;
    url: string;
  }[];

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        {/* 🔁 title va description ham tarjimadan */}
        <SectionTitle
          title={t('servicesComp.title')}
          description={t('servicesComp.subTitle')}
        />

        <div className='grid mt-10 sm:mt-20 md:grid-cols-2 gap-10'>
          {services.map(({ title1, title2, image, url }, index) => (
            <div
              key={index}
              className='flex relative overflow-hidden items-center justify-between gap-4 bg-v1 p-8 sm:p-12 rounded-[45px] box-shadow'
            >
              <div className='flex flex-col gap-25'>
                <div>
                  <h3 className='section-title text-xl sm:text-3xl'>
                    {title1}
                  </h3>
                  <br />
                  <h3 className='section-title text-xl sm:text-3xl'>
                    {title2}
                  </h3>
                </div>
                <Link to={url} className='flex text-xl items-center gap-3'>
                  <img src='arrow.svg' alt='arrow icon' />
                  <span className='hidden lg:block'>
                    {t('servicesComp.btnText')}
                  </span>
                </Link>
              </div>
              <div className='shrink-0 absolute xl:static right-7 bottom-7'>
                <img
                  className='w-[135px] xl:w-full'
                  src={image}
                  alt='service icon'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
