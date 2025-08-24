import { NavLink } from 'react-router';
import CloseIcon from '@/assets/svgs/CloseIcon';
import {
  BriefcaseBusiness,
  ChartPie,
  CreditCard,
  FileText,
  Folder,
  MessageCircle,
  SendToBack,
  Settings,
  UserRoundPen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import XIcon from '@/assets/svgs/XIcon';
import { useAuth } from '../../context/AuthContext';

type Role = 'client' | 'freelancer';

const navItems = [
  {
    to: '/dashboard',
    label: 'Profile',
    icon: <UserRoundPen className='size-4.5' />,
    exact: true,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'portfolio',
    label: 'Portfolio',
    icon: <BriefcaseBusiness className='size-4.5' />,
    roles: ['freelancer'] as Role[],
  },
  {
    to: 'my-projects',
    label: 'My Order',
    icon: <Folder className='size-4.5' />,
    roles: ['client'] as Role[],
  },
  {
    to: 'contract',
    label: 'Contracts',
    icon: <FileText className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'submission',
    label: 'Submission',
    icon: <SendToBack className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'analytics',
    label: 'Analytics',
    icon: <ChartPie className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'messages',
    label: 'Messages',
    icon: <MessageCircle className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'credits',
    label: 'Credits',
    icon: <CreditCard className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
  {
    to: 'settings',
    label: 'Settings',
    icon: <Settings className='size-4.5' />,
    roles: ['client', 'freelancer'] as Role[],
  },
];

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function Sidebar({ onClose, isOpen }: SidebarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const element = document.querySelector('.sidebar') as HTMLElement;
    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 0);
    };

    element.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseIfMobile = (): void => {
    if (window.innerWidth < 640) {
      onClose();
    }
  };

  const filteredNavItems = navItems.filter((item) =>
    user?.role ? item.roles.includes(user.role as Role) : true
  );

  return (
    <>
      {isOpen && (
        <div
          onClick={handleCloseIfMobile}
          className='fixed block sm:hidden top-0 left-0 w-full h-full bg-black/30 z-[99]'
        />
      )}
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

        <ul className='p-4'>
          {filteredNavItems.map(({ to, label, icon, exact }, index) => (
            <li key={`${to}-${index}`}>
              <NavLink
                to={to}
                end={exact}
                onClick={handleCloseIfMobile}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-base bg-v9/5 text-v9 gap-2 p-2 rounded-md font-normal'
                    : 'flex items-center rounded-md transition-all hover:bg-v9/10 hover:text-v9 text-base font-normal gap-2 p-2 text-black'
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='h-[58px] border-t flex items-center px-3 border-t-v2 absolute left-0 bottom-0 bg-white w-full'>
          <span className='text-sm px-2'>&copy; 2025 1good v1.0</span>
        </div>
      </div>
    </>
  );
}
