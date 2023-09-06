import { useState, useEffect } from 'react';
import { UserContext } from './Context';
import { getAuth } from 'firebase/auth';
import { useUserContext } from '../../hook';
import { useNavigate } from 'react-router-dom';

function UserProvider({ children }) {
  const auth = getAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      setUser(user);
      localStorage.setItem('uid', JSON.stringify(user?.uid));
      if (!user?.uid) {
        setUser(null);
        localStorage.removeItem('uid');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
