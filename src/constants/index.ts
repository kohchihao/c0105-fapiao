export const ROUTES = {
  PUBLIC: {
    HOME: '/',
  },
  PROTECTED: {
    HOME: '/app',
    INVOICE_LIST_PAGE: '/app/project/:projectId',
  },
} as const;
