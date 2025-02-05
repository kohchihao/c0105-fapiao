import { Outlet } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import NotFoundPage from '../pages/NotFoundPage';

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    // or you can redirect to a different page and show a message
    return <NotFoundPage />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
