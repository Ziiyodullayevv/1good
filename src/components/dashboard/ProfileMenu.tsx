import { LogOutIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '../../hooks/useUser';
import { cn } from '../../lib/utils';

export default function ProfileMenu({ scrolled }: { scrolled: boolean }) {
  const { logout } = useAuth();
  const { data, isError, isLoading } = useUser();

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
            <Skeleton className='w-[38px] h-[38px] rounded-lg' />
          ) : (
            <Avatar className={cn('w-[38px] h-[38px] rounded-lg')}>
              <AvatarImage className='rounded-lg' src={data?.avatarUrl} />
              <AvatarFallback
                className={cn(
                  'rounded-lg text-sm bg-white font-medium',
                  scrolled ? 'bg-v2 transition-all duration-300' : undefined
                )}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
        </MenuButton>

        {/* Menu faqat data mavjud bo'lganda ko'rsatiladi */}
        {data && !isLoading && (
          <MenuItems
            transition
            anchor='bottom end'
            className='w-[300px] divide-y font-poppins p-4 mt-2 shadow-2xl origin-top-right rounded-xl border border-white/5 bg-white text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
          >
            {/* Profile Link */}
            <Link
              to='/dashboard'
              className='flex pb-5 items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors'
            >
              <Avatar className='w-[60px] rounded-full h-[60px]'>
                <AvatarImage src={data.avatarUrl} />
                <AvatarFallback className='text-lg font-medium'>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className='flex font-medium flex-col'>
                <span className='text-base'>
                  {data.firstName} {data.lastName}
                </span>
                <span className='text-sm text-gray-500 font-normal'>
                  {data.email}
                </span>
              </div>
            </Link>

            {/* Logout Button */}
            <div
              onClick={logout}
              className='hover:bg-red-50 hover:text-red-600 cursor-pointer flex items-center gap-3 py-3 px-3 mt-3 rounded-lg transition-all duration-200'
            >
              <LogOutIcon className='size-5' />
              <span className='font-medium'>Log Out</span>
            </div>
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}
