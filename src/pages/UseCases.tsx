import SectionHero from '../components/SectionHero';
import { hero } from '../mock/data';

export default function UseCases() {
  const { useCases } = hero;
  return (
    <>
      <SectionHero data={useCases} />
    </>
  );
}
