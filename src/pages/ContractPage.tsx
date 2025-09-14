import { useSearchParams } from 'react-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Banner from '../components/dashboard/Banner';
import ContractTable from '../components/dashboard/ContractTable';

export default function ContractPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL dagi ?status= qiymatini olish, agar bo‘lmasa "all"
  const statusFilter = searchParams.get('status') || 'all';

  const handleChange = (val: string) => {
    setSearchParams({ status: val }); // URL query param ga yozib qo‘yadi
  };

  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner title='Contracts' />

        {/* Project Lists */}
        <div className='sm:p-8'>
          <Tabs
            value={statusFilter} // ✅ endi URL bilan sinxron
            onValueChange={handleChange}
            className='w-full mt-5 sm:mt-0 px-4'
          >
            <TabsList className='border-b flex text-sm gap-5 sm:gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='pending'>Pending</TabsTrigger>
              <TabsTrigger value='active'>Active</TabsTrigger>
              <TabsTrigger value='submitted'>Submitted</TabsTrigger>
              <TabsTrigger value='completed'>Completed</TabsTrigger>
              <TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='sm:mt-5'>
            <ContractTable statusFilter={statusFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}
