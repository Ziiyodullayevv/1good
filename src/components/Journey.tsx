import { cn } from '../lib/utils';
import SectionTitle from './SectionTitle';

type Journey = {
  id: string;
  year: number;
  title: string;
  description: string;
};

const journey = [
  {
    id: '1',
    year: 2025,
    title: 'Full Expansion in Uzbekistan',
    description:
      'In 2025, 1good launches fully in Uzbekistan with AI and human freelancers, connecting users with secure payments and AI tools. By year-end, we expand across Central Asia with local support.',
  },
  {
    id: '2',
    year: 2026,
    title: 'Better Collaboration',
    description:
      'By 2026, 1good adds multilingual dashboards (Kazakh, Turkmen, Tajik, Kirgiz) and messaging tools for seamless communication across Central Asia.',
  },
  {
    id: '3',
    year: 2026,
    title: 'Eurasian Growth',
    description:
      'In 2027, 1good scales to Eurasia, adding new payment options and AI tools to support diverse projects with our 5% commission model.',
  },
  {
    id: '4',
    year: 2027,
    title: 'Global Reach',
    description:
      'By 2028, 1good goes global, connecting freelancers and clients worldwide with secure, AI-driven collaboration.',
  },
];

export default function Journey() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title='Our Journey'
          description='From humble beginnings to industry leadership, discover how 1good has grown to drive success for businesses around the world.'
          className='max-w-[660px]'
        />

        <div className='flex mt-20 flex-col gap-20'>
          {journey.map(({ id, year, title, description }: Journey) => (
            <div
              key={id}
              className={cn(
                'flex gap-10 min-h-[300px]',
                Number(id) % 2 === 0 ? 'justify-end' : undefined
              )}
            >
              <h3 className='text-6xl font-bold'>{year}</h3>
              <div className='flex gap-8 items-start max-w-[630px] rounded-[45px] bg-v1 p-14'>
                <img src='/star.svg' alt='icon' />
                <div>
                  <h3 className='font-bold text-3xl'>{title}</h3>
                  <p className='mt-8'>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
