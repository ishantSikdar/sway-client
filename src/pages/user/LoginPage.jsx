import { useState } from "react"
import { supportsDynamicViewport } from "../../utils/pageUtil";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST, ROUTE_SIGNUP } from "../../constants/routes";
import { sendLoginRequest } from "../../services/userServices";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setBearerToken } from "../../utils/localStorageUtil";
import LoaderOverlay from "../../components/common/LoaderOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleLoginInput = (event) => {
    const { name, value } = event.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginRequest = async () => {
    try {
      setLoginLoading(true);
      const loginResponse = await sendLoginRequest(loginForm);
      setLoginLoading(false);

      if (loginResponse.status === 200) {
        setBearerToken(loginResponse.data.data.authToken);

        const from = location.state?.from?.pathname + location.state?.from?.search || '/';
        navigate(from);

      } else {
        setErrorMessage(loginResponse.data.data.message);
      }

    } catch (error) {
      setLoginLoading(false);
      alert("Error during Login,", error.message);
    }
  }

  const goToSignUpPage = () => {
    navigate(ROUTE_SIGNUP)
  }

  const goToApp = () => {
    navigate(ROUTE_PLAYLIST);
  }

  return (
    <div className={`${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '} bg-coal px-4`}>

      <button onClick={goToApp} className="absolute top-2 text-xl h-10 w-10 flex justify-center items-center">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="text-center pt-20 pb-10">
        <h2 className="text-frostWhite text-2xl font-medium">Welcome Back!</h2>
        <p className="font-light">We're so excited to so you again!</p>
      </div>

      {errorMessage && <p className="text-red-700 text-center text-base">{errorMessage}</p>}

      <p className="text-sm pb-2">Account Information</p>

      <div className="text-sm flex flex-col gap-3">
        <div>
          <input
            onChange={handleLoginInput}
            value={loginForm.username}
            name="username"
            type="text"
            className="bg-light-gray w-full h-12 rounded-sm px-4 outline-none"
            placeholder="Email, Username or Mobile number"
          />
        </div>

        <div className="relative">
          <input
            onChange={handleLoginInput}
            value={loginForm.password}
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="bg-light-gray w-full h-12 rounded-sm px-4 outline-none pr-12"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="flex justify-between w-full mt-2">
        <button className="text-left text-lightBlue text-sm">
          Forgot your Password?
        </button>

        <button className="text-left text-lightBlue text-sm" onClick={goToSignUpPage}>
          Create New Account
        </button>
      </div>

      <button
        className="w-full h-10 mt-10 bg-purple-700 rounded-sm text-frostWhite"
        onClick={handleLoginRequest}
      >
        Log In
      </button>

      {loginLoading && <LoaderOverlay />}
    </div>
  )
}
