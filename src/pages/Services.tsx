import { useTranslation } from 'react-i18next';
import Cases from '../components/Cases';
import Escrow from '../components/Escrow';
import Rank from '../components/Rank';
import SectionHero from '../components/SectionHero';
import WeWork from '../components/WeWork';

export default function Services() {
  const { t } = useTranslation('services');
  const services = {
    title: t('heroComp.title'),
    description: t('heroComp.subTitle'),
    image: 'services.svg',
  };
  return (
    <>
      <SectionHero data={services} className='max-w-[550px]' />
      <Escrow />
      <WeWork />
      <Cases />
      <Rank />
    </>
  );
}
