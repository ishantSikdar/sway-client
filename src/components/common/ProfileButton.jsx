import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileButton({ onClickHandler, btnName, icon }) {
  return (
    <button onClick={onClickHandler} className="px-1 py-2 flex justify-between w-full font-medium items-center">
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