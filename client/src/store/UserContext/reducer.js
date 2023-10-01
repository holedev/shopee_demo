import cookie from 'react-cookies';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'login':
      const { user } = payload;
      return user;

    case 'logout':
      return null;

    default:
      return state;
  }
};
