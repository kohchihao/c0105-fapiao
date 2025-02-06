import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../../../context/SessionContext';

/**
 * 1. Automatically navigate to the protected home page if the user is already logged in.
 * 2. Navigate after login is successful.
 */
const useAutoNavigateToProtectedHome = () => {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    navigate('/app', { replace: true });
  });
};

export default useAutoNavigateToProtectedHome;
