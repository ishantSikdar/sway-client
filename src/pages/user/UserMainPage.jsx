import PHOTO from "/photo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_LOGIN } from "../../constants/routes";
import { getAuthToken } from "../../utils/authUtil";
import { changeRoute } from "../../utils/pageUtil";
import { INVALID_AUTH_TOKEN, NO_AUTH_TOKEN } from "../../constants/message";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";
import UserPageData from "./UserPageData";
import UserPageSkeleton from "./UserPageSkeleton";

export default function UserMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsLoadable = useRecoilValueLoadable(userDetailsAtom);

  useEffect(() => {
    if (!getAuthToken) {
      navigate(ROUTE_LOGIN, { state: { from: location } });
    }
  }, [navigate, location]);

  if (userDetailsLoadable.state === "hasValue") {
    return <UserPageData />;
  }

  else if (userDetailsLoadable.state === "loading") {
    return <UserPageSkeleton />
  }

  else if (userDetailsLoadable.state === "hasError") {
    if (userDetailsLoadable.contents.message === INVALID_AUTH_TOKEN || userDetailsLoadable.contents.message === NO_AUTH_TOKEN) {
      changeRoute(navigate, ROUTE_LOGIN);
      window.location.reload();
    }
    return <div>{userDetailsLoadable.contents.message}</div>
  }

  else {
    return <></>;
  }
}