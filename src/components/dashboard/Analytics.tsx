import Banner from './Banner';

export default function Analytics() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <Banner
        title='Analytics'
        description='Track your performance and earnings on 1good.'
      />

      <div className='p-8'>
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
      </div>
    </div>
  );
}
