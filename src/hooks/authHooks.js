import { useRecoilValue } from "recoil"
import { authStateAtom } from "../recoil/atoms/authAtoms"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { changeRoute } from "../utils/pageUtil";
import { ROUTE_LOGIN } from "../constants/routes";

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authStateAtom);
  console.log(auth.token);

  useEffect(() => {
    if (!auth.token) {
      console.log("Login First to Open this Page");
      changeRoute(navigate, ROUTE_LOGIN);
    }
  }, [auth, navigate]);
  
  return auth;
}