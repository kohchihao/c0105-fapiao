import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAppNavigation from '../../../../hooks/useAppNavigation';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useSearch } from '../../../../hooks/useSearch';
import useInvoices from '../hooks/useInvoices';

const useInvoiceListPageViewModel = () => {
  const { projectId: paramProjectId } = useParams();
  const { navigateCreateInvoicePage, navigateEditInvoicePage, navigateHome } =
    useAppNavigation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

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

  const results = useSearch(
    invoices,
    ['invoice_sn', 'description'],
    debouncedQuery
  );

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const onClearSearch = () => {
    setQuery('');
  };

  const onCreateInvoice = () => {
    navigateCreateInvoicePage({ projectId: String(projectId) });
  };

  const onClickInvoice = (invoiceId: number) => {
    navigateEditInvoicePage({
      projectId: String(projectId),
      invoiceId: String(invoiceId),
    });
  };

  const onBackClick = () => {
    navigateHome({});
  };

  return {
    invoices: results,
    isError,
    isLoading,
    onCreateInvoice,
    onClickInvoice,
    onBackClick,
    onSearchChange,
    onClearSearch,
    query,
  };
};

export default useInvoiceListPageViewModel;
