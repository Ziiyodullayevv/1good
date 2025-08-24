import FoundIcon from '../../assets/svgs/FoundIcon';
import ProjectIcon from '../../assets/svgs/ProjectIcon';
import UsersIcon from '../../assets/svgs/UsersIcon';
import Banner from '../dashboard/Banner';
import cridetsBanner from '@/assets/images/cridets/cridetsBanner.png';

const features = [
  {
    icon: <FoundIcon className='size-6' />,
    title: 'Flexible Funding',
    description:
      'Use credits to fund various writing projects, from blog posts to marketing copy, with no upfront payments.',
  },
  {
    icon: <UsersIcon className='size-6' />,
    title: 'Access to Top Writers',
    description:
      'Connect with experienced writers specializing in diverse fields, ensuring high-quality content tailored to your needs.',
  },
  {
    icon: <ProjectIcon className='size-6' />,
    title: 'Streamlined Project Management',
    description:
      'Manage your projects seamlessly within the Writely platform, from initial brief to final delivery, all within your credit balance.',
  },
];

export default function Credits() {
  return (
    <section className='text-base'>
      <div className='rounded-xl overflow-hidden bg-white'>
        <Banner title='Credits' />

        <div className='p-4 sm:p-8 min-h-[calc(100vh-72px)]'>
          <div
            className='p-10 bg-no-repeat bg-cover rounded-2xl'
            style={{ backgroundImage: `url(${cridetsBanner})` }}
          >
            <h1 className='text-4xl max-w-[400px] font-semibold'>
              Get credits for your writing projects
            </h1>
            <p className='mt-4 max-w-[500px]'>
              Apply for credits to fund your writing projects on Writely. Access
              a pool of talented writers and get high-quality content without
              upfront costs.
            </p>
          </div>
          <div className='my-10'>
            <h2 className='text-3xl font-semibold'>
              Benefits of Writely Credits
            </h2>
            <p className='max-w-[800px] mt-3'>
              Writely Credits offer a flexible and efficient way to manage your
              writing projects. Here's how they can benefit you:
            </p>
          </div>

          {/* Benefits section: cards generated from feature list using map() */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='border border-gray-300 p-5 rounded-lg'
              >
                {feature.icon}
                <h3 className='font-bold my-2'>{feature.title}</h3>
                <p className='text-sm text-gray-600'>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className='mt-10 text-center'>
            <h2 className='text-3xl font-semibold'>Ready to get started?</h2>
            <p className='my-2'>
              Apply for Writely Credits today and unlock a world of writing
              possibilities.
            </p>

            <button className='bg-v10 inline-block font-bold mt-4 px-8 py-3 rounded-full cursor-pointer'>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
