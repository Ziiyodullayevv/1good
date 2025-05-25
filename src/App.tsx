// App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  );
}
