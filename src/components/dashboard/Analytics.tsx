import Banner from './Banner';
import MonthlyChart from './charts/MonthlyChart';
import WeeklyChart from './charts/WeeklyChart';

export default function Analytics() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      {/* Analytics header  */}
      <Banner
        title='Analytics'
        description='Track your performance and earnings on 1good.'
      />

      {/* Analytics main  */}
      <div className='p-8'>
        {/* Analytics cards  */}
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-v2 p-5 rounded-lg'>
            <h4>Total Earnings</h4>
            <h3 className='text-2xl mt-2 font-semibold'>$12,500</h3>
          </div>

          <div className='bg-v2 p-5 rounded-lg'>
            <h4>Completed Jobs</h4>
            <h3 className='text-2xl mt-2 font-semibold'>75</h3>
          </div>

          <div className='bg-v2 p-5 rounded-lg'>
            <h4>Average Client Rating</h4>
            <h3 className='text-2xl mt-2 font-semibold'>4.8</h3>
          </div>
        </div>
        {/* Earnings Trends  */}
        <h3 className='text-xl font-bold my-5'>Earnings Trends</h3>
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <span className='text-gray-700'>Weekly Earnings</span>
            <h4 className='text-3xl font-bold my-3'>$1,200</h4>
            <div className='text-sm inline-flex items-center gap-3'>
              <span className='text-gray-500'>Last 7 Days</span>
              <span className='text-green-400'>+15%</span>
            </div>

            <div className='min-h-[200px]'>
              <WeeklyChart />
            </div>
          </div>

          {/* two pointer  */}
          <div>
            <span className='text-gray-700'>Monthly Earnings</span>
            <h4 className='text-3xl font-bold my-3'>$1,200</h4>
            <div className='text-sm inline-flex items-center gap-3'>
              <span className='text-gray-500'>Last 30 Days</span>
              <span className='text-red-400'>-5%</span>
            </div>

            <div className=' min-h-[200px]'>
              <MonthlyChart />
            </div>
          </div>
        </div>

        {/* Job Completion Trends */}
        <h3 className='text-xl font-bold my-5'>Job Completion Trends</h3>
        <div className='grid grid-cols-2 gap-5'>
          {/* two pointer  */}
          <div>
            <span className='text-gray-700'>Weekly Jobs Completed</span>
            <h4 className='text-3xl font-bold my-3'>10</h4>
            <div className='text-sm inline-flex items-center gap-3'>
              <span className='text-gray-500'>Last 7 Days</span>
              <span className='text-green-400'>+20%</span>
            </div>

            <div className=' min-h-[200px]'>
              <MonthlyChart />
            </div>
          </div>

          <div>
            <span className='text-gray-700'>Monthly Jobs Completed</span>
            <h4 className='text-3xl font-bold my-3'>30</h4>
            <div className='text-sm inline-flex items-center gap-3'>
              <span className='text-gray-500'>Last 30 Days</span>
              <span className='text-green-400'>+10%</span>
            </div>

            <div className='min-h-[200px]'>
              <WeeklyChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
