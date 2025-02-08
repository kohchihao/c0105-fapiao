import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import queryClient from './utils/reactQuery';

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Outlet />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
