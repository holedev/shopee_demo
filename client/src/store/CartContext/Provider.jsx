import { useState, useEffect, useReducer } from 'react';
import { Context } from './Context';
import { getAuth } from 'firebase/auth';
import reducer from './reducer';
import cookie from 'react-cookies';

function CartProvider({ children }) {
  const countCart = () => {
    let cart = cookie.load('cart') || null;
    if (cart !== null)
      return Object.values(cart).reduce(
        (init, current) => init + current['quantity'],
        0
      );
    return 0;
  };

  const [cart, dispatch] = useReducer(reducer, countCart());
  return (
    <Context.Provider value={[cart, dispatch]}>{children}</Context.Provider>
  );
}

export default CartProvider;
