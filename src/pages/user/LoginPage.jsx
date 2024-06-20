import { useState } from "react"
import { changeRoute, supportsDynamicViewport } from "../../utils/pageUtil";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_SIGNUP } from "../../constants/routes";
import { sendLoginRequest } from "../../services/userServices";
import { setBearerToken } from "../../utils/localStorageUtil";

export default function LoginPage() {

  const [invalidCredsFlag, setInvalidCredsFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLoginRequest = async () => {
    try {
      setInvalidCredsFlag(false);
      const loginResponse = await sendLoginRequest(loginForm);

      if (loginResponse.status === 200) {
        setBearerToken(loginResponse.data.data.authToken);

        const from = location.state?.from?.pathname + location.state?.from?.search || '/';
        navigate(from);

      } else if (loginResponse.status === 404 || loginResponse.status === 401) {
        setInvalidCredsFlag(true);
      }

    } catch (error) {
      alert("Error during Login: " + error.message);
    }
  }

  const handleSignUp = () => {
    changeRoute(navigate, ROUTE_SIGNUP);
  }

  return (
    <div
      className={`flex justify-center items-center w-full ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}
      style={{
        backgroundImage: 'url("/login-bg.svg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >

      {/* Form */}
      <div className="bg-black w-[350px] h-max p-10 rounded-md">

        <div className="text-center">
          <h2 className="text-frostWhite text-2xl font-medium">Welcome Back!</h2>
          <p className="font-light">We're so excited to so you again!</p>
        </div>

        <div className="my-5 text-xs flex flex-col gap-2">
          <div>
            <p className={`uppercase py-1 ${invalidCredsFlag ? 'text-red-600' : ''}`}>Email, Mobile or Username {invalidCredsFlag && <span className="italic normal-case">- Login or password is invalid</span>}</p>
            <input
              onChange={handleLoginInput}
              value={loginForm.username}
              name="username"
              type="text"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>

          <div>
            <p className={`uppercase py-1 ${invalidCredsFlag ? 'text-red-600' : ''}`}>Password {invalidCredsFlag && <span className="italic normal-case">- Login or password is invalid</span>}</p>
            <input
              onChange={handleLoginInput}
              value={loginForm.password}
              name="password"
              type="password"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>

          <button className="text-left text-lightBlue text-sm">
            Forgot your Password?
          </button>
        </div>


        <button
          className="w-full h-10 bg-blue rounded-sm text-frostWhite"
          onClick={handleLoginRequest}
        >
          Log In
        </button>

        <div className="py-2 text-sm">Need an account? <button className="text-lightBlue" onClick={handleSignUp}>Register</button></div>
      </div>

    </div>
  )
}