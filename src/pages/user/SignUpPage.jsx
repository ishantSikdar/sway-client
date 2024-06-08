import { useNavigate } from "react-router-dom";
import { changeRoute } from "../../utils/pageUtil";
import { ROUTE_LOGIN } from "../../constants/routes";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleLoginRoute = () => {
    changeRoute(navigate, ROUTE_LOGIN);
  }

  return (
    <div
      className="flex justify-center items-center w-full h-screen"
      style={{
        backgroundImage: 'url("/login-bg.svg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >

      {/* Form */}
      <div className="bg-black w-[350px] h-max p-10 rounded-md">

        <div className="text-center">
          <h2 className="text-frostWhite text-2xl font-medium">Create an account</h2>
          <p className="font-light">Learning awaits you ahead!</p>
        </div>

        <div className="my-5 text-xs flex flex-col gap-2">
          <div>
            <p className="uppercase py-1">Email</p>
            <input
              name="email"
              type="text"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>

          <div>
            <p className="uppercase py-1">Display Name</p>
            <input
              name="name"
              type="text"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>

          <div>
            <p className="uppercase py-1">Username</p>
            <input
              name="username"
              type="text"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>

          <div>
            <p className="uppercase py-1">password</p>
            <input
              name="password"
              type="password"
              className="bg-coal w-full h-10 rounded-sm p-2 outline-none"
            />
          </div>
        </div>


        <button
          className="w-full h-10 bg-blue rounded-sm text-frostWhite"
        >
          Continue
        </button>

        <button className="text-lightBlue text-sm" onClick={handleLoginRoute}>Already have an account?</button>
      </div>

    </div>
  );
}