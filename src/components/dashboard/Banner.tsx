import { useLocation } from 'react-router';
import CreateProject from './CreateProject';
import CreatePortfolio from './CreatePortfolio';

type BannerProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export default function Banner({
  title,
  description,
  buttonText,
}: BannerProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className='min-h-18 px-4 sm:px-8 sm:h-25 justify-between relative flex items-center overflow-hidden'>
      <div>
        <img
          className='w-full left-0 right-0 border-0 top-0 absolute'
          src='/profile-banner.jpg'
          alt='profile banner'
        />

        <div className='relative z-10'>
          {title && (
            <h1 className='text-xl sm:text-2xl font-semibold'>{title}</h1>
          )}
          {description && (
            <p className='text-gray-700 text-xs sm:text-sm'>{description}</p>
          )}
        </div>
      </div>

      {buttonText && (
        <div className='relative z-10'>
          {pathname === '/dashboard/portfolio' ? (
            <CreatePortfolio buttonText={buttonText} />
          ) : pathname === '/dashboard/my-projects' ? (
            <CreateProject buttonText={buttonText} />
          ) : null}
        </div>
      )}
    </div>
  );
}
