export const ROUTES = {
  PUBLIC: {
    HOME: '/',
  },
  PROTECTED: {
    HOME: '/app',
    INVOICE_LIST_PAGE: '/app/project/:projectId',
    CREATE_INVOICE_PAGE: '/app/project/:projectId/invoice/create',
  },
} as const;
