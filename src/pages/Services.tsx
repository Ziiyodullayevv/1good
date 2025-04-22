import Escrow from '../components/Escrow';
import Rank from '../components/Rank';
import SectionHero from '../components/SectionHero';
import WeWork from '../components/WeWork';
import { hero } from '../mock/data';

export default function Services() {
  const { services } = hero;
  return (
    <>
      <SectionHero data={services} className='max-w-[453px]' />
      <Escrow />
      <WeWork />
      <Rank />
    </>
  );
}
