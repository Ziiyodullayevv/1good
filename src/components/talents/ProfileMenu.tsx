import { LogOutIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router';
import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const getUserMe = async (userId: string) => {
  const response = await api.get(`user/${userId}`);
  return response.data;
};

export default function ProfileMenu() {
  const { user, logout } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserMe(user!.id),
    enabled: !!user?.id,
  });

  const getInitials = (firstName = '', lastName = '') => {
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
  };

  const initials = data ? getInitials(data.firstName, data.lastName) : '';

  if (isError) return null;

  return (
    <div className='flex items-center'>
      <Menu>
        <MenuButton className='relative focus-visible:outline-none cursor-pointer'>
          {isLoading ? (
            <Skeleton className='w-[35px] h-[35px] rounded-full' />
          ) : (
            <Avatar className='w-[35px] h-[35px]'>
              <AvatarImage src={data?.image} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </MenuButton>

        {data && (
          <MenuItems
            transition
            anchor='bottom end'
            className='w-[300px] divide-y font-poppins p-4 mt-2 shadow-2xl origin-top-right rounded-xl border border-white/5 bg-white text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
          >
            <Link to='/dashboard' className='flex pb-5 items-center gap-3'>
              <Avatar className='w-[50px] h-[50px]'>
                <AvatarImage src={data.image} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className='flex font-medium flex-col'>
                <span>{data.firstName}</span>
                <span>{data.lastName}</span>
              </div>
            </Link>

            <div
              onClick={logout}
              className='hover:bg-gray-100 cursor-pointer flex items-center gap-2 py-2 px-3 mt-3 rounded-lg transition'
            >
              <LogOutIcon className='size-5' />
              <span>Log Out</span>
            </div>
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}
