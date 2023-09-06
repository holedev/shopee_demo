import Login from '../pages/Login';
import Home from '../pages/Home';

export const publicRouter = [{ path: '/auth', component: Login, layout: null }];

export const privateRouter = [
  { path: '/', component: Home, layout: 'Default' },
];
