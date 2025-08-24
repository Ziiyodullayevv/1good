import { useNavigate } from 'react-router';
import slugify from 'slugify';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useCallback } from 'react';
import api from '@/lib/axios';
import { Empty } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Developer = {
  _id: string;
  title: string;
  summary: string;
  level: string;
  description: string;
  budget: number;
  skillsRequired: string[];
  price: number;
  createdAt: string;
};

type Filters = {
  min?: number;
  max?: number;
  limit: number;
  page: number;
};

type Props = {
  filters: Filters;
};

// Query string generator
const buildQueryString = (filters: Filters) => {
  const params = new URLSearchParams();

  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.min !== undefined)
    params.append('budgetMin', filters.min.toString());
  if (filters.max !== undefined)
    params.append('budgetMax', filters.max.toString());

  return params.toString();
};

// API fetch function
const fetchOrders = async (
  filters: Filters
): Promise<{ data: Developer[]; hasMore: boolean; total: number }> => {
  const queryString = buildQueryString(filters);
  console.log('📤 Fetch Orders:', `/order?${queryString}`);

  const res = await api.get(`/order?${queryString}`);

  let orders: Developer[] = [];
  let total = 0;

  if (res.data?.data) {
    orders = res.data.data;
    total = res.data.total || orders.length;
  } else if (Array.isArray(res.data)) {
    orders = res.data;
    total = orders.length;
  }

  // Page-based pagination
  const totalPages = Math.ceil(total / filters.limit);
  const hasMore = filters.page < totalPages;

  return { data: orders, hasMore, total };
};

export default function OrderList({ filters }: Props) {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleClick = (title: string, id: string) => {
    const slug = slugify(title, { lower: true });
    navigate(`/order/${slug}-${id}`);
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders', filters.min, filters.max],
    queryFn: ({ pageParam = 1 }) =>
      fetchOrders({ ...filters, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const allOrders = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    return (
      <div className='text-red-500'>Xatolik: {(error as Error).message}</div>
    );
  }

  if (!isLoading && allOrders.length === 0) {
    return (
      <div className='flex justify-center py-10 items-center'>
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          styles={{ image: { height: 200 } }}
          description={<p className='text-lg'>Hech qanday order topilmadi</p>}
        />
      </div>
    );
  }

  return (
    <div className='mt-5 text-base grid gap-5 grid-cols-2'>
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-xl p-5 shadow-none border animate-pulse flex flex-col gap-5'
            >
              <Skeleton className='h-6 w-3/4 rounded-md' />
              <Skeleton className='h-4 w-1/2 rounded-md' />
              <div className='flex gap-2 flex-wrap mt-3'>
                <Skeleton className='h-6 w-24 rounded-full' />
                <Skeleton className='h-6 w-20 rounded-full' />
                <Skeleton className='h-6 w-28 rounded-full' />
              </div>
              <Skeleton className='h-9 w-28 rounded-md mt-4' />
            </div>
          ))
        : allOrders.map((order, index) => (
            <div
              ref={index === allOrders.length - 1 ? lastElementRef : null}
              onClick={() => handleClick(order.title, order._id)}
              key={`${order._id}-${index}`}
              className='bg-white flex flex-col justify-between rounded-xl p-5 cursor-pointer border shadow-none transition-all duration-300'
            >
              <div>
                <h2 className='font-medium first-letter:uppercase line-clamp-2 text-lg leading-6 hover:text-v9'>
                  {order.title}
                </h2>
                <div className='flex my-5 gap-8'>
                  <div>
                    <h5 className='first-letter:uppercase font-medium text-base'>
                      ${order.budget}
                    </h5>
                    <p className='text-gray-400 first-letter:uppercase text-xs'>
                      Fixed-price
                    </p>
                  </div>
                  <div>
                    <h5 className='font-medium first-letter:uppercase text-base'>
                      Export
                    </h5>
                    <p className='text-xs first-letter:uppercase text-gray-400'>
                      Experience level
                    </p>
                  </div>
                </div>
                <p className='my-4 first-letter:uppercase line-clamp-2 text-base'>
                  {order.summary}
                </p>
              </div>
              <div>
                <div className='my-5 flex flex-wrap gap-2 text-gray-700'>
                  {Array.isArray(order.skillsRequired) &&
                    order.skillsRequired.map((skill, idx) => (
                      <span
                        key={idx}
                        className='bg-v2 first-letter:uppercase capitalize text-xs px-3 py-2.5 rounded-full'
                      >
                        {skill}
                      </span>
                    ))}
                </div>
                <div className='flex items-end justify-between'>
                  <button className='h-9 text-sm cursor-pointer hover:opacity-90 px-4 bg-v9 text-white rounded-lg'>
                    See more
                  </button>
                  <p className='text-sm text-gray-500'>
                    {dayjs(order.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      {isFetchingNextPage && (
        <div className='col-span-full flex justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
    </div>
  );
}
