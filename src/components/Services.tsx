import { Link } from 'react-router';
import SectionTitle from './SectionTitle';

export default function Services() {
  const services = [
    { title1: 'Secure payment', title2: 'systems', image: 'service1.svg' },
    { title1: 'Real-Time', title2: 'tracking', image: 'service2.svg' },
    { title1: 'User-Friendly', title2: 'Interface', image: 'service3.svg' },
    { title1: 'AI powered', title2: 'Contracts', image: 'service4.svg' },
    { title1: 'Fair Dispute', title2: 'Resolution', image: 'service5.svg' },
    { title1: 'Rating and', title2: 'Reviews', image: 'service6.svg' },
  ];

  return (
    <section className='py-10'>
      <div className='section-container'>
        <SectionTitle
          title='Services'
          description='At 1good, we offer a range of services to ensure trust and efficiency in
        freelancing for both freelancers and clients. Explore how we support
        your success:'
        />

        <div className='grid mt-20 grid-cols-2 gap-10'>
          {services.map((service, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-4 bg-v1 p-12 rounded-[45px] box-shadow'
            >
              <div className='flex flex-col gap-20'>
                <div>
                  <h3 className='section-title text-3xl'>{service.title1}</h3>
                  <br />
                  <h3 className='section-title text-3xl'>{service.title2}</h3>
                </div>
                <Link to='/' className='flex text-xl items-center gap-3'>
                  <img src='arrow.svg' alt='arrow icon' />
                  <span>Learn more</span>
                </Link>
              </div>
              <div>
                <img src={service.image} alt='service icon' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
