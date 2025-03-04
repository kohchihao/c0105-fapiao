import { NavigateOptions, useNavigate } from 'react-router-dom';
import { Routes } from '../utils/navigator';

const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    navigateHome: ({ options }: { options?: NavigateOptions }) =>
      navigate(Routes.home(), options),
    navigateLogin: ({ options }: { options?: NavigateOptions }) =>
      navigate(Routes.login(), options),
    navigateInvoiceListPage: ({
      projectId,
      options,
    }: {
      projectId: string;
      options?: NavigateOptions;
    }) => navigate(Routes.invoiceListPage(projectId), options),
    navigateCreateInvoicePage: ({
      projectId,
      options,
    }: {
      projectId: string;
      options?: NavigateOptions;
    }) => navigate(Routes.createInvoicePage(projectId), options),
    navigateEditInvoicePage: ({
      projectId,
      invoiceId,
      options,
    }: {
      projectId: string;
      invoiceId: string;
      options?: NavigateOptions;
    }) => navigate(Routes.editInvoicePage(projectId, invoiceId), options),
    navigateSettingsPage: ({ options }: { options?: NavigateOptions }) =>
      navigate(Routes.settingsPage(), options),

    navigateTo: (path: string, options?: NavigateOptions) =>
      navigate(path, options),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    refreshPage: () => navigate(0),
  };
};

export default useAppNavigation;
