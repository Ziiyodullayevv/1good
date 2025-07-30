import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import Banner from './Banner';
import imagePlaceholder from '@/assets/images/common/image-placeholder.jpg';
import CreatePortfolio from './CreatePortfolio';
import { toast } from 'sonner';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import api from '@/lib/axios';
import { Empty } from 'antd';
import { useAuth } from '../../context/AuthContext';

interface Portfolio {
  imageURL: string;
  link: string;
  skills: string[];
  _id: string | number;
  title: string;
  description: string;
  image: string;
}

/* ---------------- fetch function ---------------- */
const fetchProjects = async (userId: string): Promise<Portfolio[]> => {
  const res = await api.get(`portfolio?user_id=${userId}`);
  if (res.status < 200 || res.status >= 300)
    throw new Error('Failed to fetch projects');
  return res.data;
};

/* ---------------- delete function ---------------- */
const deleteProject = async (id: string) => {
  const res = await api.delete(`portfolio/${id}`);
  if (res.status < 200 || res.status >= 300)
    throw new Error('Failed to delete project');
  return res.data;
};

/* ---------------- component ---------------- */
export default function Portfolio() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID is required');
      return fetchProjects(user.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Portfolio deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
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
            Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}

          {/* No data */}
          {!isLoading && data.length === 0 && (
            <div className='flex justify-center py-10 text-gray-500'>
              <Empty
                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                styles={{ image: { height: 200 } }}
                description={
                  <p className='text-base'>No portfolio projects yet.</p>
                }
              >
                <CreatePortfolio buttonText='Add Your First Portfolio' />
              </Empty>
            </div>
          )}

          {/* Real data */}
          {data.length > 0 &&
            data
              .slice()
              .reverse()
              .map((portfolio) => (
                <article
                  key={portfolio._id}
                  className='flex flex-col-reverse lg:flex-row gap-5 md:gap-8 py-4 justify-between items-start lg:items-center'
                >
                  {/* text */}
                  <div className='md:h-[150px] w-full flex flex-col justify-between items-start gap-4'>
                    <div>
                      <h2
                        className='text-lg sm:text-xl font-semibold line-clamp-1'
                        style={{ overflowWrap: 'anywhere' }}
                        title={portfolio.title}
                      >
                        {portfolio.title}
                      </h2>
                      <p
                        style={{ overflowWrap: 'anywhere' }}
                        className='text-sm mt-1 text-gray-500 line-clamp-2'
                        title={portfolio.description}
                      >
                        {portfolio.description}
                      </p>
                    </div>

                    <div className='flex gap-2'>
                      <CreatePortfolio
                        buttonText='Edit'
                        initialData={{
                          id: String(portfolio._id),
                          title: portfolio.title,
                          description: portfolio.description,
                          imageURL: portfolio.imageURL,
                          skills: portfolio.skills,
                          link: portfolio.link,
                        }}
                      />
                      <Button
                        className='h-8 px-3 cursor-pointer bg-red-400 shadow-none text-white hover:bg-gray-200 rounded-md min-w-[80px]'
                        onClick={() => {
                          toast.message('Are you sure you want to delete?', {
                            action: {
                              label: 'Yes, delete',
                              onClick: () => {
                                deleteMutation.mutate(String(portfolio._id));
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
                      src={portfolio.imageURL}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = imagePlaceholder;
                      }}
                      alt={portfolio.title}
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
