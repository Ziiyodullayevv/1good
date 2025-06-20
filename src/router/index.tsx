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
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'my-projects',
        element: <div>A1</div>,
      },
      {
        path: 'analytics',
        element: <div>A2</div>,
      },
      {
        path: 'messages',
        element: <div>A3</div>,
      },
      {
        path: 'contracts',
        element: <div>A4</div>,
      },
      {
        path: 'settings',
        element: <div>A5</div>,
      },
    ],
  },
]);
