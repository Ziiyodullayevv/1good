import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import Banner from './Banner';
import imagePlaceholder from '@/assets/images/common/image-placeholder.jpg';

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

/* ---------------- query fn ---------------- */
const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(
    'https://673870e84eb22e24fca7ef0c.mockapi.io/api/v1/portfolio'
  );
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

/* ---------------- skeleton card ---------------- */
const SkeletonCard = () => (
  <article className='grid sm:grid-cols-12 gap-6 items-center animate-pulse'>
    {/* text */}
    <div className='sm:col-span-8 flex flex-col gap-4 max-w-xl'>
      <div className='h-6 w-2/3 rounded bg-v2' />
      <div className='h-4 w-full rounded bg-v2' />
      <div className='h-4 w-5/6 rounded bg-v2' />
      <div className='h-10 w-24 rounded-full bg-v2' />
    </div>
    {/* image */}
    <div className='aspect-video sm:col-span-4 w-full rounded-2xl bg-v2' />
  </article>
);

/* ---------------- component ---------------- */
export default function Portfolio() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <Banner title='My Portfolio' buttonText='Add New Portfolio' />

      <div className='sm:p-8'>
        {isError && (
          <p className='text-red-500'>Something went wrong while loading.</p>
        )}

        <section className='space-y-10'>
          {/* Skeletons */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* Real data */}
          {data
            ?.slice()
            .reverse()
            ?.map((project) => (
              <article
                key={project.id}
                className='grid sm:grid-flow-col direction-rtl sm:grid-cols-12 gap-6 items-center'
              >
                {/* text */}
                <div className='sm:col-span-8 flex flex-col items-start gap-4 max-w-xl'>
                  <header>
                    <h2 className='text-xl font-semibold truncate'>
                      {project.title}
                    </h2>
                    <p className='text-sm mt-1 text-gray-500 line-clamp-3'>
                      {project.description}
                    </p>
                  </header>

                  <Button className='h-10 cursor-pointer bg-v2 text-black hover:bg-gray-200 rounded-full min-w-[100px]'>
                    Edit
                  </Button>
                </div>

                {/* image */}
                <figure className='aspect-video sm:col-span-4 rounded-2xl overflow-hidden bg-gray-200 w-full'>
                  <img
                    src={project.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // rekursiyani oldini oladi
                      target.src = imagePlaceholder;
                    }}
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
