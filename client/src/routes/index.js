import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Store from '~/pages/Store';

export const publicRouter = [{ path: '/auth', component: Login, layout: null }];

export const privateRouter = [
  { path: '/', component: Home, layout: 'Default' },
  { path: '/store/:id', component: Store, layout: 'Default' },
];
