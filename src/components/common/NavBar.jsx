import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookBookmark, faClock, faPlay, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import { changeRoute } from '../../utils/pageUtil';
import { ROUTE_COURSES, ROUTE_FOCUS_TIMER, ROUTE_GROUPS, ROUTE_PLAYLIST, ROUTE_SHORTS, ROUTE_USER_PAGE } from '../../constants/routes';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="z-50 fixed top-0 text-frostWhite bg-black opacity-90 w-full px-4 h-16 shadow-md text-3xl flex justify-between items-center">
      <div className="flex gap-5">
        <button onClick={() => changeRoute(navigate, ROUTE_USER_PAGE)}>
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button onClick={() => changeRoute(navigate, ROUTE_FOCUS_TIMER)}>
          <FontAwesomeIcon icon={faClock} />
        </button>
      </div>

      <div className="flex gap-5">
        <button onClick={() => changeRoute(navigate, ROUTE_PLAYLIST)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button onClick={() => changeRoute(navigate, ROUTE_COURSES)}>
          <FontAwesomeIcon icon={faBookBookmark} />
        </button>
        <button onClick={() => changeRoute(navigate, ROUTE_SHORTS)}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={() => changeRoute(navigate, ROUTE_GROUPS)}>
          <FontAwesomeIcon icon={faComments} />
        </button>
      </div>
    </div>
  )
}