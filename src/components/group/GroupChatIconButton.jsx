import { useRecoilValue, useSetRecoilState } from "recoil";
import { actualJoinedCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";

export default function GroupChatIconButton({ id, name, iconUrl }) {
  const setSelectedChat = useSetRecoilState(selectedChatAtom);
  const actualJoinedCommunties = useRecoilValue(actualJoinedCommunitiesAtom);

  const checkIsTrialChat = () => {
    return !actualJoinedCommunties.joinedCommunities.some(community => community.id === id);
  }

  const openChat = () => {
    setSelectedChat((prev) => ({
      communityId: id,
      communityName: name,
      iconUrl: iconUrl,
      chatPageNumber: 1,
      isTrial: checkIsTrialChat()
    }));
  }

  return (
    <button
      className="rounded-[100%] bg-white w-[100%] mx-auto aspect-square focus:rounded-xl transition-all ease-in-out"
      onClick={openChat}
      name={name}
      style={{
        backgroundImage: `url('${iconUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: "cover"
      }}
    ></button>
  )
}