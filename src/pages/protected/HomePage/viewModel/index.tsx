import { useNavigate } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import useCreateProjectModal from './useCreateProjectModal';

const useHomePageViewModel = () => {
  const { data: projects = [], isError, isLoading } = useProjects();
  const createProjectModal = useCreateProjectModal();
  const navigate = useNavigate();

  const onProjectClick = (projectId: number) => {
    navigate(`/app/project/${projectId}`);
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
