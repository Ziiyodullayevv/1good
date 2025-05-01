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
    description: string;
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
          {services.map(
            ({ title1, description, title2, image, url }, index) => (
              <div
                key={index}
                className='flex group overflow-hidden relative transition-all items-center justify-between gap-4 bg-v1 p-8 sm:p-12 rounded-[45px] box-shadow'
              >
                {/* Hover design  */}
                <div className='absolute flex items-start justify-center gap-10 flex-col opacity-0 p-8 sm:p-12 group-hover:opacity-100 bg-v1 transition-all top-0 left-0 right-0 bottom-0'>
                  <p>{description}</p>

                  <Link to={url} className='flex text-xl items-center gap-3'>
                    <img src='arrow.svg' alt='arrow icon' />
                    <span className='hidden lg:block'>
                      {t('servicesComp.btnText')}
                    </span>
                  </Link>
                </div>

                {/* Normal design */}
                <div className='flex flex-col gap-25'>
                  <div>
                    <h3 className='bg-black text-white inline py-1 px-3 text-xl sm:text-3xl rounded-xl'>
                      {title1}
                    </h3>
                    <br />
                    <h3 className='bg-black text-white inline py-1 px-3 text-xl sm:text-3xl rounded-xl'>
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
