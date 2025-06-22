import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Portfolio from './Portfolio';

export default function TalentSingle() {
  return (
    <section className='pt-10 py-5 bg-white text-base'>
      <div className='container-talent'>
        <div className='flex items-center gap-3'>
          <div className='w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-full  bg-v2'>
            <img
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
              alt='profile icon'
            />
          </div>

          <div className='text-gray-500'>
            <h3 className='text-xl md:text-2xl font-bold text-black'>
              Aisha K.
            </h3>
            <p className='text-sm md:text-base'>Tashkent, Uzbekistan</p>
            <p className='text-sm md:text-base'>Member since 2021</p>
          </div>
        </div>

        <Tabs defaultValue='overview' className='w-full mt-10'>
          <TabsList className='border-b flex text-sm gap-5 sm:gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
            <TabsTrigger value='overview'>Active</TabsTrigger>
            <TabsTrigger value='portfolio'>Complated</TabsTrigger>
            <TabsTrigger value='pending'>Pending</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <Overview />
          </TabsContent>
          <TabsContent value='portfolio'>
            <Portfolio />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
