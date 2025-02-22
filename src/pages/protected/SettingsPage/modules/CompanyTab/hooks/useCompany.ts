import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../../../../../../services/company';

const useCompany = () => {
  return useQuery({
    queryKey: ['company'],
    queryFn: getCompany,
  });
};

export default useCompany;
