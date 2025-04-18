import { Link } from 'react-router';
import SectionTitle from './SectionTitle';

export default function Cases() {
  const caseStudies = [
    {
      text: 'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
      link: '/',
    },
    {
      text: 'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
      link: '/',
    },
    {
      text: 'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.',
      link: '/',
    },
  ];

  return (
    <section className='py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[580px]'
          title='Case Studies'
          description='Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies'
        />

        <div className='bg-black mt-20 py-18 grid grid-cols-3 text-white text-lg rounded-[45px]'>
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-start justify-start gap-10 px-15 ${
                index !== 0 ? 'border-l border-white/20' : ''
              }`}
            >
              <p className='max-w-[286px]'>{item.text}</p>
              <Link className='flex items-start gap-4 text-xl' to={item.link}>
                <span>Learn more</span>
                <img src='whiteArrow.svg' alt='arrow icon' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
