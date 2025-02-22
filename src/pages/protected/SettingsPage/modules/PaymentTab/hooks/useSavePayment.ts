import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import {
  savePayment,
  SavePaymentParams,
} from '../../../../../../services/paymentOption';
import queryClient from '../../../../../../utils/reactQuery';

const useSavePayment = () => {
  return useMutation({
    mutationFn: (params: SavePaymentParams) => savePayment(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment'] });
    },
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: 'Error saving payment details',
        message: error.message,
      });
    },
  });
};

export default useSavePayment;
