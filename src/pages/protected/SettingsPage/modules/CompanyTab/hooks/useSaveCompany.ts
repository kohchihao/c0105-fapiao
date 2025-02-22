import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import {
  saveCompany,
  SaveCompanyParams,
} from '../../../../../../services/company';
import queryClient from '../../../../../../utils/reactQuery';

const useSaveCompany = () => {
  return useMutation({
    mutationFn: (params: SaveCompanyParams) => saveCompany(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: 'Error saving company details',
        message: error.message,
      });
    },
  });
};

export default useSaveCompany;
