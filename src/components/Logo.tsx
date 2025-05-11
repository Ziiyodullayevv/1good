import { Link } from 'react-router';

export default function Logo({ dark }: { dark?: string }) {
  return (
    <Link to={'/'}>
      {dark === 'dark' ? (
        <img className='w-[90px]' src='logo-white.svg' alt='logo' />
      ) : (
        <img className='w-[90px]' src='logo-dark.svg' alt='logo' />
      )}
    </Link>
  );
}
