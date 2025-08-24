'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router'; // ✅ react-router uchun to‘g‘ri
import { cn } from '../../../lib/utils';

export default function MessagePopover({ scrolled }: { scrolled?: boolean }) {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  const button = !isDashboard ? (
    <MenuButton className='relative'>
      <span className='inline-block right-0 top-0 rounded-full absolute w-3 h-3 bg-red-500'></span>
      <div className='h-[35px] cursor-pointer flex justify-center items-center bg-v2 w-[35px] overflow-hidden rounded-full'>
        <Mail className='size-4' />
      </div>
    </MenuButton>
  ) : (
    <MenuButton
      className={cn(
        'h-[38px] hover:bg-v9/10 group w-[38px] shrink-0 cursor-pointer flex justify-center items-center bg-white rounded-md',
        scrolled ? 'bg-v2 transition-all duration-300' : undefined
      )}
    >
      <Mail className='size-4.5 group-hover:text-v9' />
    </MenuButton>
  );
  
  return (
    <div>
      <Menu>
        {button}

        <MenuItems
          transition
          anchor='bottom end'
          className='max-w-[320px] z-[100000] font-poppins p-4 mt-2 shadow-2xl origin-top-right rounded-xl border border-white/5 bg-white text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 overflow-hidden box-border'
        >
          <p className='px-3 py-1 font-poppins text-sm text-black font-medium'>
            Messages
          </p>

          {/* Message 1 */}
          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer flex items-start gap-3'>
              <div className='size-8 rounded-full bg-slate-200 grid place-items-center text-xs font-semibold'>
                S
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-gray-600 text-sm truncate'>
                  Sophia Carter
                </p>
                <p className='text-xs text-gray-500 truncate overflow-hidden'>
                  Hi Alex, I’ve reviewed the initial designs...
                </p>
                <p className='text-[10px] text-gray-400 mt-1'>2d ago</p>
              </div>
            </div>
          </MenuItem>

          {/* Message 2 */}
          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer flex items-start gap-3'>
              <div className='size-8 rounded-full bg-slate-200 grid place-items-center text-xs font-semibold'>
                E
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-sm text-gray-600 truncate'>
                  Ethan Harper
                </p>
                <p className='text-xs text-gray-500 truncate overflow-hidden'>
                  Hey Alex, any update on the mobile app prototype?
                </p>
                <p className='text-[10px] text-gray-400 mt-1'>1w ago</p>
              </div>
            </div>
          </MenuItem>

          {/* Message 3 */}
          <MenuItem>
            <div className='px-3 py-2 hover:bg-v2 rounded-lg cursor-pointer flex items-start gap-3'>
              <div className='size-8 rounded-full bg-slate-200 grid place-items-center text-xs font-semibold'>
                O
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-sm text-gray-600 truncate'>
                  Olivia Bennett
                </p>
                <p className='text-xs text-gray-500 truncate overflow-hidden'>
                  I’ve shared the campaign draft with you...
                </p>
                <p className='text-[10px] text-gray-400 mt-1'>2w ago</p>
              </div>
            </div>
          </MenuItem>

          {/* View all */}
          <div className='mt-2 text-center'>
            <MenuItem>
              <Link
                to='/talent/messages'
                className='text-xs text-blue-600 hover:underline'
              >
                View All Messages
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
