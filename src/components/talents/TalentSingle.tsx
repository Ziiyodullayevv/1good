import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Portfolio from './Portfolio';
import Reviews from './Reviews';

export default function TalentSingle() {
  return (
    <section className='pt-10 py-5 bg-white text-base'>
      <div className='container-talent'>
        <div className='flex items-center gap-5'>
          <div className='w-22 h-22 md:w-35 md:h-35 overflow-hidden rounded-full bg-v2'>
            <img
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
              alt='profile icon'
            />
          </div>

          <div className='text-gray-500'>
            <h3 className='text-lg md:text-2xl font-bold text-black'>
              Umar Forsiy
            </h3>
            <p className='text-sm'>Tashkent, Uzbekistan</p>
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
            <Overview />
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
