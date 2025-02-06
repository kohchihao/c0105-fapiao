import { createBrowserRouter } from 'react-router-dom';

import Providers from '../Providers.tsx';
import AuthProtectedRoute from './AuthProtectedRoute.tsx';

import NotFoundPage from '../pages/NotFoundPage/index.tsx';
import ProtectedHomePage from '../pages/protected/HomePage/index.tsx';
import HomePage from '../pages/public/HomePage/index.tsx';

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: '/',
    element: <Providers />,
    children: [
      // Public routes
      {
        path: '/',
        element: <HomePage />,
      },

      // Auth Protected routes
      {
        path: '/',
        element: <AuthProtectedRoute />,
        children: [
          {
            path: '/app',
            element: <ProtectedHomePage />,
            children: [],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
