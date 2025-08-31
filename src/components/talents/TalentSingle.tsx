import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Portfolio from './Portfolio';
import Reviews from './Reviews';
import api from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams, Navigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const talentSingle = async (id: string) => {
  const response = await api.get('user/' + id);
  return response.data;
};

// Skeleton loader component
const TalentSkeleton = () => (
  <section className='pt-10 py-5 bg-white text-base'>
    <div className='container-talent'>
      <div className='flex items-center gap-5'>
        <div className='w-32 h-32 rounded-full bg-gray-200 animate-pulse'></div>
        <div className='text-gray-500'>
          <div className='h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse'></div>
          <div className='h-8 bg-gray-200 rounded w-28 mt-2 animate-pulse'></div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='border-b flex gap-5 pb-2'>
          <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
        </div>
        <div className='mt-8 space-y-4'>
          <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse'></div>
        </div>
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

  // Slug formatini tekshirish va ID ni olish
  const id = slug ? slug.split('-').pop() : null;

  // Agar slug yoki id yo‘q bo‘lsa
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

  // Loading holati
  if (isLoading) {
    return <TalentSkeleton />;
  }

  // Error holati
  if (isError) {
    return <TalentError error={error} />;
  }

  // Ma'lumot yo'q bo'lsa
  if (!data) {
    return <Navigate to='/404' replace />;
  }

  return (
    <section className='pt-10 py-5 bg-white text-base'>
      <div className='container-talent'>
        <div className='flex items-center gap-5'>
          <Avatar className='w-32 h-32 rounded-full'>
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
            <p className='text-sm capitalize'>
              {data?.location || "Joylashuv ko'rsatilmagan"}
            </p>
            {/* <button
              className='bg-v9 text-white mt-2 text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity'
              aria-label={`${data?.firstName}ga xabar yuborish`}
            >
              Xabar Yuborish
            </button> */}
          </div>
        </div>

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

          {/* Tab Contents */}
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
