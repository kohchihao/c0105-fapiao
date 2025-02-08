import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../../../services/project';

const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};

export default useProjects;
