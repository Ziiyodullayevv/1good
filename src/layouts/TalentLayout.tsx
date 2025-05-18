import { Outlet } from 'react-router';
import AuthNavigation from '../components/ui/AuthNavigation';
import Footer from '../components/Footer';

export default function TalentLayout() {
  return (
    <div className='bg-v2'>
      <AuthNavigation className='flex-row-reverse' />

      <main className='min-h-[calc(100vh-200px)]'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
