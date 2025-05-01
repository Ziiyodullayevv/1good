import { Outlet } from 'react-router';
import AuthNavigation from '../components/ui/AuthNavigation';

export default function AuthLayout() {
  return (
    <>
      <AuthNavigation />

      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet />
      </main>
    </>
  );
}
