import { useTranslation } from 'react-i18next';
import Carousel from './Carousel';
import SectionTitle from './SectionTitle';

export default function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title={t('reviewsComp.title')}
          description={t('reviewsComp.subTitle')}
          className='max-w-[420px]'
        />

        <Carousel />
      </div>
    </section>
  );
}
