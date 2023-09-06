import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import { privateRouter, publicRouter } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './store/UserContext';
import NoteProvider from './store/NoteContext';

function App() {
  return (
    <Router>
      <div className='App'>
        <UserProvider>
          <NoteProvider>
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
          </NoteProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
