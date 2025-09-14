import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Portfolio from './Portfolio';
import Reviews from './Reviews';
import api from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams, Navigate, useNavigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft } from 'lucide-react';

const talentSingle = async (id: string) => {
  const response = await api.get('user/' + id);
  return response.data;
};

// Skeleton loader component (responsive, bg-v2 bilan)
const TalentSkeleton = () => (
  <section className='pt-10 py-5 bg-white text-base'>
    <div className='container-talent'>
      {/* Title skeleton */}
      <div className='animate-pulse bg-v2 rounded-md h-8 w-24'></div>

      {/* Avatar & Info */}
      <div className='flex flex-col sm:flex-row mt-5 items-start sm:items-center gap-4 sm:gap-6'>
        {/* Avatar */}
        <div className='flex items-center gap-3'>
          <div className='h-20 w-20 flex-shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full bg-v2 animate-pulse'></div>

          {/* Info */}
          <div className='flex flex-col gap-3 w-full'>
            <div className='h-6 bg-v2 rounded w-40 sm:w-56 md:w-64 animate-pulse'></div>
            <div className='h-4 bg-v2 rounded w-28 sm:w-40 md:w-48 animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className='flex gap-6 mt-8 border-b pb-3'>
        <div className='h-5 bg-v2 rounded w-20 animate-pulse'></div>
        <div className='h-5 bg-v2 rounded w-20 animate-pulse'></div>
        <div className='h-5 bg-v2 rounded w-20 animate-pulse'></div>
      </div>

      {/* Content skeleton */}
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='h-32 bg-v2 rounded-lg animate-pulse'></div>
        <div className='h-32 bg-v2 rounded-lg animate-pulse'></div>
        <div className='h-32 bg-v2 rounded-lg animate-pulse'></div>
      </div>
    </div>
  </section>
);

// Error component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TalentError = ({ error }: { error: any }) => (
  <section className='pt-10 py-5 bg-white text-base'>
    <div className='container-talent'>
      <div className='text-center py-20'>
        <div className='text-red-500 text-6xl mb-4'>⚠</div>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>
          Talent ma'lumotlarini yuklashda xatolik
        </h2>
        <p className='text-gray-600 mb-4'>
          {error?.response?.status === 404
            ? 'Bunday talent topilmadi'
            : "Ma'lumotlarni yuklashda muammo yuz berdi"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
        >
          Qayta urinib ko'rish
        </button>
      </div>
    </div>
  </section>
);

export default function TalentSingle() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Slug formatini tekshirish va ID ni olish
  const id = slug ? slug.split('-').pop() : null;

  if (!id) {
    return <Navigate to='/404' replace />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['single-user', id],
    queryFn: () => talentSingle(id),
    enabled: !!id,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <TalentSkeleton />;
  if (isError) return <TalentError error={error} />;
  if (!data) return <Navigate to='/404' replace />;

  return (
    <section className='pt-10 py-5 bg-white text-base'>
      <div className='container-talent'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='mb-6 flex cursor-pointer items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-black/80 transition'
        >
          <ArrowLeft className='size-4' /> Back
        </button>

        {/* Header */}
        <div className='flex items-center gap-5'>
          <Avatar className='h-20 w-20 md:w-32 md:h-32 rounded-full'>
            <AvatarImage
              src={data?.avatarUrl}
              alt={`${data?.firstName} ${data?.lastName}`}
            />
            <AvatarFallback className='text-2xl uppercase bg-gray-100'>
              {data?.firstName?.[0] || '?'}
              {data?.lastName?.[0] || ''}
            </AvatarFallback>
          </Avatar>

          <div className='text-gray-500'>
            <h3 className='text-lg capitalize md:text-2xl font-bold text-black'>
              {data?.firstName} {data?.lastName}
            </h3>
            <p className='text-sm mt-2 capitalize'>
              {data?.location || "Joylashuv ko'rsatilmagan"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue='overview' className='w-full mt-10'>
          <TabsList className='border-b flex text-sm gap-5 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
            <TabsTrigger
              value='overview'
              className='data-[state=active]:border-b-2 data-[state=active]:border-v9 rounded-none'
            >
              Ko'rinish
            </TabsTrigger>
            <TabsTrigger
              value='portfolio'
              className='data-[state=active]:border-b-2 data-[state=active]:border-v9 rounded-none'
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value='reviews'
              className='data-[state=active]:border-b-2 data-[state=active]:border-v9 rounded-none'
            >
              Sharhlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='mt-6'>
            <Overview data={data} />
          </TabsContent>

          <TabsContent value='portfolio' className='mt-6'>
            <Portfolio userId={id} />
          </TabsContent>

          <TabsContent value='reviews' className='mt-6'>
            <Reviews userId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
