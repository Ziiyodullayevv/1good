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
import Talent from '../components/Talent';
import TalentLayout from '../layouts/TalentLayout';
import TalentProfilePage from '../components/TalentSingle';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
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
      { index: true, element: <Talent /> },
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
    path: '/683575b0-2d3c-8008-918a-8193eae56705',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'a1',
        element: <div>A1</div>,
      },
      {
        path: 'a2',
        element: <div>A2</div>,
      },
      {
        path: 'a3',
        element: <div>A3</div>,
      },
    ],
  },
]);
