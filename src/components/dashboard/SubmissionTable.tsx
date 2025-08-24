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

type Submission = {
  _id: string;
  message: string;
  price: number;
  status: string;
  submittedAt: string;
  updatedAt: string;
  order: {
    _id: string;
    title: string;
    budget?: number;
    deadline: string;
    status: string;
  };
  freelancer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const SkeletonRow = () => (
  <TableRow>
    {Array(4)
      .fill(null)
      .map((_, i) => (
        <TableCell key={i}>
          <div className='h-4 bg-v2 animate-pulse rounded w-full' />
        </TableCell>
      ))}
  </TableRow>
);

export default function SubmissionTable({
  statusFilter,
}: {
  statusFilter: string;
}) {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate('/dashboard/submission/' + id);
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Submission[]>({
    queryKey: ['submission', statusFilter],
    queryFn: async () => {
      const url =
        statusFilter === 'all'
          ? '/submission'
          : `/submission?status=${statusFilter}`;
      const res = await api.get(url);
      return res.data.submissions; // ✅ to‘g‘ri massivni qaytaramiz
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
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

        {!isLoading && data.length === 0 && (
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
          data.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell className='!w-[250px] truncate whitespace-normal'>
                <div className='max-w-[300px]'>
                  <p
                    className='truncate capitalize'
                    title={submission.order.title}
                  >
                    {submission.order.title}
                  </p>
                  {submission.order.budget && (
                    <p className='text-xs text-gray-500 mt-1'>
                      Budget: ${submission.order.budget.toLocaleString()}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap text-gray-500'>
                <div className='flex flex-col'>
                  <span>
                    {dayjs(submission.order.deadline).format('MMM DD, YYYY')}
                  </span>
                  <span className='text-xs text-gray-400'>
                    {dayjs(submission.order.deadline).fromNow()}
                  </span>
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                {(() => {
                  let bg = '';
                  let text = '';

                  switch (submission.status) {
                    case 'pending':
                      bg = 'bg-yellow-100';
                      text = 'text-yellow-700';
                      break;
                    case 'approved':
                      bg = 'bg-green-100';
                      text = 'text-green-700';
                      break;
                    case 'rejected':
                      bg = 'bg-red-100';
                      text = 'text-red-700';
                      break;
                    default:
                      bg = 'bg-gray-100';
                      text = 'text-gray-700';
                  }

                  return (
                    <span
                      className={`py-1.5 px-3 first-letter:uppercase rounded-full ${bg} ${text} capitalize`}
                    >
                      {submission.status.replace('_', ' ')}
                    </span>
                  );
                })()}
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                <GeneralTooltip content='View'>
                  <Button
                    aria-label='View submission'
                    onClick={() => handleClick(submission._id)}
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
