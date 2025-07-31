import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import About from '../pages/About';
import Services from '../pages/Services';
import UseCases from '../pages/UseCases';
import Home from '../pages/Home';
import TalentLayout from '../layouts/TalentLayout';
import TalentProfilePage from '../components/talents/TalentSingle';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import TalentPage from '../pages/TalentPage';
import MyProjects from '../components/dashboard/MyProjects';
import Contracts from '../components/dashboard/Contracts';
import Settings from '../components/dashboard/Settings';
import Analytics from '../components/dashboard/Analytics';
import Messages from '../components/dashboard/Messages';
import CreditsPage from '../pages/CreditsPage';
import OrderPage from '../pages/OrderPage';
import OrderSinglePage from '../pages/OrderSinglePage';
import OrderLayout from '../layouts/OrderLayout';
import Portfolio from '../components/dashboard/Portfolio';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'about', element: <About /> },
          { path: 'services', element: <Services /> },
          { path: 'usecases', element: <UseCases /> },
        ],
      },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'portfolio', element: <Portfolio /> },
          { path: 'my-projects', element: <MyProjects /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'messages', element: <Messages /> },
          { path: 'contracts', element: <Contracts /> },
          { path: 'credits', element: <CreditsPage /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: '/order',
        element: <OrderLayout />,
        children: [
          { index: true, element: <OrderPage /> },
          { path: ':slug', element: <OrderSinglePage /> },
        ],
      },
      {
        path: '/talent',
        element: <TalentLayout />,
        children: [
          { index: true, element: <TalentPage /> },
          { path: ':slug', element: <TalentProfilePage /> },
        ],
      },
    ],
  },
]);
