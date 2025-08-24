import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Empty, Result } from 'antd';
import { GeneralTooltip } from '../ui/generalTooltip';
import api from '@/lib/axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

type Contract = {
  _id: string;
  orderId: {
    _id: string;
    title: string;
    budget: number;
    deadline: string;
  } | null;
  clientId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  freelancerId: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  agreedBudget: number;
  agreedDeadline: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

const SkeletonRow = () => (
  <TableRow>
    {Array(5)
      .fill(null)
      .map((_, i) => (
        <TableCell key={i}>
          <div className='h-4 bg-v2 animate-pulse rounded w-full' />
        </TableCell>
      ))}
  </TableRow>
);

export default function ContractTable({
  statusFilter,
}: {
  statusFilter: string;
}) {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery<{
    total: number;
    data: Contract[];
  }>({
    queryKey: ['contracts', statusFilter],
    queryFn: async () => {
      const url =
        statusFilter === 'all'
          ? '/contract'
          : `/contract?status=${statusFilter}`;
      const res = await api.get(url);

      return res.data; // {total, data}
    },
    retry: false,
  });

  if (isError) {
    const err = error as unknown as { status?: number };
    const statusCode = (err.status ?? 500) as 404 | 500 | 403;

    return (
      <Result
        status={statusCode}
        title={`Error ${statusCode}`}
        subTitle='Sorry, something went wrong.'
        extra={<Button onClick={() => refetch()}>Retry</Button>}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Title</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

        {!isLoading && data?.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className='text-center py-8 text-gray-500'>
              <Empty
                className='flex justify-center flex-col items-center gap-3'
                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                styles={{ image: { height: 180 } }}
                description={<p>No Data</p>}
              ></Empty>
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          data?.data?.map((contract) => (
            <TableRow key={contract._id}>
              <TableCell className='!w-[250px] truncate whitespace-normal'>
                <div className='max-w-[300px]'>
                  <p
                    className='truncate capitalize'
                    title={contract.orderId?.title}
                  >
                    {contract.orderId?.title}
                  </p>
                  {contract.agreedBudget && (
                    <p className='text-xs text-gray-500 mt-1'>
                      Budget: ${contract.agreedBudget.toLocaleString()}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap text-gray-500'>
                {contract.clientId.firstName} {contract.clientId.lastName}
              </TableCell>

              <TableCell className='whitespace-nowrap text-gray-500'>
                <div className='flex flex-col'>
                  <span>
                    {dayjs(contract.agreedDeadline).format('MMM DD, YYYY')}
                  </span>
                  <span className='text-xs text-gray-400'>
                    {dayjs(contract.agreedDeadline).fromNow()}
                  </span>
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                <span
                  className={`py-1.5 px-3 first-letter:uppercase rounded-full ${
                    contract.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : contract.status === 'active'
                        ? 'bg-blue-100 text-blue-700'
                        : contract.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {contract.status}
                </span>
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                <GeneralTooltip content='View'>
                  <Button
                    aria-label='View contract'
                    onClick={() =>
                      navigate('/dashboard/contract/' + contract._id)
                    }
                    className='flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 h-8 px-3 rounded-full shadow-sm transition-all'
                  >
                    <Eye className='w-4 h-4' />
                    <span className='text-sm font-medium'>View</span>
                  </Button>
                </GeneralTooltip>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
