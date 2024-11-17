import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileButton({ onClickHandler, btnName, icon }) {
  return (
    <button onClick={onClickHandler} className="px-2 py-2 flex justify-between w-full rounded-md font-medium items-center hover:bg-dark-near-blue">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={icon} className="text-base" />
        <span>{btnName}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </button>
  )
}