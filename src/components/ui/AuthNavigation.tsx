import { ArrowLeft } from 'lucide-react';
import Logo from '../Logo';
import { useLocation, useNavigate } from 'react-router';
import { cn } from '../../lib/utils';
import { Button } from './button';

type Props = {
  className?: string;
};

export default function AuthNavigation({ className }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  console.log(pathname);
  return (
    <header className='bg-white sticky z-100 top-0 border-b'>
      <div className='section-container'>
        <nav
          className={cn('flex py-3 items-center justify-between', className)}
        >
          {pathname === '/talent' ? (
            <Button className='sm:text-lg h-12 px-4 rounded-xl cursor-pointer'>
              Profile
            </Button>
          ) : (
            <ArrowLeft onClick={goBack} className='size-9 cursor-pointer' />
          )}
          <Logo />
        </nav>
      </div>
    </header>
  );
}
