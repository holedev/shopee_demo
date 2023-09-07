import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { AlertContext } from '~/store/AlertContext';

function useUserContext() {
  const [user, dispatch] = useContext(UserContext);
  return [user, dispatch];
}

function useAlertContext() {
  const [alert, setAlert] = useContext(AlertContext);
  return [alert, setAlert];
}

export { useUserContext, useAlertContext };
