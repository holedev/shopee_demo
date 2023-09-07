import cookie from 'react-cookies';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'login':
      const { token, ...user } = payload;
      cookie.save('user', user.user);
      cookie.save('token', token);
      return user.user;

    case 'logout':
      cookie.remove('user');
      cookie.remove('token');
      return null;

    default:
      return state;
  }
};
