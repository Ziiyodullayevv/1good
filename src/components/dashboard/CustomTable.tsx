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

type Order = {
  id: string;
  title: string;
  clientName?: string;
  deadline: string;
  status: string;
  budget?: number;
  description?: string;
  summary?: string;
  skills?: string[];
};

// Skeleton row komponenti
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

/* ---------------- delete function ---------------- */
const deleteProject = async (id: string) => {
  const res = await fetch(
    `https://673841334eb22e24fca75190.mockapi.io/api/v1/futbol/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
};

export default function CustomTable() {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch(
        'https://673841334eb22e24fca75190.mockapi.io/api/v1/futbol'
      );
      if (!res.ok) throw res;
      return res.json();
    },
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Portfolio deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['orders'] }); // to‘g‘rilandi
    },
    onError: () => {
      toast.error('Failed to delete portfolio');
    },
  });

  if (isError) {
    const err = error as unknown as Response;
    const statusCode = err.status as unknown as '404' | '500' | '403';

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
    <>
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
              <TableRow key={order.id}>
                <TableCell className='!w-[250px] whitespace-normal'>
                  {order.title}
                </TableCell>
                {order.clientName && (
                  <TableCell className='whitespace-nowrap text-gray-500'>
                    {order.clientName}
                  </TableCell>
                )}
                <TableCell className='whitespace-nowrap text-gray-500'>
                  {order.deadline}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <span className='py-2 bg-v2 px-3 rounded-full'>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <div className='flex gap-2'>
                    <GeneralTooltip content='Edit'>
                      <CreateProject
                        buttonText='Update'
                        initialData={{
                          id: order.id,
                          title: order.title,
                          budget: order.budget ?? 0,
                          description: order.description ?? '',
                          summary: order.summary ?? '',
                          deadline: new Date(order.deadline),
                          skills: order.skills ?? [],
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
                                deleteMutation.mutate(order.id);
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
    </>
  );
}
