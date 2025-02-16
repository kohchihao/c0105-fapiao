import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { saveInvoice, SaveInvoiceParams } from '../../../../services/invoice';
import queryClient from '../../../../utils/reactQuery';

type UseSaveInvoiceParams = {
  invoiceId?: number;
  onSuccessNavigate?: (params: {
    project_id: number;
    invoice_id: number;
  }) => void;
  hideLoading?: () => void;
};

const useSaveInvoice = (options: UseSaveInvoiceParams) => {
  const { invoiceId, onSuccessNavigate, hideLoading } = options;
  return useMutation({
    mutationFn: (params: SaveInvoiceParams) => saveInvoice(params),
    onSuccess: (data) => {
      if (invoiceId) {
        hideLoading?.();
        queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] });
        return;
      }

      onSuccessNavigate?.({
        project_id: data.project_id,
        invoice_id: data.id,
      });
    },
    onError: (error) => {
      hideLoading?.();
      notifications.show({
        color: 'red',
        title: 'Error saving invoice',
        message: error.message,
      });
    },
  });
};

export default useSaveInvoice;
