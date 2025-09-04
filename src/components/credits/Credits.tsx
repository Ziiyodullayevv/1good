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

        <div className='p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-72px)]'>
          {/* Banner Section */}
          <div
            className='p-6 sm:p-8 lg:p-10 bg-no-repeat bg-cover rounded-2xl text-black'
            style={{ backgroundImage: `url(${cridetsBanner})` }}
          >
            <h1 className='text-2xl sm:text-3xl lg:text-4xl max-w-[90%] sm:max-w-[400px] font-semibold leading-snug'>
              Get credits for your writing projects
            </h1>
            <p className='mt-3 sm:mt-4 text-sm sm:text-base max-w-[95%] sm:max-w-[500px]'>
              Apply for credits to fund your writing projects on Writely. Access
              a pool of talented writers and get high-quality content without
              upfront costs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className='my-8 sm:my-10'>
            <h2 className='text-2xl sm:text-3xl font-semibold'>
              Benefits of Writely Credits
            </h2>
            <p className='max-w-[800px] mt-2 sm:mt-3 text-sm sm:text-base'>
              Writely Credits offer a flexible and efficient way to manage your
              writing projects. Here's how they can benefit you:
            </p>
          </div>

          {/* Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='border border-gray-300 p-4 sm:p-5 rounded-lg hover:shadow-md transition'
              >
                {feature.icon}
                <h3 className='font-bold my-2 text-base sm:text-lg'>
                  {feature.title}
                </h3>
                <p className='text-xs sm:text-sm text-gray-600'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className='mt-8 sm:mt-10 text-center'>
            <h2 className='text-2xl sm:text-3xl font-semibold'>
              Ready to get started?
            </h2>
            <p className='my-2 text-sm sm:text-base'>
              Apply for Writely Credits today and unlock a world of writing
              possibilities.
            </p>

            <button className='bg-v10 inline-block font-bold mt-4 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full cursor-pointer text-sm sm:text-base'>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
