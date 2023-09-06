import { useEffect, useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hook';

function ProtectedRoute({ children }) {
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid') || null;
    if (!uid) {
      navigate('/auth');
    }
  }, [user?.uid]);
  return children;
}

export default ProtectedRoute;
