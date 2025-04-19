import Carousel from './Carousel';
import SectionTitle from './SectionTitle';

export default function Testimonials() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title='Testimonials'
          description='Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services'
          className='max-w-[620px]'
        />

        <Carousel />
      </div>
    </section>
  );
}
