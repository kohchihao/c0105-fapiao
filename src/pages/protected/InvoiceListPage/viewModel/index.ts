import { useParams } from 'react-router-dom';
import useInvoices from '../hooks/useInvoices';

const useInvoiceListPageViewModel = () => {
  const { projectId } = useParams();
  const {
    data: invoices = [],
    isError,
    isLoading,
  } = useInvoices({
    projectId: isNaN(Number(projectId)) ? 0 : Number(projectId),
  });

  return {
    invoices,
    isError,
    isLoading,
  };
};

export default useInvoiceListPageViewModel;
