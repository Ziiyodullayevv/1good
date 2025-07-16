import { Outlet } from 'react-router';
import TalentNavigation from '../components/TalentNavigation';
import TalentFooter from '../components/footers/TalentFooter';

export default function TalentLayout() {
  return (
    <div className='text-base font-poppins'>
      <TalentNavigation />

      <main className='min-h-[calc(100vh-200px)]'>
        <Outlet />
      </main>

      <TalentFooter />
    </div>
  );
}
