import Building from '../components/Building';
import Core from '../components/Core';
import Founder from '../components/Founder';
import Join from '../components/Join';
import Journey from '../components/Journey';
import SectionHero from '../components/SectionHero';
import { hero } from '../mock/data';

export default function About() {
  const { about } = hero;
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
