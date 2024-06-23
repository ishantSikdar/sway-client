import { useNavigate } from "react-router-dom";
import { changeRoute, supportsDynamicViewport } from "../../utils/pageUtil";
import { ROUTE_LOGIN } from "../../constants/routes";
import { useState } from "react";
import { sendSignUpRequest } from "../../services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import ImageInputButton from "../../components/common/ImageInputButton";
import LoaderOverlay from "../../components/common/LoaderOverlay";

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
    changeRoute(navigate, ROUTE_LOGIN);
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
        setSignupLoading(false);
        console.log(signUpResponse)
        setErrorMessage(signUpResponse.data.message);
      }

    } catch (error) {
      setSignupLoading(false);
      console.error(error.message);
      alert(`Error during signup, ${error.message}`);
    }
  }

  const handleToLoginPage = () => {
    changeRoute(navigate, ROUTE_LOGIN);
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

      {!showSuccess ?

        (<div className="bg-light-black w-[350px] h-max px-10 py-7 rounded-md">

          <div className="text-center">
            <h2 className="text-frostWhite text-lg font-medium">Create an account</h2>
          </div>

          <div className="mb-5 text-xs flex flex-col gap-1">
            <p className="mb-3 font-light text-sm text-center text-red-500">{errorMessage ? <span>{errorMessage}</span> : <span>All fields are required</span>}</p>

            <ImageInputButton image={signUpForm.image} inputHandler={handleSignUpInput} />

            <p className="text-center text-xs font-medium uppercase">Profile Picture</p>

            <div>
              <p className="uppercase py-1">Email</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.email}
                name="email"
                type="text"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>

            <div>
              <p className="uppercase py-1">Name</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.name}
                name="name"
                type="text"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>

            <div>
              <p className="uppercase py-1">Username</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.username}
                name="username"
                type="text"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>

            <div>
              <p className="uppercase py-1">Mobile</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.mobile}
                name="mobile"
                type="text"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>

            <div>
              <p className={`uppercase py-1 ${!passwordsMatch ? 'text-red-600' : ''}`}>password {!passwordsMatch && <span className="italic normal-case">- Passwords do not match</span>}</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.password}
                name="password"
                type="password"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>

            <div>
              <p className={`uppercase py-1  ${!passwordsMatch ? 'text-red-600' : ''}`}>confirm password {!passwordsMatch && <span className="italic normal-case">- Passwords do not match</span>}</p>
              <input
                onChange={handleSignUpInput}
                value={signUpForm.confirmPassword}
                name="confirmPassword"
                type="password"
                className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
              />
            </div>
          </div>


          <button
            className="w-full h-10 bg-blue rounded-sm text-frostWhite"
            onClick={handleSignUpRequest}
          >
            Continue
          </button>

          <button className="text-lightBlue text-sm" onClick={handleLoginRoute}>Already have an account?</button>

        </div>) : (<div className="bg-black p-10 w-[350px] rounded-md text-center">

          <p>Your account has been registered</p>
          <p>Login to start your learing journey!</p>

          <button
            className="bg-blue mt-5 w-full h-10 rounded-sm text-frostWhite"
            onClick={handleToLoginPage}
          >
            Continue
          </button>

        </div>)
      }

      {signupLoading && <LoaderOverlay />}
    </div>
  );
}