import { NavLink } from 'react-router';
import CloseIcon from '../../assets/svgs/CloseIcon';
import { LayoutDashboard } from 'lucide-react';

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className='w-[260px] font-poppins text-base bg-white h-screen relative'>
      <div className='flex px-3 h-[58px] justify-between items-center'>
        <span>
          <img width='60px' src='/logo-dark.svg' alt='logo' />
        </span>
        <button
          onClick={onClose}
          className='hover:bg-v2 cursor-pointer rounded-sm h-[38px] w-[38px] flex justify-center items-center transition-all ease-in-out transform'
        >
          <CloseIcon />
        </button>
      </div>

      {/* Sidebar menyu yoki linklar */}
      <ul className='p-4 space-y-2'>
        <li className=''>
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center bg-v9/10 text-v9 gap-2 p-2 rounded-md font-semibold'
                : 'flex items-center gap-2 p-2 text-gray-600'
            }
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>
        </li>
        <li className=''>Settings</li>
        <li className=''>Profile</li>
      </ul>
    </div>
  );
}
