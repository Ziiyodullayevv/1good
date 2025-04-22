import SectionHero from '../components/SectionHero';
import { hero } from '../mock/data';

export default function Services() {
  const { services } = hero;
  return (
    <>
      <SectionHero data={services} className='max-w-[453px]' />
    </>
  );
}
