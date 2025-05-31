import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Banner from './Banner';
import CustomTable from './CustomTable';

const data = [
  {
    id: '1',
    title: 'Website Redesign for Local Bakery',
    clientName: 'Sarah Johnson',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
  {
    id: '2',
    title: 'Mobile App Development for Fitness Tracker',
    clientName: 'David Lee',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
  {
    id: '3',
    title: 'Content Marketing Strategy for E-commerce Store',
    clientName: 'Emily Chen',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
];
export default function MyProjects() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner
          title='My Projects'
          description='Manage your active, completed, and pending projects.'
        />

        {/* Project Lists  */}
        <div className='p-8'>
          <Tabs defaultValue='active' className='w-full'>
            <TabsList className='border-b flex gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
              <TabsTrigger value='active'>Active</TabsTrigger>
              <TabsTrigger value='complated'>Complated</TabsTrigger>
              <TabsTrigger value='pending'>Pending</TabsTrigger>
            </TabsList>

            {/* <TabsContent value='active'>active</TabsContent>
            <TabsContent value='complated'>compated</TabsContent>
            <TabsContent value='pending'>pending</TabsContent> */}
          </Tabs>

          <div className='mt-5'>
            <CustomTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
