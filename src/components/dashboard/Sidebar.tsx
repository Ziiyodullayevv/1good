import { NavLink } from 'react-router';
import CloseIcon from '../../assets/svgs/CloseIcon';
import {
  ChartPie,
  LayoutDashboard,
  MessageCircleMore,
  Settings,
} from 'lucide-react';

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className='w-[260px] font-poppins text-base bg-white h-screen relative'>
      <div className='flex px-3 h-[58px] justify-between items-center'>
        <span className='pl-2 mt-1'>
          <img width='60px' src='/logo-dark.svg' alt='logo' />
        </span>
        <button
          onClick={onClose}
          className='hover:bg-v9/10 group cursor-pointer rounded-sm h-[38px] w-[38px] flex justify-center items-center transition-all ease-in-out transform'
        >
          <CloseIcon className={'group-hover:text-v9'} />
        </button>
      </div>

      {/* Sidebar menyu yoki linklar */}
      <ul className='p-4 space-y-2'>
        <li className=''>
          <NavLink
            to={'/dashboard'}
            end
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/10 text-v9 gap-2 p-2 rounded-md font-medium'
                : 'flex items-center font-medium gap-2 p-2 text-black'
            }
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>
        </li>
        <li className=''>
          <NavLink
            to={'a1'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/10 text-v9 gap-2 p-2 rounded-md font-medium'
                : 'flex font-medium items-center gap-2 p-2 text-black'
            }
          >
            <ChartPie />
            Analytics
          </NavLink>
        </li>

        <li className=''>
          <NavLink
            to={'a2'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/10 text-v9 gap-2 p-2 rounded-md font-medium'
                : 'flex font-medium items-center gap-2 p-2 text-black'
            }
          >
            <MessageCircleMore />
            Discussions
          </NavLink>
        </li>

        <li className=''>
          <NavLink
            to={'a3'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/10 text-v9 gap-2 p-2 rounded-md font-medium'
                : 'flex items-center font-medium gap-2 p-2 text-black'
            }
          >
            <Settings />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
