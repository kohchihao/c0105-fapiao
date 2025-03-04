export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  INVOICE_LIST_PAGE: '/project/:projectId',
  CREATE_INVOICE_PAGE: '/project/:projectId/invoice/create',
  EDIT_INVOICE_PAGE: '/project/:projectId/invoice/:invoiceId/edit',
  SETTINGS_PAGE: '/settings',
} as const;

export const INFLATE_CURRENCY = 1000;
