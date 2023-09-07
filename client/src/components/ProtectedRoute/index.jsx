import { useEffect, useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hook';
import cookie from 'react-cookies';

function ProtectedRoute({ children }) {
  const [user, setUser] = useUserContext();
  const nav = useNavigate();

  useEffect(() => {
    if (!user?.id || !cookie.load('token')) {
      return nav('/auth');
    }
  }, []);
  return children;
}

export default ProtectedRoute;
