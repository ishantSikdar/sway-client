import { useLocation, useNavigate } from "react-router-dom";
import GrayContainer from "../common/GrayContainer";
import { deleteBearerToken } from "../../utils/localStorageUtil";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";
import { redirectToLoginPage } from "../../utils/pageUtil";

export default function LogoutConfirm({ cancel }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = useRecoilValue(userDetailsAtom);

  const logoutUser = () => {
    deleteBearerToken();
    redirectToLoginPage(location, navigate);
  }

  return (
    <GrayContainer closeLabel={`Cancel`} close={cancel} width={300} submit={logoutUser} submitLabel={`Yes`}>
      <p className="text-center">Are you sure you want to logout from {userDetails.name}'s account?</p>
    </GrayContainer>
  )
}