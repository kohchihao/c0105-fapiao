import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInvoices from '../hooks/useInvoices';

const useInvoiceListPageViewModel = () => {
  const navigate = useNavigate();
  const { projectId: paramProjectId } = useParams();

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
    navigate(`/app/project/${projectId}/invoice/create`);
  };

  const onClickInvoice = (invoiceId: number) => {
    navigate(`/app/project/${projectId}/invoice/${invoiceId}/edit`);
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
