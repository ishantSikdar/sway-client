import { faCompass, faPeopleGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommunityButtons({ setShowCreateChat, setShowJoinChat, setShowExploreGroups }) {
  return (
    <>
      <button
        className="flex justify-center items-center rounded-full bg-light-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() => setShowCreateChat(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <button
        className="flex justify-center items-center rounded-full bg-light-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() => setShowJoinChat(true)}
      >
        <FontAwesomeIcon icon={faPeopleGroup} />
      </button>

      <button
        className="flex justify-center items-center rounded-full bg-light-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() => setShowExploreGroups(true)}
      >
        <FontAwesomeIcon icon={faCompass} />
      </button>
    </>
  )
}