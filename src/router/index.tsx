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
]);
