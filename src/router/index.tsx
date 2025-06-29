import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import About from '../pages/About';
import Services from '../pages/Services';
import UseCases from '../pages/UseCases';
import Home from '../pages/Home';
// import Auth from '../components/Auth';
// import SignIn from '../components/SignIn';
import AuthLayout from '../layouts/AuthLayout';
import ComingSoon from '../components/ComingSoon';
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
// import CreditsLayout from '../layouts/CreditsLayout';
// import ApplyForClient from '../components/credits/ApplyForClient';
import OrderPage from '../pages/OrderPage';
import OrderSinglePage from '../pages/OrderSinglePage';
import OrderLayout from '../layouts/OrderLayout';
// import SignUp from '../components/SignUp';

export const router = createBrowserRouter([
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
  {
    path: '/coming-soon',
    element: <AuthLayout />,
    children: [
      { index: true, element: <ComingSoon /> },
      // {
      //   path: 'signup',
      //   element: <SignUp />,
      // },
      // {
      //   path: 'signin',
      //   element: <SignIn />,
      // },
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
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'my-projects',
        element: <MyProjects />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'contracts',
        element: <Contracts />,
      },
      {
        path: 'credits',
        element: <CreditsPage />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
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
]);
