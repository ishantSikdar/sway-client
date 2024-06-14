import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/others/NotFoundPage';
import { APP_ROUTES, ROUTE_ANY, ROUTE_LOGIN, ROUTE_SIGNUP } from './constants/routes';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { timerDataAtom, timerFlagsAtom } from './recoil/atoms/timerAtoms';

function App() {
  const location = useLocation();
  const noNavBarRoutes = [ROUTE_SIGNUP, ROUTE_LOGIN];
  const navBarRequired = !noNavBarRoutes.includes(location.pathname);

  const [timerData, setTimerData] = useRecoilState(timerDataAtom);
  const [timerFlags, setTimerFlags] = useRecoilState(timerFlagsAtom);
  
  useEffect(() => {
    const timeElapsedInterval = setInterval(() => {
      if (timerFlags.playing) {
        setTimerData((prevData) => ({
          ...prevData,
          timeElapsed: prevData.timeElapsed + 1,
          recentFocus: prevData.recentFocus + 1,
        }));
      }
    }, 1 * 1000);

    setTimerData((prevData) => ({
      ...prevData,
      completionPercent: (timerData.timeElapsed / timerData.goalTimeSeconds) * 100,
    }))

    return () => {
      clearInterval(timeElapsedInterval);
    };
  }, [timerFlags.playing, timerData.goalTimeSeconds, timerData.timeElapsed]);


  useEffect(() => {
    const breakTimeElapsedInterval = setInterval(() => {
      if (!timerFlags.playing && timerFlags.timeElapsed > 0) {
        setTimerData((prevData) => ({
          ...prevData,
          breakSecondsElapsed: prevData.breakSecondsElapsed + 1,
        }));
      }
    }, 1 * 1000);

    if (timerData.timeElapsed >= timerData.goalTimeSeconds) {
      clearInterval(breakTimeElapsedInterval);
    }

    return () => {
      clearInterval(breakTimeElapsedInterval);
    }

  }, [timerData.breaks, timerData.breakSecondsElapsed]);


  useEffect(() => {
    let showStopInterval;

    if (timerFlags.showStop) {

      showStopInterval = setInterval(() => {
        if (timerData.showStopDuration <= 1) {
          setTimerData((prevData) => ({
            ...prevData,
            showStopDuration: 15
          }));

          setTimerFlags((prevFlag) => ({
            ...prevFlag,
            showStop: false,
          }));

          clearInterval(showStopInterval);

        } else {
          setTimerData((prevData) => ({
            ...prevData,
            showStopDuration: prevData.showStopDuration - 1,
          }));

        }
      }, 1 * 1000);
    }

    return () => {
      clearInterval(showStopInterval);
    }
  }, [timerFlags.showStop, timerData.showStopDuration]);



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