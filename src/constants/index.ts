export const ROUTES = {
  PUBLIC: {
    HOME: '/',
  },
  PROTECTED: {
    HOME: '/app',
    INVOICE_LIST_PAGE: '/app/project/:projectId',
    CREATE_INVOICE_PAGE: '/app/project/:projectId/invoice/create',
    EDIT_INVOICE_PAGE: '/app/project/:projectId/invoice/:invoiceId/edit',
    SETTINGS_PAGE: '/app/settings',
  },
} as const;

export const INFLATE_CURRENCY = 1000;
