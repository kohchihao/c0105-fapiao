import { ROUTES } from '../constants';

// Type for all route paths
export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];

// Helper type to extract parameter names from route strings
type ExtractRouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : object;

/**
 * Generates a concrete path by replacing route parameters with values
 * @param route The route pattern with parameters
 * @param params Object containing parameter values
 * @returns The concrete URL path with parameters filled in
 */
export function generatePath<T extends AppRoutePath>(
  route: T,
  params: ExtractRouteParams<T>
): string {
  return Object.entries(params).reduce<string>(
    (path, [key, value]) =>
      path.replace(`:${key}`, encodeURIComponent(String(value))),
    route
  );
}

export const Routes = {
  login: () => ROUTES.LOGIN,
  home: () => ROUTES.HOME,
  invoiceListPage: (projectId: string) =>
    generatePath(ROUTES.INVOICE_LIST_PAGE, { projectId }),
  createInvoicePage: (projectId: string) =>
    generatePath(ROUTES.CREATE_INVOICE_PAGE, { projectId }),
  editInvoicePage: (projectId: string, invoiceId: string) =>
    generatePath(ROUTES.EDIT_INVOICE_PAGE, { projectId, invoiceId }),
  settingsPage: () => ROUTES.SETTINGS_PAGE,
};
