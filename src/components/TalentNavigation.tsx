import { Link, NavLink } from 'react-router';
import logo from '@/assets/images/common/logo-dark.svg';
import Notification from './talents/Notification';
import ProfileMenu from './talents/ProfileMenu';
import MessagePopover from '../features/messages/components/MessagePopover';
import { useAuth } from '../context/AuthContext';
import MobileNavigation from './talents/MobileNavigation';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function TalentNavigation() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className='sticky bg-white text-base h-[55px] border z-50 top-0'>
      <div className='section-container h-full'>
        <div className='flex h-full items-center justify-between'>
          <Link className='sm:hidden' to={'/talent'}>
            <img className='w-[70px]' src={logo} alt='img' />
          </Link>
          <div className='hidden md:flex h-full items-center'>
            <nav className='flex gap-7'>
              <img className='w-[70px]' src={logo} alt='img' />

              <NavLink className={'hover:text-v9'} to={'/talent'}>
                {user?.role === 'client' ? 'Freelancers' : 'Clients'}
              </NavLink>

              <NavLink className={'hover:text-v9'} to={'/order'}>
                Orders
              </NavLink>

              {user?.role === 'client' ? (
                <NavLink
                  className={'hover:text-v9'}
                  to={'/dashboard/my-projects'}
                >
                  My projects
                </NavLink>
              ) : (
                <NavLink
                  className={'hover:text-v9'}
                  to={'/dashboard/portfolio'}
                >
                  My Portfolio
                </NavLink>
              )}
              <NavLink className={'hover:text-v9'} to={'/dashboard/analytics'}>
                Analytics
              </NavLink>
            </nav>
          </div>

          <div className='flex items-center gap-4'>
            <div className='sm:hidden flex items-center'>
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

            <div className='hidden sm:flex gap-3'>
              <div className='flex items-center gap-1'>
                <MessagePopover />
                <Notification />
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>

      <MobileNavigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />
    </header>
  );
}
