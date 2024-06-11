import { faEnvelope, faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contacts({ email, mobile, setShowContact }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

      <div className="relative flex flex-col gap-2 p-8 rounded-md bg-coal text-white">
        <button
          className="absolute right-8"
          onClick={() => setShowContact(false)}
        >
          <FontAwesomeIcon icon={faX} className="text-lg" />
        </button>
        <div className="flex text-lg">
          <div>
            <FontAwesomeIcon icon={faPhone} className="mr-5 my-2" />
          </div>
          <div className="text-frostWhite">
            <p>Mobile</p>
            <p>{mobile}</p>
          </div>
        </div>

        <div className="h-[0.1pt] my-2 w-full bg-white"></div>

        <div className="flex text-lg">
          <div>
            <FontAwesomeIcon icon={faEnvelope} className="mr-5 my-2" />
          </div>
          <div className="text-frostWhite">
            <p>Mail</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
