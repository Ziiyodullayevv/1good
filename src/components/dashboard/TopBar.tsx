import CloseIcon from '../../assets/svgs/CloseIcon';
import { cn } from '../../lib/utils';
import HamburgerIcon from '../../assets/svgs/HamburgerIcon';
import { useUser } from '../../hooks/useUser';
import ProfileMenu from './ProfileMenu';
import { Skeleton } from '../ui/skeleton';
import { Link } from 'react-router';
import Notification from '../talents/Notification';
import MessagePopover from '../../features/messages/components/MessagePopover';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import MobileNavigation from '@/components/talents/MobileNavigation';
import logo from '@/assets/images/common/logo-dark.svg';
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
  const { data, isLoading } = useUser();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

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
            'hover:bg-v9/10 bg-white hidden md:flex group shrink-0 rounded-sm justify-center items-center h-[38px] w-[38px] font-bold cursor-pointer transition-all ease-in-out transform',
            isSidebarOpen
              ? 'opacity-100 scale-0 pointer-events-none'
              : 'opacity-100 duration-500 scale-100'
          )}
        >
          <CloseIcon className='hidden md:block group-hover:text-v9' />
          <HamburgerIcon className='block md:hidden' />
        </div>

        <Link to={'/talent'} className='md:hidden'>
          <img className='w-[70px]' src={logo} alt='' />
        </Link>

        {/* Welcome message with skeleton */}
        <div
          className={cn(
            'transition-all hidden md:block font-medium duration-300',
            isSidebarOpen ? 'ml-[-46px]' : 'ml-0'
          )}
        >
          {isLoading ? (
            <Skeleton className='h-5 w-32' />
          ) : (
            <span className='capitalize'>Welcome, {data?.firstName}</span>
          )}
        </div>
      </div>

      {/* Right  */}
      <div className='flex gap-2 items-center'>
        {/* client or freelancer */}
        <div className='mr-5 text-base hidden md:inline-block'>
          {data?.role === 'client' ? (
            <Link to={'/talent'}>Freelancer</Link>
          ) : (
            <Link to={'/order'}>Orders</Link>
          )}
        </div>

        <div className='items-center gap-2 hidden md:flex'>
          <div className='flex items-center'>
            <MessagePopover />
            <Notification />
          </div>

          {/* Profile Menu - o'zining ichida skeleton bor */}
          <ProfileMenu scrolled={scrolled} />
        </div>

        <div className='flex items-center gap-4'>
          <div className='md:hidden flex items-center'>
            <motion.button
              onClick={() => setIsNavigationOpen(true)}
              className='text-foreground hover:text-muted-foreground transition-colors'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </div>
      <MobileNavigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />
    </div>
  );
}
