import Cases from '../components/Cases';
import ContactUS from '../components/ContactUS';
import Hero from '../components/Hero';
import Ideas from '../components/Ideas';
import Process from '../components/Process';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Ideas
        title='Ready to Transform Your Freelance Experience?'
        description='Discover how 1good can empower your projects with secure payments, AI-driven tools, and flexible financing. Let’s make freelancing work for you!'
        btnText='Get Started Today'
      />
      <Cases />
      <Process />
      <Testimonials />
      <ContactUS />
    </>
  );
}
