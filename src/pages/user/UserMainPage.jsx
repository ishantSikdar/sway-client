import PHOTO from "/photo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_LOGIN } from "../../constants/routes";
import { getAuthToken } from "../../utils/authUtil";
import { userDetailsSelector } from "../../recoil/selectors/userSelectors";
import { changeRoute } from "../../utils/pageUtil";
import { INVALID_AUTH_TOKEN } from "../../constants/message";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";

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
    const userDetails = userDetailsLoadable.contents;
    return (
      <div className="flex justify-center h-screen">
        <div className="relative my-auto flex flex-col items-center rounded-3xl border-white border-[1pt] p-5">
          <div className="absolute -top-24">
            <img src={PHOTO} className="rounded-full aspect-square overflow-hidden w-40" alt={userDetails?.name} />
            <button className="absolute bottom-3 right-0 rounded-full bg-blue w-10 h-10">
              <FontAwesomeIcon icon={faPenToSquare} className="text-[#FFFFFF]" />
            </button>
          </div>
          <div className="text-center text-4xl mt-16">
            <p>{userDetails?.name}</p>
          </div>

          <div className="flex flex-col gap-3 my-3 text-xl">
            <div>
              <p>Username</p>
              <p>{userDetails?.username}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{userDetails?.email}</p>
            </div>
            <div>
              <p>Mobile</p>
              <p>{userDetails?.mobile}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (userDetailsLoadable.state === "loading") {
    return <div>Loading</div>
  }

  else if (userDetailsLoadable.state === "hasError") {
    if (userDetailsLoadable.contents.message === INVALID_AUTH_TOKEN) {
      changeRoute(navigate, ROUTE_LOGIN);
      window.location.reload();
    }
    return <div>{userDetailsLoadable.contents.message}</div>
  }

  else {
    return <></>;
  }
}