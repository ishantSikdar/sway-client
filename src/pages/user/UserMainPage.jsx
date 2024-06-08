import PHOTO from "/photo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from "recoil";
import { authStateAtom } from "../../recoil/atoms/authAtoms";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_LOGIN } from "../../constants/routes";

export default function UserMainPage() {

  const authState = useRecoilValue(authStateAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authState.token) {
      navigate(ROUTE_LOGIN, { state: { from: location } });
    }
  }, [authState, navigate, location]);

  const USER = {
    name: "Ishant Sikdar",
    username: "ishantSikdar",
    email: "ishantsikdar9@gmail.com",
    mobile: "9808767545",
    photo: PHOTO
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="relative my-auto flex flex-col items-center rounded-3xl border-white border-[1pt] p-5">
        <div className="absolute -top-24">
          <img src={PHOTO} className="rounded-full aspect-square overflow-hidden w-40" alt={USER.name} />
          <button className="absolute bottom-3 right-0 rounded-full bg-blue w-10 h-10">
            <FontAwesomeIcon icon={faPenToSquare} className="text-[#FFFFFF]" />
          </button>
        </div>
        <div className="text-center text-4xl mt-16">
          <p>{USER.name}</p>
        </div>

        <div className="flex flex-col gap-3 my-3 text-xl">
          <div>
            <p>Username</p>
            <p>{USER.username}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{USER.email}</p>
          </div>
          <div>
            <p>Mobile</p>
            <p>{USER.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  )
}