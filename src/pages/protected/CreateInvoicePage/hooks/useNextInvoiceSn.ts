import { useQuery } from '@tanstack/react-query';
import { getNextInvoiceSn } from '../../../../services/invoice';

type UseNextInvoiceSnParams = {
  projectId: number;
  invoiceId?: number;
};

const useNextInvoiceSn = ({ projectId, invoiceId }: UseNextInvoiceSnParams) => {
  return useQuery({
    queryKey: ['invoice_sn'],
    queryFn: () => getNextInvoiceSn({ projectId }),
    enabled: !invoiceId,
  });
};

export default useNextInvoiceSn;
