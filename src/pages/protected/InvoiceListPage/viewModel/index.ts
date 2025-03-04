import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useAppNavigation from '../../../../hooks/useAppNavigation';
import useInvoices from '../hooks/useInvoices';

const useInvoiceListPageViewModel = () => {
  const { projectId: paramProjectId } = useParams();
  const { navigateCreateInvoicePage, navigateEditInvoicePage } =
    useAppNavigation();

  const projectId = useMemo(() => {
    return isNaN(Number(paramProjectId)) ? 0 : Number(paramProjectId);
  }, [paramProjectId]);

  const {
    data: invoices = [],
    isError,
    isLoading,
  } = useInvoices({
    projectId,
  });

  const onCreateInvoice = () => {
    navigateCreateInvoicePage({ projectId: String(projectId) });
  };

  const onClickInvoice = (invoiceId: number) => {
    navigateEditInvoicePage({
      projectId: String(projectId),
      invoiceId: String(invoiceId),
    });
  };

  return {
    invoices,
    isError,
    isLoading,
    onCreateInvoice,
    onClickInvoice,
  };
};

export default useInvoiceListPageViewModel;
