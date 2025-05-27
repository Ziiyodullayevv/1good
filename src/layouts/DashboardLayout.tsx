import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { cn } from '../lib/utils';
import CloseIcon from '../assets/svgs/CloseIcon';
import { Link, Outlet } from 'react-router';
import { Bell, Search } from 'lucide-react';
import { Input } from '../components/ui/input';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='flex relative font-poppins min-h-screen'>
      <Sidebar onClose={() => setIsSidebarOpen(false)} />

      <main
        className={cn(
          'transition-all duration-300 overflow-auto bg-v2',
          isSidebarOpen
            ? 'w-[calc(100%-260px)] top-0 right-0 bottom-0 absolute'
            : 'w-full h-full top-0 right-0 bottom-0 absolute'
        )}
      >
        {/* Main content shu yerda */}
        <div className='h-[58px] bg-v2 top-0 sticky flex items-center px-5 justify-between'>
          {/* Left  */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={cn(
                'hover:bg-v2 shrink-0 rounded-sm flex justify-center items-center h-[33px] w-[33px] font-bold cursor-pointer transition-all ease-in-out transform',
                isSidebarOpen
                  ? 'opacity-100 scale-0 pointer-events-none'
                  : 'opacity-100 duration-500 scale-100'
              )}
            >
              <CloseIcon />
            </button>

            <h2
              className={cn(
                'transition-all font-medium duration-300',
                isSidebarOpen ? 'ml-[-40px]' : 'ml-0'
              )}
            >
              Welcome, Umar
            </h2>
          </div>

          {/* Right  */}
          <div className='flex gap-2'>
            <div className='relative flex items-center'>
              <Search className='absolute ml-2 text-gray-500 size-4' />
              <Input
                className='h-[38px] min-w-[250px] pl-7 shadow-none bg-white border-none'
                placeholder='Search'
              />
            </div>

            <button className='h-[38px] shrink-0 hover:bg-blue-100 cursor-pointer flex justify-center items-center w-[38px] bg-white rounded-md'>
              <Bell className='size-4.5' />
            </button>
            <Link
              to={'/'}
              className='cursor-pointer shrink-0 rounded-md overflow-hidden h-[38px] w-[38px] hover:bg-blue-500'
            >
              <img
                className='w-full h-full object-fill'
                src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                alt='img'
              />
            </Link>
          </div>
        </div>

        <div className='p-5'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
