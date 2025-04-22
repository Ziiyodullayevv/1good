import SectionTitle from './SectionTitle';

type Core = {
  id: string;
  title: string;
  description: string;
  image: string | undefined | null;
};

const core = [
  {
    id: '1',
    title: 'Trust First',
    description:
      'We prioritize trust in every interaction. Our Escrow system and transparent processes ensure freelancers and clients feel secure, building a foundation for lasting partnerships.',
    image: null,
  },
  {
    id: '2',
    title: 'Innovation Always',
    description:
      'We embrace innovation to empower our users. By integrating AI tools for project briefs and contracts, we’re redefining how freelancers and clients collaborate efficiently.',
    image: '/core1.svg',
  },

  {
    id: '3',
    title: 'Collaboration',
    description:
      'We champion partnerships that work for everyone. 1good creates a fair environment with transparent processes, ensuring freelancers and clients succeed together on equal terms.',
    image: '/core2.svg',
  },

  {
    id: '4',
    title: 'Transparency',
    description:
      'We open doors for all. With Credits for Clients , 1good makes freelancing accessible, helping both sides grow and achieve their goals.',
    image: null,
  },
];

export default function Core() {
  return (
    <section className='py-10 text-lg sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title='Core Values'
          description='At the heart of everything we do are our core values:'
          className='max-w-[320px]'
        />

        <div className='grid mt-20 grid-cols-2 gap-10'>
          {core.map(({ id, title, description, image }) => (
            <div
              key={id}
              className='flex gap-2 box-shadow rounded-[45px] p-12 '
            >
              <div>
                <h3 className='text-3xl whitespace-nowrap border-b border-black pb-6 font-bold'>
                  {title}
                </h3>
                <p className='mt-6'>{description}</p>
              </div>
              {image && <img src={image} alt='core values banner' />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
