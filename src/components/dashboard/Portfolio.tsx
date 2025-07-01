import { Button } from '../ui/button';
import Banner from './Banner';
import protfolio1 from '@/assets/images/portfolio/1.png';
import protfolio2 from '@/assets/images/portfolio/2.png';
import protfolio3 from '@/assets/images/portfolio/3.png';

const projects = [
  {
    id: 1,
    title: 'Website Redesign for Local Bakery',
    description:
      "A complete redesign of the bakery's website, focusing on user experience and visual appeal. Included a new online ordering system.",
    image: protfolio1,
  },
  {
    id: 2,
    title: 'Portfolio Website for Photographer',
    description:
      'Designed and built a clean, minimal portfolio website to showcase the photographer’s work and enable client bookings.',
    image: protfolio2,
  },
  {
    id: 3,
    title: 'E-commerce App UI',
    description:
      'Developed a sleek e-commerce interface with seamless shopping cart and checkout flows.',
    image: protfolio3,
  },
  {
    id: 4,
    title: 'Startup Landing Page',
    description:
      'Built a fast and responsive landing page for a SaaS startup with conversion-focused design.',
    image: protfolio1,
  },
  {
    id: 5,
    title: 'Blog Platform Frontend',
    description:
      'Created a modern blog UI with markdown support and author profile pages.',
    image: protfolio2,
  },
  {
    id: 6,
    title: 'Admin Dashboard UI',
    description:
      'Designed and developed an interactive admin dashboard for data visualization and user management.',
    image: protfolio3,
  },
];

export default function Portfolio() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner title='My Portfolio' buttonText='Add New Project' />
      </div>

      <div className='sm:p-8'>
        <section className='space-y-10'>
          {projects.map((project) => (
            <article
              key={project.id}
              className='grid sm:grid-cols-12 gap-6 items-center'
            >
              {/* Text secion - spans 8 columns */}
              <div className='sm:col-span-8 flex flex-col items-start gap-4 max-w-xl'>
                <header>
                  <h2 className='text-xl font-semibold'>{project.title}</h2>
                  <p className='text-sm mt-1 text-gray-500'>
                    {project.description}
                  </p>
                </header>
                <Button className='h-10 cursor-pointer bg-v2 text-black hover:bg-gray-200 rounded-full min-w-[100px]'>
                  Edit
                </Button>
              </div>

              {/* Image section - span 4 colums  */}
              <figure className='aspect-video sm:col-span-4 rounded-2xl overflow-hidden bg-gray-200 w-full'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
              </figure>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
