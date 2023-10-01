import cookie from 'react-cookies';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'inc':
      cookie.save('cartCounter', state + payload, { path: '/' });
      return state + payload;
    case 'dec':
      cookie.save('cartCounter', state + payload, { path: '/' });
      return state - payload;
    case 'update':
      cookie.save('cartCounter', payload, { path: '/' });
      return payload;
  }

  return state;
};
