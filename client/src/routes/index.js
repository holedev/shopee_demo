import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Store from '~/pages/Store';
import Product from '~/pages/Product';
import Cart from '~/pages/Cart';
import Stats from '~/pages/Stats';
import Profile from '~/components/Profile';

export const publicRouter = [{ path: '/auth', component: Login, layout: null }];

export const privateRouter = [
  { path: '/', component: Home, layout: 'Default' },
  { path: '/store/:id', component: Store, layout: 'Default' },
  { path: '/products/:id', component: Product, layout: 'Default' },
  { path: '/cart', component: Cart, layout: 'Default' },
  { path: '/stats/:id', component: Stats, layout: 'Default' },
  { path: '/profile/:id', component: Profile, layout: 'Default' },
];
