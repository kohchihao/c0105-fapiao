import { useQuery } from '@tanstack/react-query';
import { getPayment } from '../services/paymentOption';

const usePayment = () => {
  return useQuery({
    queryKey: ['payment'],
    queryFn: getPayment,
  });
};

export default usePayment;
