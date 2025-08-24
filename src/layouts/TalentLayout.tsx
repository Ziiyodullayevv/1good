import { Outlet, useLocation } from 'react-router';
import TalentNavigation from '../components/TalentNavigation';
import TalentFooter from '../components/footers/TalentFooter';

export default function TalentLayout() {
  const { pathname } = useLocation();

  return (
    <div className='text-base font-poppins'>
      <TalentNavigation />

      <main className='min-h-[calc(100vh-200px)]'>
        <Outlet />
      </main>

      {pathname !== '/talent/messages' && <TalentFooter />}
    </div>
  );
}
