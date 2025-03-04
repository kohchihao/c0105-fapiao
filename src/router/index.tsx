import { createBrowserRouter } from 'react-router-dom';

import Providers from '../Providers.tsx';

import { ROUTES } from '../constants/index.ts';
import NotFoundPage from '../pages/NotFoundPage/index.tsx';
import CreateInvoicePage from '../pages/protected/CreateInvoicePage/index.tsx';
import ProtectedHomePage from '../pages/protected/HomePage/index.tsx';
import InvoiceListPage from '../pages/protected/InvoiceListPage/index.tsx';
import SettingsPage from '../pages/protected/SettingsPage/index.tsx';
import HomePage from '../pages/public/HomePage/index.tsx';
import AuthenticatedLayout from './AuthenticatedLayout.tsx';
import PublicLayout from './PublicLayout.tsx';

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: ROUTES.HOME,
    element: <Providers />,
    children: [
      // Public routes
      {
        path: ROUTES.LOGIN,
        element: <PublicLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <HomePage />,
          },
        ],
      },

      // Auth Protected routes
      {
        path: ROUTES.HOME,
        element: <AuthenticatedLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <ProtectedHomePage />,
          },
          {
            path: ROUTES.INVOICE_LIST_PAGE,
            element: <InvoiceListPage />,
          },
          {
            path: ROUTES.CREATE_INVOICE_PAGE,
            element: <CreateInvoicePage />,
          },
          {
            path: ROUTES.EDIT_INVOICE_PAGE,
            element: <CreateInvoicePage />,
          },
          {
            path: ROUTES.SETTINGS_PAGE,
            element: <SettingsPage />,
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
