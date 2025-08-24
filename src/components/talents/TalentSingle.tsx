import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Portfolio from './Portfolio';
import Reviews from './Reviews';
import api from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const talentSingle = async (id: string) => {
  const response = await api.get('user/' + id);
  return response.data;
};

export default function TalentSingle() {
  const { slug } = useParams();
  const id = slug?.split('-').pop();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['single-user'],
    queryFn: () => talentSingle(id!),
    enabled: !!id,
  });

  if (!id) return <div>Invalid talent ID</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Message</div>;

  return (
    <section className='pt-10 py-5 bg-white text-base'>
      <div className='container-talent'>
        <div className='flex items-center gap-5'>
          <Avatar className='w-32 h-32 rounded-full'>
            <AvatarImage src={data?.avatarUrl} />
            <AvatarFallback className='text-2xl'>
              {data?.firstName[0]}
              {data?.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className='text-gray-500'>
            <h3 className='text-lg md:text-2xl font-bold text-black'>
              {data?.firstName} {data?.lastName}
            </h3>
            <p className='text-sm capitalize'>
              {data?.location || 'Not Specified'}
            </p>
            {/* <p className='text-sm md:text-base'>Member since 2021</p> */}
            <button className='bg-v9 text-white mt-2 text-sm px-4 py-2 rounded-lg'>
              Send Message
            </button>
          </div>
        </div>

        <Tabs defaultValue='overview' className='w-full mt-10'>
          <TabsList className='border-b flex text-sm gap-5 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='portfolio'>Portfolio</TabsTrigger>
            <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          </TabsList>

          {/* Tab Contents  */}
          <TabsContent value='overview'>
            <Overview data={data} />
          </TabsContent>

          <TabsContent value='portfolio'>
            <Portfolio />
          </TabsContent>

          <TabsContent value='reviews'>
            <Reviews />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
