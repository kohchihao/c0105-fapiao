import useAppNavigation from '../../../../hooks/useAppNavigation';
import useProjects from '../hooks/useProjects';
import useCreateProjectModal from './useCreateProjectModal';

const useHomePageViewModel = () => {
  const { data: projects = [], isError, isLoading } = useProjects();
  const createProjectModal = useCreateProjectModal();
  const { navigateInvoiceListPage } = useAppNavigation();

  const onProjectClick = (projectId: number) => {
    navigateInvoiceListPage({ projectId: String(projectId) });
  };

  return {
    projects,
    isError,
    isLoading,
    createProjectModal,
    onProjectClick,
  };
};

export default useHomePageViewModel;
