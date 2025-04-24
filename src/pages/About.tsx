import { useTranslation } from 'react-i18next';
import Building from '../components/Building';
import Core from '../components/Core';
import Founder from '../components/Founder';
import Join from '../components/Join';
import Journey from '../components/Journey';
import SectionHero from '../components/SectionHero';

export default function About() {
  const { t } = useTranslation('about');
  const about = {
    title: t('heroComp.title'),
    description: t('heroComp.subTitle'),
    image: 'about-us.svg',
  };
  return (
    <>
      <SectionHero data={about} />
      <Building />
      <Journey />
      <Core />
      <Founder />
      <Join />
    </>
  );
}
