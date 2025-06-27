import { Outlet } from 'react-router';
import TalentFooter from '../components/footers/TalentFooter';
import TalentNavigation from '../components/TalentNavigation';

export default function CreditsLayout() {
  return (
    <div className='font-poppins'>
      <TalentNavigation />

      <main className='min-h-[calc(100vh-58px)]'>
        <Outlet />
      </main>

      <TalentFooter />
    </div>
  );
}
