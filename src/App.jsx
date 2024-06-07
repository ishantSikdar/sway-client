import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/others/NotFoundPage';
import { APP_ROUTES } from './constants/routes';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route path={route.path} element={<route.element />} key={route.id} />
        ))}
        <Route path={ROUTE_ANY} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
