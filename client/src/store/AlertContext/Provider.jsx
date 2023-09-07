import { useState, useEffect, useReducer } from 'react';
import { Context } from './Context';

function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  return (
    <Context.Provider value={[alert, setAlert]}>{children}</Context.Provider>
  );
}

export default AlertProvider;
