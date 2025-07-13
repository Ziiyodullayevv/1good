'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import Banner from './Banner';
import imagePlaceholder from '@/assets/images/common/image-placeholder.jpg';
import CreatePortfolio from './CreatePortfolio';
import { toast } from 'sonner';

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

/* ---------------- fetch function ---------------- */
const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(
    'https://673870e84eb22e24fca7ef0c.mockapi.io/api/v1/portfolio'
  );
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

/* ---------------- delete function ---------------- */
const deleteProject = async (id: string) => {
  const res = await fetch(
    `https://673870e84eb22e24fca7ef0c.mockapi.io/api/v1/portfolio/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
};

/* ---------------- skeleton card ---------------- */
const SkeletonCard = () => (
  <article className='grid sm:grid-cols-12 gap-6 items-center animate-pulse'>
    <div className='sm:col-span-8 flex flex-col gap-4 max-w-xl'>
      <div className='h-6 w-2/3 rounded bg-v2' />
      <div className='h-4 w-full rounded bg-v2' />
      <div className='h-4 w-5/6 rounded bg-v2' />
      <div className='h-10 w-24 rounded-full bg-v2' />
    </div>
    <div className='aspect-video sm:col-span-4 w-full rounded-2xl bg-v2' />
  </article>
);

/* ---------------- component ---------------- */
export default function Portfolio() {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Portfolio deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast.error('Failed to delete portfolio');
    },
  });

  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <Banner title='Portfolio' buttonText='Add Portfolio' />

      <div className='px-4 sm:px-8 sm:py-4'>
        {isError && (
          <p className='text-red-500'>Something went wrong while loading.</p>
        )}

        <section className='space-y-0 divide-y-1 divide-blue-100'>
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
                className='flex flex-col-reverse lg:flex-row gap-5 md:gap-8 py-4 justify-between items-center'
              >
                {/* text */}
                <div className='md:h-[150px] justify-between flex flex-col items-start gap-4'>
                  <div>
                    <h2 className='text-lg sm:text-xl font-semibold line-clamp-1'>
                      {project.title}
                    </h2>
                    <p className='text-sm mt-1 text-gray-500 line-clamp-2'>
                      {project.description}
                    </p>
                  </div>

                  <div className='flex gap-2'>
                    <CreatePortfolio
                      buttonText='Edit'
                      initialData={{
                        id: String(project.id),
                        title: project.title,
                        description: project.description,
                        imageUrl: project.image,
                      }}
                    />
                    <Button
                      className='h-8 px-3 cursor-pointer bg-red-400 shadow-none text-white hover:bg-gray-200 rounded-md min-w-[80px]'
                      onClick={() => {
                        toast.message('Are you sure you want to delete?', {
                          action: {
                            label: 'Yes, delete',
                            onClick: () => {
                              deleteMutation.mutate(String(project.id));
                            },
                          },
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* image */}
                <figure className='shrink-0 bg-blue-400 border sm:col-span-4 rounded-lg overflow-hidden w-full h-[200px] sm:h-[280px] lg:h-[190px] lg:w-[300px]'>
                  <img
                    src={project.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
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
