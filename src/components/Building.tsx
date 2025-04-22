import SectionTitle from './SectionTitle';
import { Building2, Star, Trophy, FileSignature, Users } from 'lucide-react';

export default function Building() {
  const building = [
    {
      id: '1',
      icon: <Building2 className='w-8 h-8 text-black' />,
      description: '100% Focus on fair, transparent collaboration',
    },
    {
      id: '2',
      icon: <Star className='w-8 h-8 text-black' />,
      description: 'Open platform for freelancers & businesses worldwide',
    },
    {
      id: '3',
      icon: <FileSignature className='w-8 h-8 text-black' />,
      description: 'Contracts, milestones & reviews you can trust',
    },
    {
      id: '4',
      icon: <Users className='w-8 h-8 text-black' />,
      description: 'Built by creatives, engineers & project pros',
    },
    {
      id: '5',
      icon: <Trophy className='w-8 h-8 text-black' />,
      description: 'Your success is our mission',
    },
  ];

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[459px]'
          title='What We’re Building Together'
          description='A vision-focused section showing ambition and values instead of past numbers.'
        />

        <div className='grid mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {building.map(({ id, description, icon }) => (
            <div key={id}>
              <span className='h-[40px] rounded-t-3xl w-full inline-block border border-b-transparent border-black'></span>
              <div className='px-5 text-center'>
                <div className='flex justify-center'>{icon}</div>
                <p className='mt-5'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
