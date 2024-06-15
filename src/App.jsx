import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/others/NotFoundPage';
import { APP_ROUTES, ROUTE_ANY, ROUTE_LOGIN, ROUTE_SIGNUP } from './constants/routes';
import NavBar from './components/common/NavBar';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { lastVisitedRouteAtom } from './recoil/atoms/routeAtoms';
import TimerOverlay from './components/common/TimerOverlay';
import PreviousPageButton from './components/common/PreviousPageButton';

function App() {
  const location = useLocation();
  const [lastVisitedRoutes, setLastVisitedRoutes] = useRecoilState(lastVisitedRouteAtom);
  console.log(lastVisitedRoutes);

  const outsideAppRoutes = [ROUTE_SIGNUP, ROUTE_LOGIN];
  const insideApp = !outsideAppRoutes.includes(location.pathname);

  // updates the track of last visited routes
  useEffect(() => {
    const currentRoute = `${location.pathname}${location.search}`;
    const routeKeys = Object.keys(lastVisitedRoutes);

    routeKeys.forEach((route) => {
      if (currentRoute.startsWith(route)) {
        setLastVisitedRoutes((prevRoutes) => ({
          ...prevRoutes,
          [route]: currentRoute
        }));
      }
    });

  }, [location.pathname, location.search]);

  return (
    <div className='font-mukta bg-black text-white'>
      {insideApp && <NavBar />}
      {!Object.keys(lastVisitedRoutes).includes(location.pathname) && <PreviousPageButton />}
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route path={route.path} element={<route.element />} key={route.id} />
        ))}
        <Route path={ROUTE_ANY} element={<NotFoundPage />} />
      </Routes>
      {insideApp && <TimerOverlay />}
    </div>
  )
}

export default App;