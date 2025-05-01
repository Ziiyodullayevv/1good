import { ArrowLeft } from 'lucide-react';
import Logo from '../Logo';
import { useNavigate } from 'react-router';

export default function AuthNavigation() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <header>
      <div className='section-container'>
        <nav className='flex py-5  items-center justify-between'>
          <ArrowLeft onClick={goBack} className='size-9 cursor-pointer' />
          <Logo />
        </nav>
      </div>
    </header>
  );
}
