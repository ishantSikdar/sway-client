import { useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkLoggedIn, getAuthToken } from "../../utils/authUtil";
import { INVALID_AUTH_TOKEN, NO_AUTH_TOKEN } from "../../constants/message";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";
import UserPageData from "./UserPageData";
import UserPageSkeleton from "./UserPageSkeleton";
import { redirectToLoginPage } from "../../utils/pageUtil";

export default function UserMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsLoadable = useRecoilValueLoadable(userDetailsAtom);

  useEffect(() => {
    if (!checkLoggedIn()) {
      redirectToLoginPage(location, navigate);
    }
  }, [navigate, location]);

  if (userDetailsLoadable.state === "hasValue") {
    return <UserPageData />;
  }

  else if (userDetailsLoadable.state === "loading") {
    return <UserPageSkeleton />
  }

  else if (userDetailsLoadable.state === "hasError") {
    console.log(userDetailsLoadable.contents.message)
    if (userDetailsLoadable.contents.message === INVALID_AUTH_TOKEN || userDetailsLoadable.contents.message === NO_AUTH_TOKEN) {
      redirectToLoginPage(location, navigate);
    }
    return <div>{userDetailsLoadable.contents.message}</div>
  }

  else {
    return <></>;
  }
}