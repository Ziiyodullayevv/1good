import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' }); // yoki 'auto'
  }, [pathname]);

  return (
    <>
      <MainNavigation />
      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
