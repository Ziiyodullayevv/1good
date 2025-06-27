import { useNavigate } from 'react-router';
import slugify from 'slugify';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

type Developer = {
  id: string;
  name: string;
  role: string;
  level: string;
  location: string;
  salary: string;
  avatar: string;
};

const API_URL = 'https://673841334eb22e24fca75190.mockapi.io/api/v1/developers';

const fetchDevelopers = async (): Promise<Developer[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Serverdan ma’lumot olishda xatolik');
  }
  return res.json();
};

export default function OrderList() {
  const navigate = useNavigate();

  const handleClick = (name: string, id: string) => {
    const slug = slugify(name, { lower: true });
    navigate(`/order/${slug}-${id}`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
  });

  if (isError) return <div>Xatolik: {(error as Error).message}</div>;

  return (
    <div className='mt-5 text-base grid gap-5 grid-cols-2'>
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-xl p-5 shadow-none border animate-pulse flex flex-col gap-5'
            >
              {/* Title */}
              <Skeleton className='h-6 w-3/4 rounded-md' />

              {/* Sub-info */}
              <Skeleton className='h-4 w-1/2 rounded-md' />

              {/* Salary & Experience */}
              <div className='flex my-3 gap-8'>
                <div>
                  <Skeleton className='h-5 w-16 rounded-md' />
                  <Skeleton className='h-3 w-14 mt-1 rounded-md' />
                </div>
                <div>
                  <Skeleton className='h-5 w-20 rounded-md' />
                  <Skeleton className='h-3 w-16 mt-1 rounded-md' />
                </div>
              </div>

              {/* Description */}
              <Skeleton className='h-4 w-full rounded-md' />
              <Skeleton className='h-4 w-5/6 mt-1 rounded-md' />

              {/* Tags */}
              <div className='flex gap-2 flex-wrap mt-3'>
                <Skeleton className='h-6 w-24 rounded-full' />
                <Skeleton className='h-6 w-20 rounded-full' />
                <Skeleton className='h-6 w-28 rounded-full' />
              </div>

              {/* Button */}
              <Skeleton className='h-9 w-28 rounded-md mt-4' />
            </div>
          ))
        : data?.map(({ id, name }) => (
            <div
              onClick={() => handleClick(name, id)}
              key={id}
              className='bg-white rounded-xl p-5 cursor-pointer border shadow-none transition-all duration-300'
            >
              <h2 className='font-medium text-lg leading-6 hover:text-v9'>
                Bilingual Customer Service Representative (English-Spanish)
                Based…
              </h2>
              <p className='text-sm my-5 text-gray-400'>
                Fixed-price ‐ Posted 15 days ago
              </p>

              <div className='flex my-5 gap-8'>
                <div>
                  <h5 className='font-medium text-base'>$300</h5>
                  <p className='text-gray-400 text-xs'>Fixed-price</p>
                </div>

                <div>
                  <h5 className='font-medium text-base'>Intermediate</h5>
                  <p className='text-xs text-gray-400'>Experience level</p>
                </div>
              </div>
              <p className='my-4 text-base'>
                Bilingual Customer Service Representative (English-Spanish)
                Based in Guatemala or the Philippines
              </p>

              <div className='my-5 flex gap-3 text-gray-700'>
                <span className='bg-v2 text-xs px-3 py-2.5 rounded-full'>
                  Order Tracking
                </span>
                <span className='bg-v2 text-xs px-3 py-2.5 rounded-full'>
                  JavaScript
                </span>
                <span className='bg-v2 text-xs px-3 py-2.5 rounded-full'>
                  Order Tracking Jobs
                </span>
              </div>

              <button className='h-9 text-sm cursor-pointer hover:opacity-90 px-4 bg-v9 text-white rounded-lg'>
                See more
              </button>
            </div>
          ))}
    </div>
  );
}
