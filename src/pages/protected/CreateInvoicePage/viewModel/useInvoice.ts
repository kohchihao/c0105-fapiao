import { useQuery } from '@tanstack/react-query';
import { getInvoice } from '../../../../services/invoice';
import { deflateCurrency } from '../../../../utils/currency';

type UseInvoiceParams = {
  invoiceId: number;
};

const useInvoice = ({ invoiceId }: UseInvoiceParams) => {
  console.log('invoiceId', invoiceId);
  return useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoice({ invoiceId }),
    select: (data) => {
      return {
        id: data.id,
        project_id: data.project_id,
        client_company_name: data.client_company_name,
        client_person_in_charge: data.client_person_in_charge,
        address: data.address,
        phone_number: data.phone_number,
        invoice_sn: data.invoice_sn,
        raised_date: new Date(data.raised_date),
        description: data.description,
        comment: data.comment,
        items: data.invoice_item.map((item) => {
          return {
            description: item.description,
            quantity: item.quantity,
            unit_price: deflateCurrency(item.unit_price),
          };
        }),
      };
    },
    enabled: !!invoiceId,
  });
};

export default useInvoice;
