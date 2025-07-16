import { useNavigate } from 'react-router';
import slugify from 'slugify';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '../ui/badge';

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

export default function TalentList() {
  const navigate = useNavigate();

  const handleClick = (name: string, id: string) => {
    const slug = slugify(name, { lower: true });
    navigate(`/talent/${slug}-${id}`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
  });

  if (isError) return <div>Xatolik: {(error as Error).message}</div>;

  return (
    <div className='mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      {isLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className='bg-white flex flex-col gap-40 rounded-xl p-5 shadow'
            >
              <div className='flex justify-between gap-3'>
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-6 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-14 w-14 rounded-full' />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-24 rounded-full' />
                  <Skeleton className='h-6 w-24 rounded-full' />
                </div>
                <Skeleton className='h-6 w-28 rounded-full' />
              </div>
            </div>
          ))
        : data?.map(({ id, name, role, avatar, level, location, salary }) => (
            <div
              onClick={() => handleClick(name, id)}
              key={id}
              className='bg-white flex border flex-col justify-between gap-40 rounded-xl p-5  cursor-pointer hover:bg-v8 transition-all duration-300'
            >
              <div className='flex justify-between gap-3'>
                <div>
                  <h3 className='text-lg sm:text-xl font-semibold'>{name}</h3>
                  <p className='text-sm sm:text-base'>{role}</p>
                </div>

                <div className='w-13 shrink-0 h-13 bg-v2 text-sm overflow-hidden rounded-full'>
                  <img src={avatar} alt='image' />
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <div className='flex flex-wrap gap-2'>
                  <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-gray-700 font-normal text-sm'>
                    <img src='/talent-stars.svg' alt='image' />
                    <span>{level}</span>
                  </Badge>
                  <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-gray-700 font-normal text-sm'>
                    <img src='/talent-location.svg' alt='image' />
                    <span>{location}</span>
                  </Badge>
                </div>
                <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-gray-700 font-normal text-sm'>
                  <img src='/talent-salary.svg' alt='image' />
                  <span>${salary}</span>
                </Badge>
              </div>
            </div>
          ))}
    </div>
  );
}
