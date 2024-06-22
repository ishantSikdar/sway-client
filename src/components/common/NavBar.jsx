import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faClock, faPlay, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ROUTE_COURSES, ROUTE_FOCUS_TIMER, ROUTE_GROUPS, ROUTE_PLAYLIST, ROUTE_SHORTS } from '../../constants/routes';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { lastVisitedRouteAtom } from '../../recoil/atoms/routeAtoms';

export default function NavBar() {
  const navigate = useNavigate();
  const lastVisitedRoutes = useRecoilValue(lastVisitedRouteAtom);

  return (
    <div className="z-50 fixed bottom-0 text-white bg-gray w-full px-4 h-14 border-t-[0.5pt] border-light-gray text-xl flex justify-between items-center">
      <div className="flex justify-around w-full">
        <button onClick={() => navigate(lastVisitedRoutes[ROUTE_FOCUS_TIMER])}>
          <FontAwesomeIcon icon={faClock} />
        </button>

        <button onClick={() => navigate(lastVisitedRoutes[ROUTE_COURSES])}>
          <FontAwesomeIcon icon={faBookBookmark} />
        </button>

        <button onClick={() => navigate(lastVisitedRoutes[ROUTE_PLAYLIST])}>
          <FontAwesomeIcon icon={faYoutube} />
        </button>
        
        <button onClick={() => navigate(lastVisitedRoutes[ROUTE_SHORTS])}>
          <FontAwesomeIcon icon={faPlay} />
        </button>

        <button onClick={() => navigate(lastVisitedRoutes[ROUTE_GROUPS])}>
          <FontAwesomeIcon icon={faComments} />
        </button>
      </div>
    </div>
  )
}