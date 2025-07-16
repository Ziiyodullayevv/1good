import { Outlet } from 'react-router';
import TalentFooter from '../components/footers/TalentFooter';
import TalentNavigation from '../components/TalentNavigation';

export default function OrderLayout() {
  return (
    <div className='font-poppins'>
      <TalentNavigation />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <TalentFooter />
    </div>
  );
}
