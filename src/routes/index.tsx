import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';

// Layouts - Keep these as regular imports since they're used frequently
import RootLayout from '../layouts/RootLayout';
import TalentLayout from '../layouts/TalentLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import OrderLayout from '../layouts/OrderLayout';

// Route guards
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy load pages and components for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const UseCases = lazy(() => import('../pages/UseCases'));
// FIXED: Import nomi to'g'ri qilindi
const NotFoundPage = lazy(() => import('../pages/NotfoudPage'));

// Dashboard components
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const Portfolio = lazy(() => import('../components/dashboard/Portfolio'));
const MyProjects = lazy(() => import('../components/dashboard/MyProjects'));
const Messages = lazy(() => import('../components/dashboard/Messages'));
const Settings = lazy(() => import('../components/dashboard/Settings'));
const Submission = lazy(() => import('../pages/Submission'));
const SubmissionDetails = lazy(() => import('../pages/SubmissionDetails'));
const ContractPage = lazy(() => import('../pages/ContractPage'));
const ContractDetails = lazy(() => import('../pages/ContractDetails'));
const CreditsPage = lazy(() => import('../pages/CreditsPage'));

// Talent components
const TalentPage = lazy(() => import('../pages/TalentPage'));
const TalentProfilePage = lazy(
  () => import('../components/talents/TalentSingle')
);
const InBoxPage = lazy(() => import('../features/messages/pages/InBoxPage'));

// Order components
const OrderPage = lazy(() => import('../pages/OrderPage'));
const OrderSinglePage = lazy(() => import('../pages/OrderSinglePage'));

// Loading component for Suspense fallback
// eslint-disable-next-line react-refresh/only-export-components
const PageLoader = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
  </div>
);

// Wrapper component for lazy loaded routes
import { ReactNode } from 'react';
import Analytics from '@/components/dashboard/Analytics';

// eslint-disable-next-line react-refresh/only-export-components
const LazyWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <Home />
              </LazyWrapper>
            ),
          },
          {
            path: 'about',
            element: (
              <LazyWrapper>
                <About />
              </LazyWrapper>
            ),
          },
          {
            path: 'services',
            element: (
              <LazyWrapper>
                <Services />
              </LazyWrapper>
            ),
          },
          {
            path: 'usecases',
            element: (
              <LazyWrapper>
                <UseCases />
              </LazyWrapper>
            ),
          },
        ],
      },
    ],
  },

  // Private routes
  {
    element: <PrivateRoute />,
    children: [
      // Dashboard routes
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <DashboardPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'portfolio',
            element: (
              <LazyWrapper>
                <Portfolio />
              </LazyWrapper>
            ),
          },
          {
            path: 'my-projects',
            element: (
              <LazyWrapper>
                <MyProjects />
              </LazyWrapper>
            ),
          },
          {
            path: 'analytics',
            element: (
              <LazyWrapper>
                <Analytics />
              </LazyWrapper>
            ),
          },
          {
            path: 'messages',
            element: (
              <LazyWrapper>
                <Messages />
              </LazyWrapper>
            ),
          },
          {
            path: 'contract',
            element: (
              <LazyWrapper>
                <ContractPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'credits',
            element: (
              <LazyWrapper>
                <CreditsPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'settings',
            element: (
              <LazyWrapper>
                <Settings />
              </LazyWrapper>
            ),
          },
          {
            path: 'submission',
            element: (
              <LazyWrapper>
                <Submission />
              </LazyWrapper>
            ),
          },
          {
            path: 'submission/:submissionSlug',
            element: (
              <LazyWrapper>
                <SubmissionDetails />
              </LazyWrapper>
            ),
          },
          {
            path: 'contract/:contractSlug',
            element: (
              <LazyWrapper>
                <ContractDetails />
              </LazyWrapper>
            ),
          },
          // 404 for dashboard routes
          {
            path: '*',
            element: (
              <LazyWrapper>
                <NotFoundPage />
              </LazyWrapper>
            ),
          },
        ],
      },

      // Order routes
      {
        path: '/order',
        element: <OrderLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <OrderPage />
              </LazyWrapper>
            ),
          },
          {
            path: ':slug',
            element: (
              <LazyWrapper>
                <OrderSinglePage />
              </LazyWrapper>
            ),
          },
          // 404 for order routes
          {
            path: '*',
            element: (
              <LazyWrapper>
                <NotFoundPage />
              </LazyWrapper>
            ),
          },
        ],
      },

      // Talent routes
      {
        path: '/talent',
        element: <TalentLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <TalentPage />
              </LazyWrapper>
            ),
          },
          {
            path: ':slug',
            element: (
              <LazyWrapper>
                <TalentProfilePage />
              </LazyWrapper>
            ),
          },
          {
            path: 'messages',
            element: (
              <LazyWrapper>
                <InBoxPage />
              </LazyWrapper>
            ),
          },
          // 404 for talent routes
          {
            path: '*',
            element: (
              <LazyWrapper>
                <NotFoundPage />
              </LazyWrapper>
            ),
          },
        ],
      },
    ],
  },

  // 404 Not Found route - must be last
  {
    path: '*',
    element: (
      <LazyWrapper>
        <NotFoundPage />
      </LazyWrapper>
    ),
  },
]);
