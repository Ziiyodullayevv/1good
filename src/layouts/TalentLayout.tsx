import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import TalentNavigation from '../components/TalentNavigation';

export default function TalentLayout() {
  return (
    <div className='bg-v7 text-base font-poppins'>
      <TalentNavigation />

      <main className='min-h-[calc(100vh-200px)]'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
