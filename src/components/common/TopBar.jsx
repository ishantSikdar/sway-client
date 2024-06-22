import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { trimRouteDescending } from "../../utils/pageUtil";
import SearchTextBox from "./SearchTextBox";
import { ROUTE_PLAYLIST, ROUTE_USER_PAGE } from "../../constants/routes";
import { useSetRecoilState } from "recoil";
import { playlistSubjectSearchTagAtom } from "../../recoil/atoms/playlistAtoms";

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const setSearchTag = useSetRecoilState(playlistSubjectSearchTagAtom);

  const goToPrevious = () => {
    const prevRoute = trimRouteDescending(location.pathname);
    navigate(prevRoute);
  }

  const handleSearchTagInput = (event) => {
    setSearchTag(event.target.value);
  }

  return (
    <div
      className={`z-40 fixed h-12 w-full bg-gray border-b-[0.5pt] border-light-gray text-xl flex flex-row-reverse justify-between items-center transition-opacity duration-300`}
    >
      <button onClick={() => navigate(ROUTE_USER_PAGE)} className="aspect-square rounded-full border-[1pt] border-light-gray px-2 mx-2">
        <FontAwesomeIcon icon={faUser} />
      </button>

      {location.pathname === ROUTE_PLAYLIST && <SearchTextBox handleInput={handleSearchTagInput} />}

      {location.pathname.includes(`${ROUTE_PLAYLIST}/`) && <button onClick={goToPrevious} className="h-full aspect-square border-light-gray border-r-[0.1pt]">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>}

    </div>
  )
}
