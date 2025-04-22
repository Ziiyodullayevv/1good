import Ideas from '../components/Ideas';
import Payment from '../components/Payment';
import SectionHero from '../components/SectionHero';
import Testimonials from '../components/Testimonials';
import { hero } from '../mock/data';

export default function UseCases() {
  const { useCases } = hero;
  return (
    <>
      <SectionHero data={useCases} />
      <Payment />
      <Testimonials />
      <Ideas
        className='bg-v1'
        title='Let’s Build Your Freelance Success'
        description='Reach out today to discover how 1good can connect you with trusted freelancers or clients in Uzbekistan, using secure payments and AI tools to make every project a win.'
        btnText='Get Started Now'
      />
    </>
  );
}
