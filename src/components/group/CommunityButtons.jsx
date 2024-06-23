import { faCompass, faPeopleGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import { communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms";

export default function CommunityButtons() {

  const setUIElements = useSetRecoilState(communityUserInterfaceAtom);

  return (
    <>
      <button
        className="flex justify-center items-center rounded-full bg-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() =>
          setUIElements((prev) => ({
            ...prev,
            showCreateChat: true,
          }))}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <button
        className="flex justify-center items-center rounded-full bg-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() =>
          setUIElements((prev) => ({
            ...prev,
            showJoinChat: true,
          }))}
      >
        <FontAwesomeIcon icon={faPeopleGroup} />
      </button>

      <button
        className="flex justify-center items-center rounded-full bg-gray text-green-500 text-xl w-[100%] mx-auto aspect-square my-2"
        onClick={() =>
          setUIElements((prev) => ({
            ...prev,
            showExploreGroups: true,
          }))}
      >
        <FontAwesomeIcon icon={faCompass} />
      </button>
    </>
  )
}