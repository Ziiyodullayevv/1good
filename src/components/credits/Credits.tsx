import { Link } from 'react-router';
import FoundIcon from '../../assets/svgs/FoundIcon';
import ProjectIcon from '../../assets/svgs/ProjectIcon';
import UsersIcon from '../../assets/svgs/UsersIcon';

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
    <section className='my-10'>
      <div className='section-container'>
        <div className="p-10 bg-[url('https://cdn.bcs-express.ru/article-head/15178.jpg')] min-h-[450px] bg-no-repeat bg-cover rounded-2xl">
          <h1 className='text-5xl font-bold'>
            Get credits for your writing projects
          </h1>
          <p className='mt-4'>
            Apply for credits to fund your writing projects on Writely. Access a
            pool of talented writers and get high-quality content without
            upfront costs.
          </p>
        </div>
        <div className='my-10'>
          <h2 className='text-4xl font-bold'>Benefits of Writely Credits</h2>
          <p className='max-w-[800px] mt-3'>
            Writely Credits offer a flexible and efficient way to manage your
            writing projects. Here's how they can benefit you:
          </p>
        </div>

        {/* Benefits section: cards generated from feature list using map() */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='border border-gray-300 p-5 rounded-lg'>
              {feature.icon}
              <h3 className='font-bold my-2'>{feature.title}</h3>
              <p className='text-sm text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className='my-10 text-center'>
          <h2 className='text-5xl font-bold'>Ready to get started?</h2>
          <p className='my-4'>
            Apply for Writely Credits today and unlock a world of writing
            possibilities.
          </p>

          <Link
            to={'/credits/apply-for-credits'}
            className='bg-v10 inline-block font-bold mt-8 px-8 py-3 rounded-full cursor-pointer'
          >
            Apply for credits
          </Link>
        </div>
      </div>
    </section>
  );
}
