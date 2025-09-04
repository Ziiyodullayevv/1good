import { useNavigate } from 'react-router';
import slugify from 'slugify';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '../ui/badge';
import { useRef, useCallback } from 'react';
import api from '../../lib/axios'; // axios instance
import { Empty } from 'antd';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl: string;
  title: string;
  bio: string;
  hourlyRate: number;
  location: string;
  skills: string[];
};

type Filters = {
  name: string;
  role: string;
  sortOrder: string;
  limit: number;
  page: number;
};

type Props = {
  filters: Filters;
};

// Build query string
const buildQueryString = (filters: Filters) => {
  const params = new URLSearchParams();

  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
  if (filters.name) params.append('name', filters.name);
  if (filters.role) params.append('role', filters.role);

  return params.toString();
};

const fetchUsers = async (
  filters: Filters
): Promise<{ data: User[]; hasMore: boolean; total: number }> => {
  const queryString = buildQueryString(filters);
  console.log('🚀 Fetch request - URL:', `/user?${queryString}`);

  const response = await api.get(`/user?${queryString}`);
  console.log('📥 API Response full:', response.data);

  let users: User[] = [];
  let total = 0;

  if (response.data.users) {
    users = response.data.users;
    total = response.data.total || users.length;
  } else if (response.data.data) {
    users = response.data.data;
    total = response.data.total || users.length;
  } else if (response.data.results) {
    users = response.data.results;
    total = response.data.total || users.length;
  } else if (Array.isArray(response.data)) {
    users = response.data;
    total = users.length;
  } else {
    const possibleArrays = Object.values(response.data).filter(Array.isArray);
    if (possibleArrays.length > 0) {
      users = possibleArrays[0] as User[];
      total = response.data.total || users.length;
    }
  }

  const totalPages = Math.ceil(total / filters.limit);
  const hasMore = filters.page < totalPages;

  return {
    data: users,
    hasMore,
    total,
  };
};

export default function TalentList({ filters }: Props) {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver>(null);

  const handleClick = (firstName: string, lastName: string, id: string) => {
    const fullName = `${firstName} ${lastName}`;
    const slug = slugify(fullName, { lower: true });
    navigate(`/talent/${slug}-${id}`);
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
    queryKey: ['users', filters.name, filters.role, filters.sortOrder],
    queryFn: ({ pageParam = 1 }) => {
      const queryFilters = { ...filters, page: pageParam as number };
      return fetchUsers(queryFilters);
    },
    getNextPageParam: (lastPage, allPages) => {
      const typedLastPage = lastPage as {
        data: User[];
        hasMore: boolean;
        total: number;
      };

      if (!typedLastPage.hasMore) {
        console.log('❌ No more pages available');
        return undefined;
      }

      const nextPage = allPages.length + 1;
      console.log('✅ Next page will be:', nextPage);
      return nextPage;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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

  const allUsers =
    data?.pages.flatMap(
      (page) => (page as { data: User[]; hasMore: boolean; total: number }).data
    ) || [];

  if (isError) {
    return (
      <div className='mt-5 p-8 bg-white rounded-xl text-center'>
        <div className='text-red-600 font-medium'>
          Xatolik: {(error as Error).message}
        </div>
        <p className='text-gray-500 text-sm mt-2'>
          Ma'lumotlarni yuklashda muammo yuz berdi
        </p>
      </div>
    );
  }

  if (!isLoading && allUsers.length === 0) {
    return (
      <div className='flex justify-center py-10 items-center'>
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          styles={{ image: { height: 200 } }}
          description={<p className='text-lg'>Hech qanday talent topilmadi</p>}
        >
          <p className='text-base'>Filter sozlarmalarini ozgartirib koring</p>
        </Empty>
      </div>
    );
  }

  return (
    <div className='mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      {isLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className='bg-white flex flex-col gap-6 rounded-xl p-5 shadow min-h-[300px] border'
            >
              {/* Header Skeleton */}
              <div className='flex justify-between gap-3'>
                <div className='flex flex-col gap-2 flex-1'>
                  <Skeleton className='h-6 w-32 bg-v2/40 rounded-md' />
                  <Skeleton className='h-4 w-24 bg-v2/40 rounded-md' />
                </div>
                <Skeleton className='h-14 w-14 rounded-full bg-v2/50' />
              </div>

              {/* Content Skeleton */}
              <div className='flex flex-col gap-3 mt-2'>
                <Skeleton className='h-4 w-3/4 bg-v2/40 rounded-md' />

                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-20 rounded-full bg-v2/30' />
                  <Skeleton className='h-6 w-24 rounded-full bg-v2/30' />
                  <Skeleton className='h-6 w-16 rounded-full bg-v2/30' />
                </div>

                <Skeleton className='h-6 w-28 rounded-full bg-v2/40' />
              </div>
            </div>
          ))
        : allUsers.map((user, index) => (
            <div
              onClick={() =>
                handleClick(user.firstName, user.lastName, user._id)
              }
              key={`${user._id}-${index}`}
              className='bg-white flex min-h-[300px] border flex-col justify-between gap-6 rounded-xl p-5 cursor-pointer hover:bg-v8 hover:shadow-md transition-all duration-300'
              ref={index === allUsers.length - 1 ? lastElementRef : null}
            >
              {/* Header */}
              <div className='flex justify-between gap-3'>
                <div className='flex-1'>
                  <h3 className='text-lg capitalize sm:text-xl font-semibold line-clamp-1'>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className='text-sm sm:text-base text-gray-600 capitalize'>
                    {user.role}
                  </p>
                </div>

                <div className='w-14 shrink-0 h-14 bg-v2 overflow-hidden rounded-full'>
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full uppercase flex items-center justify-center text-lg font-medium text-gray-600'>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col gap-3'>
                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  <Badge className='bg-v2 capitalize flex justify-center items-center gap-1 rounded-full px-3 py-1 text-gray-700 font-normal text-sm'>
                    <img
                      src='/talent-location.svg'
                      alt='location'
                      className='w-4 h-4'
                    />
                    <span>{user.location || 'Not specified'}</span>
                  </Badge>

                  <Badge className='bg-blue-50 text-blue-700 rounded-full px-3 py-1 font-normal text-sm'>
                    {user.skills.length} skill
                    {user.skills.length > 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Hourly Rate */}
                <Badge className='bg-green-50 text-green-700 flex justify-center items-center gap-1 rounded-full px-3 py-1 font-medium text-sm w-fit'>
                  <img
                    src='/talent-salary.svg'
                    alt='salary'
                    className='w-4 h-4'
                  />
                  <span>
                    {user?.hourlyRate
                      ? `$${user.hourlyRate}/hr`
                      : 'Not specified'}
                  </span>
                </Badge>
              </div>
            </div>
          ))}

      {/* Loading indicator for infinite scroll */}
      {isFetchingNextPage && (
        <div className='col-span-full flex justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
    </div>
  );
}
