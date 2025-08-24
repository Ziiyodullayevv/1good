import { useSearchParams } from 'react-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmissionTable from '../components/dashboard/SubmissionTable';
import Banner from '../components/dashboard/Banner';

export default function SubmissionPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL'dan statusni olish
  const statusParam = searchParams.get('status');
  const statusFilter =
    statusParam === 'pending' ||
    statusParam === 'accepted' ||
    statusParam === 'rejected' ||
    statusParam === 'all'
      ? statusParam
      : 'all'; // default qiymat

  const handleTabChange = (value: string) => {
    setSearchParams({ status: value }); // URL'ga yozib qo'yadi
  };

  return (
    <div className='bg-white text-base min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <div>
        <Banner title='Submissions' />

        {/* Project Lists */}
        <div className='sm:p-8'>
          <Tabs
            value={statusFilter} // ✅ URL bilan sinxron
            onValueChange={handleTabChange}
            className='w-full mt-5 sm:mt-0 px-4'
          >
            <TabsList className='border-b flex text-sm gap-5 sm:gap-10 p-0 h-[45px] bg-transparent w-full justify-start shadow-none rounded-none'>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='pending'>Pending</TabsTrigger>
              <TabsTrigger value='accepted'>Accepted</TabsTrigger>
              <TabsTrigger value='rejected'>Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='sm:mt-5'>
            <SubmissionTable statusFilter={statusFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}
