import Banner from './Banner';
import CustomTable from './CustomTable';

export default function Contracts() {
  return (
    <div className='bg-white min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] text-base rounded-xl overflow-hidden'>
      <Banner title='Contracts' />

      <div className='p-0 sm:p-8'>
        <CustomTable />
      </div>
    </div>
  );
}
