import SectionTitle from './SectionTitle';

export default function Building() {
  const building = [
    {
      id: '1',
      image: 'start.svg',
      description: '100% Focus on fair, transparent collaboration',
    },
    {
      id: '2',
      image: 'star.svg',
      description: 'Open platform for freelancers & businesses worldwide',
    },
    {
      id: '3',
      image: 'star.svg',
      description: 'Contracts, milestones & reviews you can trust',
    },
    {
      id: '4',
      image: 'star.svg',
      description: 'Built by creatives, engineers & project pros',
    },
    { id: '5', image: 'start.svg', description: 'Your success is our mission' },
  ];
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[459px]'
          title='What We’re Building Together'
          description='A vision-focused section showing ambition and values instead of past numbers.'
        />

        <div className='grid mt-20 grid-cols-5'>
          {building.map(
            ({ id, description }: { id: string; description: string }) => (
              <div key={id}>
                <span className='h-[40px] rounded-t-3xl w-full inline-block border border-b-transparent border-black'></span>
                <div className='px-5'>
                  <img src='/star.svg' alt='start icon' />
                  <p className='mt-5'>{description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
