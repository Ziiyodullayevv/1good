import { useParams } from 'react-router';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import api from '../../lib/axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'sonner';

type Order = {
  _id: string;
  clientId: string;
  title: string;
  summary: string;
  description: string;
  budget: number;
  deadline: string;
  skillsRequired: string[];
  status: string;
};

const Skeleton = () => (
  <section className='my-10'>
    <div className='section-container mx-auto animate-pulse space-y-8'>
      {/* Title */}
      <div className='h-12 bg-v2 rounded w-1/2'></div>
      {/* Summary */}
      <div className='space-y-3'>
        <div className='h-5 bg-v2 rounded w-full'></div>
        <div className='h-5 bg-v2 rounded w-full'></div>
        <div className='h-5 bg-v2 rounded w-5/6'></div>
      </div>
      {/* Project Details Header */}
      <div className='h-8 bg-v2 rounded w-1/4'></div>
      {/* Description & Budget */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <div className='h-5 bg-v2 rounded w-3/4 mb-3'></div>
          <div className='space-y-2'>
            <div className='h-4 bg-v2 rounded w-full'></div>
            <div className='h-4 bg-v2 rounded w-full'></div>
            <div className='h-4 bg-v2 rounded w-4/5'></div>
          </div>
        </div>
        <div>
          <div className='h-5 bg-v2 rounded w-1/2 mb-3'></div>
          <div className='h-6 bg-v2 rounded w-1/3'></div>
        </div>
      </div>
      {/* Deadline & Status */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <div className='h-5 bg-v2 rounded w-1/3 mb-3'></div>
          <div className='h-8 bg-v2 rounded w-24'></div>
        </div>
        <div>
          <div className='h-5 bg-v2 rounded w-1/4 mb-3'></div>
          <div className='h-8 bg-v2 rounded w-24'></div>
        </div>
      </div>
      {/* Skills Required */}
      <div>
        <div className='h-5 bg-v2 rounded w-1/3 mb-3'></div>
        <div className='flex flex-wrap gap-3'>
          <div className='h-7 bg-v2 rounded w-20'></div>
          <div className='h-7 bg-v2 rounded w-16'></div>
          <div className='h-7 bg-v2 rounded w-24'></div>
          <div className='h-7 bg-v2 rounded w-14'></div>
          <div className='h-7 bg-v2 rounded w-20'></div>
        </div>
      </div>
      {/* Submit Proposal */}
      <div>
        <div className='h-8 bg-v2 rounded w-1/4 mb-5'></div>
        <div className='h-40 bg-v2 rounded max-w-[500px]'></div>
        <div className='h-12 bg-v2 rounded max-w-[500px] mt-5'></div>
        <div className='h-12 bg-v2 rounded max-w-[200px] mt-6'></div>
      </div>
    </div>
  </section>
);

export default function OrderSingle() {
  const { slug } = useParams();
  const id = slug?.split('-').pop();

  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');

  const fetchOrder = async (id: string) => {
    const start = Date.now();
    const res = await api.get(`/order/${id}`);
    const elapsed = Date.now() - start;

    const delay = 700;
    if (elapsed < delay) {
      await new Promise((resolve) => setTimeout(resolve, delay - elapsed));
    }

    return res.data;
  };

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      orderId: string;
      message: string;
      price: number;
      status: string;
    }) => {
      const res = await api.post('/submission', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Proposal submitted successfully!');
      setMessage('');
      setPrice('');
    },
    onError: () => {
      toast.error('Failed to submit proposal');
    },
  });

  const statusStyles: Record<string, string> = {
    open: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
  };

  if (isLoading) return <Skeleton />;
  if (isError)
    return (
      <div className='text-center text-red-600 mt-10'>
        Xatolik yuz berdi.{' '}
        <button onClick={() => refetch()} className='underline'>
          Qayta yuklash
        </button>
      </div>
    );

  return (
    <section className='my-10'>
      <div className='section-container mx-auto'>
        <div>
          <h1 className='text-4xl font-semibold'>{order?.title}</h1>
          <p className='mt-4 whitespace-pre-line'>{order?.summary}</p>
        </div>

        <h4 className='my-5 text-2xl font-semibold'>Project Details</h4>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div className='max-w-[500px]'>
            <h5 className='text-gray-500'>Description</h5>
            <p className='whitespace-pre-line'>{order?.description}</p>
          </div>

          <div>
            <h5 className='text-gray-500'>Budget</h5>
            <p className='font-semibold'>${order?.budget.toLocaleString()}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div>
            <h5 className='text-gray-500'>Deadline</h5>
            <span
              className='inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'
              title={dayjs(order?.deadline).format('YYYY-MM-DD HH:mm')}
            >
              {dayjs(order?.deadline).format('DD.MM.YYYY')}
            </span>
          </div>

          <div>
            <h5 className='text-gray-500'>Status</h5>
            <span
              className={`inline-block py-1 px-3 rounded-full text-sm font-medium capitalize ${
                statusStyles[order?.status ?? 'default'] ??
                'bg-gray-100 text-gray-700'
              }`}
            >
              {order?.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div>
            <h5 className='text-gray-500'>Skills Required</h5>
            <div className='flex flex-wrap gap-2 mt-2 max-w-[450px]'>
              {order?.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='my-10'>
          <h4 className='text-2xl font-semibold'>Submit a Proposal</h4>
          <Textarea
            className='my-5 shadow-none min-h-[200px] max-w-[500px]'
            placeholder='Your proposal details here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Input
            id='bid-amount'
            className='h-12 placeholder:text-sm sm:placeholder:text-base mt-3 max-w-[500px] shadow-none'
            placeholder='Your bid amount'
            type='number'
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className='h-12 bg-v9 cursor-pointer text-white px-4 rounded-lg mt-4'
            onClick={() => {
              if (!message.trim() || !price) {
                toast.error('Please fill in all fields');
                return;
              }
              mutation.mutate({
                orderId: order!._id,
                message: message.trim(),
                price: Number(price),
                status: 'pending',
              });
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </div>
      </div>
    </section>
  );
}
