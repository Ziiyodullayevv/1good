import { Outlet } from 'react-router';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <>
      {/* <MainNavigation /> */}
      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
