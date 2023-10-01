import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import { privateRouter, publicRouter } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './store/UserContext';
import Header from './components/Header';
import CartProvider from './store/CartContext';
import ChatRoom from './components/ChatRoom';
import LoadingProvider from './store/LoadingContext';
import Loading from './components/Loading';

function App() {
  return (
    <Router>
      <div className='App'>
        <LoadingProvider>
          <CartProvider>
            <UserProvider>
              <Header />
              <Loading />
              <ChatRoom />
              <div className='body'>
                <Routes>
                  {privateRouter.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <ProtectedRoute>
                            <Page />
                          </ProtectedRoute>
                        }
                      />
                    );
                  })}
                  {publicRouter.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route key={index} path={route.path} element={<Page />} />
                    );
                  })}
                  <Route path='*' element={<Error />} />
                </Routes>
              </div>
            </UserProvider>
          </CartProvider>
        </LoadingProvider>
      </div>
    </Router>
  );
}

export default App;
