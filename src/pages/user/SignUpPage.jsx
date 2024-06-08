import { useNavigate } from "react-router-dom";
import { changeRoute } from "../../utils/pageUtil";
import { ROUTE_LOGIN } from "../../constants/routes";
import { useState } from "react";
import { sendSignUpRequest } from "../../services/userServices";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    name: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userExistsFlag, setUserExistsFlag] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignUpInput = (event) => {
    const { name, value } = event.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value
    })

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
      const signUpResponse = await sendSignUpRequest(signUpForm);

      if (signUpResponse.status === 200) {
        setShowSuccess(true);

      } else if (signUpResponse.status === 409) {
        setUserExistsFlag(true);
      }

    } catch (error) {
      alert(`Error during signup: ${error.message}`);
    }
  }

  const handleToLoginPage = () => {
    changeRoute(navigate, ROUTE_LOGIN);
  }

  console.log(signUpForm);

  return (
    <div
      className="flex justify-center items-center w-full h-screen"
      style={{
        backgroundImage: 'url("/login-bg.svg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >

      {!showSuccess ?

        (<div className="bg-black w-[350px] h-max p-10 rounded-md">

          <div className="text-center">
            <h2 className="text-frostWhite text-2xl font-medium">Create an account</h2>
            <p className="font-light">Learning awaits you ahead!</p>
          </div>


          <div className="my-5 text-xs flex flex-col gap-2">
            <p className="font-light text-base text-center text-red-500">All fields are required *</p>

            {userExistsFlag && <p className="text-red-600 italic text-xs">User already exists by this Email, username or mobile</p>}

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
              <p className="uppercase py-1">Display Name</p>
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

    </div>
  );
}