import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/others/NotFoundPage';
import { APP_ROUTES, ROUTE_ANY, ROUTE_LOGIN, ROUTE_SIGNUP } from './constants/routes';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';

function App() {
  const location = useLocation();
  const noNavBarRoutes = [ROUTE_SIGNUP, ROUTE_LOGIN];
  const navBarRequired = !noNavBarRoutes.includes(location.pathname);

  return (
    <div className='font-mukta bg-black text-white'>
      {navBarRequired && <NavBar />}
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route path={route.path} element={<route.element />} key={route.id} />
        ))}
        <Route path={ROUTE_ANY} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;