import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Result } from 'antd';
import { GeneralTooltip } from '../ui/generalTooltip';
import CreateProject from './CreateProject';
import { toast } from 'sonner';
import api from '@/lib/axios';
import dayjs from 'dayjs';

type Order = {
  _id: string;
  title: string;
  clientName?: string;
  deadline: string;
  status: string;
  budget?: number;
  description?: string;
  summary?: string;
  skills?: string[];
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

const deleteProject = async (id: string) => {
  const res = await api.delete(`/order/${id}`);
  return res.data.data;
};

export default function CustomTable({
  statusFilter,
}: {
  statusFilter: string;
}) {
  const queryClient = useQueryClient();

  // ✅ Backend filter bilan ma'lumot olish
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ['orders', statusFilter],
    queryFn: async () => {
      const res = await api.get(`/order/my?status=${statusFilter}`);
      return res.data.data;
    },
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Project deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
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
          {data.some((o) => o.clientName) && <TableHead>Client</TableHead>}
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

        {!isLoading && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className='text-center py-8 text-gray-500'>
              Ma’lumot mavjud emas
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          data.map((order) => (
            <TableRow key={order._id}>
              <TableCell className='!w-[250px] truncate first-letter:uppercase whitespace-normal'>
                <div className='max-w-[300px]'>
                  <p className='truncate capitalize' title={order.title}>
                    {order.title}
                  </p>
                  {order.budget && (
                    <p className='text-xs text-gray-500 mt-1'>
                      Budget: ${order.budget.toLocaleString()}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap text-gray-500'>
                <div className='flex flex-col'>
                  <span>{dayjs(order.deadline).format('MMM DD, YYYY')}</span>
                  <span className='text-xs text-gray-400'>
                    {dayjs(order.deadline).fromNow()}
                  </span>
                </div>
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                {(() => {
                  let bg = '';
                  let text = '';

                  switch (order.status) {
                    case 'open':
                      bg = 'bg-green-100';
                      text = 'text-green-700';
                      break;
                    case 'completed':
                      bg = 'bg-blue-100';
                      text = 'text-blue-700';
                      break;
                    case 'in_progress':
                      bg = 'bg-yellow-100';
                      text = 'text-yellow-700';
                      break;
                    default:
                      bg = 'bg-gray-100';
                      text = 'text-gray-700';
                  }

                  return (
                    <span
                      className={`py-1.5 px-3 first-letter:uppercase rounded-full ${bg} ${text} capitalize`}
                    >
                      {order.status.replace('_', ' ')}
                    </span>
                  );
                })()}
              </TableCell>

              <TableCell className='whitespace-nowrap'>
                <div className='flex gap-2'>
                  <GeneralTooltip content='Edit'>
                    <CreateProject
                      buttonText='Update'
                      initialData={{
                        id: order._id,
                        title: order.title,
                        budget: order.budget ?? 0,
                        description: order.description ?? '',
                        summary: order.summary ?? '',
                        deadline: new Date(order.deadline),
                        skillsRequired: order.skills ?? [],
                      }}
                    />
                  </GeneralTooltip>

                  <GeneralTooltip content='Delete'>
                    <Button
                      aria-label='Delete project'
                      onClick={() => {
                        toast.message('Are you sure you want to delete?', {
                          action: {
                            label: 'Yes, delete',
                            onClick: () => {
                              deleteMutation.mutate(order._id);
                            },
                          },
                        });
                      }}
                      className='bg-red-600/10 text-red-600 h-8 w-8 p-0.5 rounded-full'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </GeneralTooltip>

                  <GeneralTooltip content='View'>
                    <Button
                      aria-label='View project'
                      onClick={() =>
                        toast.info(`Project title: ${order.title}`)
                      }
                      className='bg-[#F0F8FF] text-[#1f456e] h-8 w-8 p-0.5 rounded-full'
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                  </GeneralTooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
