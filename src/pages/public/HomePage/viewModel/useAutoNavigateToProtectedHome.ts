import { useEffect } from 'react';
import { useSession } from '../../../../context/SessionContext';
import useAppNavigation from '../../../../hooks/useAppNavigation';

/**
 * 1. Automatically navigate to the protected home page if the user is already logged in.
 * 2. Navigate after login is successful.
 */
const useAutoNavigateToProtectedHome = () => {
  const { navigateHome } = useAppNavigation();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    navigateHome({ options: { replace: true } });
  });
};

export default useAutoNavigateToProtectedHome;
