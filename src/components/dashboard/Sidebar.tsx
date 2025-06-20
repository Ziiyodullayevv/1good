import { NavLink } from 'react-router';
import CloseIcon from '../../assets/svgs/CloseIcon';
import {
  ChartPie,
  FileText,
  Folder,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import XIcon from '../../assets/svgs/XIcon';

export default function Sidebar({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const element = document.querySelector('.sitebar');
    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 0);
    };

    element.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'w-[260px] h-screen sidebar overflow-y-auto transition-transform duration-300 ease-in-out border-r border-r-v2 bg-white font-poppins text-base z-[100]',
        'lg:relative',
        isOpen ? 'translate-x-0' : '-translate-x-full absolute'
      )}
    >
      <div
        className={cn(
          'flex px-3 border-b border-b-transparent sticky transition-all duration-200 top-0 h-[58px] justify-between items-center',
          scrolled ? 'border-b border-gray-200' : undefined
        )}
      >
        <span className='pl-2 mt-2'>
          <img width='60px' src='/logo-dark.svg' alt='logo' />
        </span>
        <button
          onClick={onClose}
          className='hover:bg-v9/5 group cursor-pointer rounded-sm h-[38px] w-[38px] flex justify-center items-center transition-all duration-300 ease-in-out transform'
        >
          <CloseIcon className={'group-hover:text-v9 hidden md:block'} />
          <XIcon className='block md:hidden' />
        </button>
      </div>

      {/* Sidebar menyu yoki linklar */}
      <ul className='p-4'>
        <li>
          <NavLink
            to={'/dashboard'}
            end
            className={({ isActive }) =>
              isActive
                ? 'flex items-center text-base bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex items-center rounded-md transition-all hover:bg-v9/10 hover:text-v9 text-base font-normal gap-2 p-2 text-black'
            }
          >
            <LayoutDashboard className='size-4.5' />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'my-projects'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex font-normal transition-all hover:bg-v9/10 hover:text-v9 rounded-md items-center gap-2 p-2 text-black'
            }
          >
            <Folder className='size-4.5' />
            My Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'analytics'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex font-normal transition-all hover:bg-v9/10 hover:text-v9 rounded-md items-center gap-2 p-2 text-black'
            }
          >
            <ChartPie className='size-4.5' />
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'messages'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex font-normal transition-all rounded-md hover:bg-v9/10 hover:text-v9 items-center gap-2 p-2 text-black'
            }
          >
            <MessageCircle className='size-4.5' />
            Messages
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'contracts'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex items-center rounded-md hover:bg-v9/10 hover:text-v9 font-normal gap-2 p-2 text-black'
            }
          >
            <FileText className='size-4.5' />
            Contracts
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'settings'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                : 'flex items-center rounded-md hover:bg-v9/10 hover:text-v9 font-normal gap-2 p-2 text-black'
            }
          >
            <Settings className='size-4.5' />
            Settings
          </NavLink>
        </li>
      </ul>

      <div className='h-[58px] border-t flex items-center px-3 border-t-v2 absolute left-0 bottom-0 bg-white w-full'>
        <span className='text-sm px-2'>&copy; 2025 1good v1.0</span>
      </div>
    </div>
  );
}
