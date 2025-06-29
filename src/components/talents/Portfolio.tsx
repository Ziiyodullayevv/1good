import image1 from '@/assets/images/portfolio/1.png';
import image2 from '@/assets/images/portfolio/2.png';
import image3 from '@/assets/images/portfolio/3.png';
import imagePlacholder from '@/assets/images/common/image-placeholder.jpg';

const projects = [
  {
    title: 'E-commerce Website',
    description:
      'Developed a responsive e-commerce platform with user authentication and payment gateway integration.',
    image: null,
  },
  {
    title: 'Portfolio Website',
    description:
      'Designed and built a personal portfolio site to showcase design and development work.',
    image: image2,
  },
  {
    title: 'Mobile App UI',
    description:
      'Created a modern UI for a mobile fitness tracking app using Figma and React Native.',
    image: image3,
  },
  {
    title: 'Brand Identity',
    description:
      'Developed brand guidelines including logo, color palette, and typography.',
    image: image1,
  },
  {
    title: 'Landing Page',
    description:
      'Built a high-converting landing page for a SaaS product with A/B testing.',
    image: image2,
  },
  {
    title: 'Blog Platform',
    description:
      'Implemented a CMS-powered blog with custom admin panel and markdown support.',
    image: image3,
  },
];

export default function Portfolio() {
  return (
    <div className='container-auth my-7'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {projects.map((project, index) => (
          <div key={index} className='flex flex-col gap-3'>
            <div className='aspect-video bg-gray-200 rounded-2xl overflow-hidden'>
              {project.image ? (
                <img
                  className='w-full h-full object-cover'
                  src={project.image}
                  alt={project.title}
                />
              ) : (
                <img
                  className='w-full h-full object-cover'
                  src={imagePlacholder}
                  alt={project.title}
                />
              )}
            </div>

            <div>
              <h3 className='font-medium'>{project.title}</h3>
              <p className='text-sm text-gray-500'>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
