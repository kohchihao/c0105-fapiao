import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../../../../services/invoice';

type UseInvoicesParams = {
  projectId: number;
};
const useInvoicess = (params: UseInvoicesParams) => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(params),
  });
};

export default useInvoicess;
