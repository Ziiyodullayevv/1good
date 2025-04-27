import { useTranslation } from 'react-i18next';
import Cases from '../components/Cases';
import ContactUS from '../components/ContactUS';
import Hero from '../components/Hero';
import Ideas from '../components/Ideas';
import Process from '../components/Process';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <Services />
      <Ideas
        title={t('freelanceComp.title')}
        description={t('freelanceComp.subTitle')}
        btnText={t('freelanceComp.btnText')}
      />
      {/* <Cases /> */}
      <Process />
      <Testimonials />
      <ContactUS />
    </>
  );
}
