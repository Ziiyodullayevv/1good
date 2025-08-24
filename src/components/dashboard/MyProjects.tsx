import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Banner from './Banner';
import CustomTable from './CustomTable';

export default function MyProjects() {
  const [statusFilter, setStatusFilter] = useState<
    'open' | 'completed' | 'in_progress'
  >('open');

  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner title='My Projects' buttonText='Create New Project' />

        {/* Project Lists */}
        <div className='sm:p-8'>
          <Tabs
            defaultValue='open'
            className='w-full mt-5 sm:mt-0 px-4'
            onValueChange={(val) =>
              setStatusFilter(val as 'open' | 'completed' | 'in_progress')
            }
          >
            <TabsList className='border-b flex text-sm gap-5 sm:gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
              <TabsTrigger value='open'>Active</TabsTrigger>
              <TabsTrigger value='completed'>Completed</TabsTrigger>
              <TabsTrigger value='in_progress'>Pending</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='sm:mt-5'>
            <CustomTable statusFilter={statusFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}
