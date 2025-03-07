import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import {
  createProject,
  CreateProjectParams,
} from '../../../../services/project';
import queryClient from '../../../../utils/reactQuery';

type UseCreateProjectParams = {
  closeModal: () => void;
  resetForm: () => void;
};
const useCreateProject = (params: UseCreateProjectParams) => {
  return useMutation({
    mutationFn: (params: CreateProjectParams) => createProject(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      params.closeModal();
      params.resetForm();
    },
    onError: (error) => {
      params.closeModal();
      params.resetForm();
      notifications.show({
        color: 'red',
        title: 'Error creating new project',
        message: error.message,
      });
    },
  });
};

export default useCreateProject;
