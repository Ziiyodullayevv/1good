// App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/sonner.tsx';
import {router} from "@/routes";

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster theme='light' richColors position='top-right' />
    </HelmetProvider>
  );
}
