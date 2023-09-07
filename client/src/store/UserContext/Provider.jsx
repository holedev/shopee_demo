import { useState, useEffect, useReducer } from 'react';
import { UserContext } from './Context';
import { getAuth } from 'firebase/auth';
import reducer from './reducer';
import cookie from 'react-cookies';

function UserProvider({ children }) {
  const auth = getAuth();

  const [user, dispatch] = useReducer(reducer, cookie.load('user') || null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (!user?.uid) {
        console.log('Auth Success!');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
