import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { cn } from '../lib/utils';
import { Outlet } from 'react-router';
import TopBar from '../components/dashboard/TopBar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const element = document.querySelector('.topbar');
    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 0);
    };

    element.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex relative font-poppins min-h-screen'>
      <Sidebar onClose={() => setIsSidebarOpen(false)} />

      <div
        className={cn(
          'transition-all duration-300 topbar overflow-auto bg-v2',
          isSidebarOpen
            ? 'w-[calc(100%-260px)] top-0 right-0 bottom-0 absolute'
            : 'w-full h-full top-0 right-0 bottom-0 absolute'
        )}
      >
        {/* TopBar  */}
        <TopBar
          scrolled={scrolled}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content */}
        <main className='px-5 pb-5 max-w-[1440px] mx-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
