import { createBrowserRouter } from 'react-router-dom';

import Providers from '../Providers.tsx';
import AuthProtectedRoute from './AuthProtectedRoute.tsx';

import { ROUTES } from '../constants/index.ts';
import NotFoundPage from '../pages/NotFoundPage/index.tsx';
import CreateInvoicePage from '../pages/protected/CreateInvoicePage/index.tsx';
import ProtectedHomePage from '../pages/protected/HomePage/index.tsx';
import InvoiceListPage from '../pages/protected/InvoiceListPage/index.tsx';
import HomePage from '../pages/public/HomePage/index.tsx';

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: ROUTES.PUBLIC.HOME,
    element: <Providers />,
    children: [
      // Public routes
      {
        path: ROUTES.PUBLIC.HOME,
        element: <HomePage />,
      },

      // Auth Protected routes
      {
        path: ROUTES.PUBLIC.HOME,
        element: <AuthProtectedRoute />,
        children: [
          {
            path: ROUTES.PROTECTED.HOME,
            element: <ProtectedHomePage />,
          },
          {
            path: ROUTES.PROTECTED.INVOICE_LIST_PAGE,
            element: <InvoiceListPage />,
          },
          {
            path: ROUTES.PROTECTED.CREATE_INVOICE_PAGE,
            element: <CreateInvoicePage />,
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
