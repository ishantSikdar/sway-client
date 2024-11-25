import { faAngleRight, faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { trimRouteDescending } from "../../utils/pageUtil";
import SearchTextBox from "./SearchTextBox";
import { ROUTE_GROUPS, ROUTE_PLAYLIST, ROUTE_USER_PAGE } from "../../constants/routes";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { playlistSubjectSearchTagAtom } from "../../recoil/atoms/playlistAtoms";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";
import { communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms";
import UserProfilePicture from "../user/UserProfilePicture";

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [communityUIElements, setCommunityUIElements] = useRecoilState(communityUserInterfaceAtom);
  const setSearchTag = useSetRecoilState(playlistSubjectSearchTagAtom);
  const userDetailsLoadable = useRecoilValueLoadable(userDetailsAtom);

  const goToPrevious = () => {
    const prevRoute = trimRouteDescending(location.pathname);
    navigate(prevRoute);
  }

  const handleSearchTagInput = (event) => {
    setSearchTag(event.target.value);
  }

  const toggleCommunitySidebar = () => {
    setCommunityUIElements((prev) => ({
      ...prev,
      sideBarWidth: prev.sideBarWidth === 0 ? 60 : 0,
    }));
  }

  return (
    <div
      className={`z-40 shadow-md fixed h-12 w-full bg-dark-blue text-xl flex flex-row-reverse justify-between items-center transition-opacity duration-300`}
    >
      <button onClick={() => navigate(ROUTE_USER_PAGE)} className="h-10 w-10 rounded-full overflow-hidden border-[1pt] border-light-gray mr-2">
        {userDetailsLoadable.state === 'hasValue' ?
        <UserProfilePicture imageUrl={userDetailsLoadable.contents.photoUrl} name={userDetailsLoadable.contents.name} size={20} />
          :
          <FontAwesomeIcon icon={faUser} />}
      </button>

      {location.pathname === ROUTE_PLAYLIST && <SearchTextBox handleInput={handleSearchTagInput} />}

      {location.pathname.includes(`${ROUTE_PLAYLIST}` || `${ROUTE_PLAYLIST}-ai`) && <button onClick={goToPrevious} className="h-full aspect-square border-light-gray border-r-[0.1pt]">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>}

      {location.pathname.includes(ROUTE_GROUPS) && <button onClick={toggleCommunitySidebar} className="h-full aspect-square ">
        <FontAwesomeIcon
          icon={faAngleRight}
          className={`transform transition-transform duration-300 ${communityUIElements.sideBarWidth === 0 ? '' : 'rotate-180'}`}
        />
      </button>}
    </div>
  )
}
