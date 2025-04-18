import { NavLink } from 'react-router';
import { Button } from './ui/button';
import Logo from './Logo';

export default function MainNavigation() {
  return (
    <header className='section-container'>
      <div className='flex justify-between py-5 items-center'>
        <Logo />

        <nav>
          <ul className='flex items-center text-xl gap-20'>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
                }
                to={'/about'}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
                }
                to={'/services'}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-v2 inline-block leading-[44px] rounded-lg h-[44px] px-3'
                    : 'h-[44px] px-3'
                }
                to={'/usecases'}
              >
                Use Cases
              </NavLink>
            </li>
          </ul>
        </nav>

        <Button className='h-[60px] rounded-xl text-xl px-5 cursor-pointer'>
          Login / Sign Up
        </Button>
      </div>
    </header>
  );
}
