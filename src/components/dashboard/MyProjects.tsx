import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Banner from './Banner';
import CustomTable from './CustomTable';

export default function MyProjects() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner
          title='My Projects'
          // description='Manage your active, completed, and pending projects.'
          buttonText='Create New Project'
        />

        {/* Project Lists  */}
        <div className='sm:p-8'>
          <Tabs defaultValue='active' className='w-full mt-5 sm:mt-0 px-4'>
            <TabsList className='border-b flex text-sm gap-5 sm:gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
              <TabsTrigger value='active'>Active</TabsTrigger>
              <TabsTrigger value='complated'>Complated</TabsTrigger>
              <TabsTrigger value='pending'>Pending</TabsTrigger>
            </TabsList>

            {/* <TabsContent value='active'>active</TabsContent>
            <TabsContent value='complated'>compated</TabsContent>
            <TabsContent value='pending'>pending</TabsContent> */}
          </Tabs>

          <div className='sm:mt-5'>
            <CustomTable />
          </div>
        </div>
      </div>
    </div>
  );
}
