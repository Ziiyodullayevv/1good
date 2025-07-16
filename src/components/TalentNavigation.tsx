import { Link, NavLink } from 'react-router';
import logo from '@/assets/images/common/logo-dark.svg';
import Notification from './talents/Notification';
import MobileNavigation from './talents/MobileNavigation';

export default function TalentNavigation() {
  return (
    <header className='sticky bg-white text-base h-[55px] border z-50 top-0'>
      <div className='section-container h-full'>
        <div className='flex h-full items-center justify-between'>
          <div className='md:hidden block'>
            <MobileNavigation />
          </div>
          <div className='hidden md:flex h-full items-center'>
            <nav className='flex gap-7'>
              <img className='w-[70px]' src={logo} alt='img' />
              <NavLink className={'hover:text-v9'} to={'/order'}>
                Find work
              </NavLink>
              <NavLink
                className={'hover:text-v9'}
                to={'/dashboard/my-projects'}
              >
                My projects
              </NavLink>
              <NavLink className={'hover:text-v9'} to={'/dashboard/analytics'}>
                Analytics
              </NavLink>
              <NavLink className={'hover:text-v9'} to={'/dashboard/messages'}>
                Messages
              </NavLink>
            </nav>
          </div>

          <div className='flex gap-3 items-center'>
            <Notification />

            <Link to={'/dashboard'}>
              <div className='h-[38px] bg-v2 w-[38px] overflow-hidden rounded-full'>
                <img
                  className='w-full'
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s'
                  alt='avatar'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
