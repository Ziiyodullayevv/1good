import { Bell, Search } from 'lucide-react';
import CloseIcon from '../../assets/svgs/CloseIcon';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { Link } from 'react-router';
import HamburgerIcon from '../../assets/svgs/HamburgerIcon';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  scrolled: boolean;
};

export default function TopBar({
  isSidebarOpen,
  scrolled,
  setIsSidebarOpen,
}: Props) {
  return (
    <div
      className={cn(
        'h-[58px] bg-v2 top-0 z-50 sticky transition-all border-b border-b-transparent duration-200 flex items-center px-3 md:px-5 justify-between',
        scrolled ? 'border-b bg-white border-b-gray-200' : undefined
      )}
    >
      {/* Left  */}
      <div className='flex items-center gap-2'>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className={cn(
            'hover:bg-v9/10 bg-white group shrink-0 rounded-sm flex justify-center items-center h-[38px] w-[38px] font-bold cursor-pointer transition-all ease-in-out transform',
            isSidebarOpen
              ? 'opacity-100 scale-0 pointer-events-none'
              : 'opacity-100 duration-500 scale-100'
          )}
        >
          <CloseIcon className='hidden md:block group-hover:text-v9' />
          <HamburgerIcon className='block md:hidden' />
        </div>

        <h2
          className={cn(
            'transition-all hidden md:block font-medium duration-300',
            isSidebarOpen ? 'ml-[-46px]' : 'ml-0'
          )}
        >
          Welcome, Umar
        </h2>
      </div>

      {/* Right  */}
      <div className='flex gap-2'>
        <div className='relative hidden md:flex items-center'>
          <Search className='absolute ml-2 text-gray-500 size-4' />
          <Input
            className={cn(
              'h-[38px] min-w-[250px] transition-all duration-300 pl-7 shadow-none bg-white border-none',
              scrolled ? 'bg-v2' : undefined
            )}
            placeholder='Search'
          />
        </div>

        <button
          className={cn(
            'h-[38px] hover:bg-v9/10 group w-[38px] shrink-0 cursor-pointer flex justify-center items-center bg-white rounded-md',
            scrolled ? 'bg-v2 transition-all duration-300' : undefined
          )}
        >
          <Bell className='size-4.5 group-hover:text-v9' />
        </button>
        <Link
          to={'/'}
          className='cursor-pointer shrink-0 rounded-md overflow-hidden h-[38px] w-[38px] hover:bg-blue-500'
        >
          <img
            className='w-full h-full object-fill'
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
            alt=''
          />
        </Link>
      </div>
    </div>
  );
}
