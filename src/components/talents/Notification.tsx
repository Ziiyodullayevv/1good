import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLocation } from 'react-router';

export default function Notification({ scrolled }: { scrolled?: boolean }) {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  const button = !isDashboard ? (
    <MenuButton className='relative'>
      <span className='inline-block right-0 top-0 rounded-full absolute w-3 h-3 bg-red-500'></span>
      <div className='h-[35px] cursor-pointer flex justify-center items-center bg-v2 w-[35px] overflow-hidden rounded-full'>
        <Bell className='size-4' />
      </div>
    </MenuButton>
  ) : (
    <MenuButton
      className={cn(
        'h-[38px] hover:bg-v9/10 group w-[38px] shrink-0 cursor-pointer flex justify-center items-center bg-white rounded-md',
        scrolled ? 'bg-v2 transition-all duration-300' : undefined
      )}
    >
      <Bell className='size-4.5 group-hover:text-v9' />
    </MenuButton>
  );

  return (
    <div>
      <Menu>
        {button}
        <MenuItems
          transition
          anchor='bottom end'
          className='w-[300px] z-[100000] font-poppins p-4 mt-2 shadow-2xl origin-top-right rounded-xl border border-white/5 bg-white text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
        >
          <p className='px-3 py-1 font-poppins text-sm text-black font-medium'>
            Notifications
          </p>

          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer'>
              <p className='font-medium text-gray-600 text-sm'>
                New comment on your post
              </p>
              <p className='text-xs text-gray-500'>
                Someone replied: “Great job!”
              </p>
              <p className='text-[10px] text-gray-400 mt-1'>2 minutes ago</p>
            </div>
          </MenuItem>

          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer'>
              <p className='font-medium text-sm text-gray-600'>
                You have a new follower
              </p>
              <p className='text-xs text-gray-500'>
                John Doe started following you.
              </p>
              <p className='text-[10px] text-gray-400 mt-1'>10 minutes ago</p>
            </div>
          </MenuItem>

          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer'>
              <p className='font-medium text-gray-600 text-sm'>System update</p>
              <p className='text-xs text-gray-500'>
                The system was updated successfully.
              </p>
              <p className='text-[10px] text-gray-400 mt-1'>1 hour ago</p>
            </div>
          </MenuItem>

          <div className='mt-2 text-center'>
            <button className='text-xs text-blue-600 hover:underline'>
              View All Notifications
            </button>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
