import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { CartContext } from '~/store/CartContext';
import { LoadingContext } from '~/store/LoadingContext';

function useUserContext() {
  const [user, dispatch] = useContext(UserContext);
  return [user, dispatch];
}

function useCartContext() {
  const [cart, dispatch] = useContext(CartContext);
  return [cart, dispatch];
}

function useLoadingContext() {
  const [loading, setLoading] = useContext(LoadingContext);
  return [loading, setLoading];
}

export { useUserContext, useLoadingContext, useCartContext };
