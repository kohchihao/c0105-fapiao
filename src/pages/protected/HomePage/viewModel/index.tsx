import { useState } from 'react';
import useAppNavigation from '../../../../hooks/useAppNavigation';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useSearch } from '../../../../hooks/useSearch';
import useProjects from '../hooks/useProjects';
import useCreateProjectModal from './useCreateProjectModal';

const useHomePageViewModel = () => {
  const { data: projects = [], isError, isLoading } = useProjects();
  const createProjectModal = useCreateProjectModal();
  const { navigateInvoiceListPage } = useAppNavigation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const onProjectClick = (projectId: number) => {
    navigateInvoiceListPage({ projectId: String(projectId) });
  };

  const results = useSearch(projects, ['name'], debouncedQuery);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const onClearSearch = () => {
    setQuery('');
  };

  return {
    results,
    isError,
    isLoading,
    createProjectModal,
    onProjectClick,
    onSearchChange,
    onClearSearch,
    query,
  };
};

export default useHomePageViewModel;
