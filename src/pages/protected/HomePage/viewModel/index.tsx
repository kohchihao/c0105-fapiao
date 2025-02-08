import useProjects from '../hooks/useProjects';
import useCreateProjectModal from './useCreateProjectModal';

const useHomePageViewModel = () => {
  const { data: projects = [], isError, isLoading } = useProjects();
  const createProjectModal = useCreateProjectModal();

  return {
    projects,
    isError,
    isLoading,
    createProjectModal,
  };
};

export default useHomePageViewModel;
