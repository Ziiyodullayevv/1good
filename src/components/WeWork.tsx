import SectionTitle from './SectionTitle';

type WeWork = {
  id: string;
  title: string;
  description: string;
};

const data = [
  {
    id: '01',
    title: 'Project Setup',
    description:
      'Clients start by posting their project needs—defining the scope, budget, and timeline. Our AI Assistant helps create a clear brief to attract the right freelancers.',
  },
  {
    id: '02',
    title: 'Proposal Matching',
    description:
      'Freelancers submit proposals tailored to the project. Clients review these offers, comparing skills and rates to find the best match for their needs.',
  },
  {
    id: '03',
    title: 'Agreement Creation',
    description:
      'Once a freelancer is chosen, our platform generates a legally binding contract with project details, ensuring both parties are aligned and protected.',
  },
  {
    id: '04',
    title: 'Secure Payment',
    description:
      'Clients deposit funds into Escrow, keeping payments safe until the project is complete. This builds trust, knowing freelancers will be paid upon approval.',
  },
  {
    id: '05',
    title: 'Collaboration & Delivery',
    description:
      'Freelancers and clients work together using our dashboard to track progress. Once the work is submitted, clients review and approve the deliverables.',
  },
  {
    id: '06',
    title: 'Payment Release',
    description:
      'After approval, funds are released from Escrow to the freelancers.  Both parties can leave feedback to build trust for future projects.',
  },
];

export default function WeWork() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title='How We Work: SEO Process'
          description='Our step-by-step SEO process ensures your website ranks higher, attracts more traffic, and drives lasting results.'
          className='max-w-[550px]'
        />

        <div className='flex mt-20 gap-10 flex-col'>
          {data.map(({ id, title, description }: WeWork) => (
            <div
              key={id}
              className='flex gap-10 items-center bg-v2 rounded-[45px] p-15'
            >
              <div className='shrink-0 relative w-[138px] h-[138px]'>
                <img
                  className='w-full'
                  src='/star-large.svg'
                  alt='large-star icon'
                />
                <span className='absolute text-6xl font-bold text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  {id}
                </span>
              </div>
              <div className='flex flex-col gap-5'>
                <h3 className='text-3xl font-semibold'>{title}</h3>
                <p className='mt-2'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
