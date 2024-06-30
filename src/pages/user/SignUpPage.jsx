import { useNavigate } from "react-router-dom";
import { supportsDynamicViewport } from "../../utils/pageUtil";
import { ROUTE_LOGIN, ROUTE_PLAYLIST } from "../../constants/routes";
import { useState } from "react";
import { sendSignUpRequest } from "../../services/userServices";
import LoaderOverlay from "../../components/common/LoaderOverlay";
import CenterOverlay from "../../components/common/CenterOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signupLoading, setSignupLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    image: null,
    email: "",
    name: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignUpInput = (event) => {
    const { name, value, files } = event.target;

    if (name === 'image') {
      setSignUpForm({
        ...signUpForm,
        image: files[0]
      })
    } else {
      setSignUpForm({
        ...signUpForm,
        [name]: value
      })
    }

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(signUpForm.password === value || signUpForm.confirmPassword === value);
    }
  }

  const handleLoginRoute = () => {
    navigate(ROUTE_LOGIN);
  }

  const handleSignUpRequest = async () => {
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      setSignupLoading(true);
      const signUpResponse = await sendSignUpRequest(signUpForm);
      setSignupLoading(false);

      if (signUpResponse.status === 200) {
        setShowSuccess(true);

      } else {
        console.log(signUpResponse)
        setErrorMessage(signUpResponse.data.message);
      }

    } catch (error) {
      setSignupLoading(false);
      console.error(error.message);
      alert(`Error during signup, ${error.message}`);
    }
  }

  const goToApp = () => {
    navigate(ROUTE_PLAYLIST);
  }

  return (
    <div className={`${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '} bg-coal px-4 relative`}>
      <button onClick={goToApp} className="absolute top-2 text-xl h-10 w-10 flex justify-center items-center">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="text-center pt-14">
        <h2 className="text-frostWhite text-lg font-medium">Create an account</h2>
      </div>

      <div className="mb-5 text-sm flex flex-col gap-1 text-center">
        <p className="text-white">Mail & Mobile doesn't need to be real</p>
        {errorMessage ? <span className="text-red-700">{errorMessage}</span> : <span className="text-red-700">All fields are required</span>}
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.email}
            name="email"
            type="text"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Email"
          />
        </div>

        <div>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.name}
            name="name"
            type="text"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.username}
            name="username"
            type="text"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.mobile}
            name="mobile"
            type="text"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Mobile"
          />
        </div>

        <div>
          <p className={`uppercase ${!passwordsMatch ? 'text-red-600' : ''}`}>{!passwordsMatch && <span className="italic normal-case">Passwords do not match</span>}</p>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.password}
            name="password"
            type="password"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Password"
          />
        </div>

        <div>
          <p className={`uppercase ${!passwordsMatch ? 'text-red-600' : ''}`}>{!passwordsMatch && <span className="italic normal-case">Passwords do not match</span>}</p>
          <input
            onChange={handleSignUpInput}
            value={signUpForm.confirmPassword}
            name="confirmPassword"
            type="password"
            className="bg-light-gray w-full h-12 rounded-sm px-4 font-light outline-none"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <button className="text-lightBlue mt-1 text-sm" onClick={handleLoginRoute}>
        Already have an account?
      </button>

      <button
        className="w-full h-10 mt-5 bg-purple-700 rounded-sm text-frostWhite"
        onClick={handleSignUpRequest}
      >
        Create My Account
      </button>

      {showSuccess && <CenterOverlay>
        <div className="p-5 bg-black rounded-md">
          <p>
            Your Account has been registered
          </p>

          <button onClick={() => {
            setShowSuccess(false)
            handleLoginRoute()
          }} className="w-full h-10 bg-purple-800 mt-4 rounded-sm">
            Continue
          </button>
        </div>
      </CenterOverlay>}
      {signupLoading && <LoaderOverlay />}
    </div >
  );
}